// Fills the name with an iced matcha latte: matcha poured over milk, ice cubes
// floating at the top, only half mixed until the cursor stirs it. The liquid is a small grid of
// matcha concentrations (0 = milk, 1 = matcha) that the cursor pushes around.

const GW = 96;  // grid columns
const GH = 72;  // grid rows
const PAD = 32; // css px the canvas reaches past the heading, for the outline and the g

const palettes = {
    light: { milk: [251, 249, 238], latte: [150, 182, 104], matcha: [72, 110, 36], outline: "#56792B" },
    dark: { milk: [216, 217, 198], latte: [136, 160, 108], matcha: [84, 110, 60], outline: "#8FA672" },
};

const smoothstep = (t) => {
    const x = Math.min(1, Math.max(0, t));
    return x * x * (3 - 2 * x);
};

// starts the effect on a heading whose letters are separate spans;
// returns a function that stops it
export function pourLatte(heading, canvas) {
    const letters = Array.from(heading.querySelectorAll("[data-letter]"));
    const ctx = canvas.getContext("2d");
    if (!ctx || letters.length === 0) return () => { };

    const liquid = document.createElement("canvas");
    liquid.width = GW;
    liquid.height = GH;
    const liquidCtx = liquid.getContext("2d");
    const pixels = liquidCtx.createImageData(GW, GH);

    let matcha = new Float32Array(GW * GH);
    let nextMatcha = new Float32Array(GW * GH);
    let u = new Float32Array(GW * GH);
    let v = new Float32Array(GW * GH);
    let nextU = new Float32Array(GW * GH);
    let nextV = new Float32Array(GW * GH);
    let cubes = [];

    let width = 0, height = 0, fontSize = 0, ascent = 0, descent = 0;
    let colors = new Uint8ClampedArray(256 * 3);
    let outline = palettes.light.outline;
    let poured = false;
    let frame = 0;
    let energy = 0;
    let lastPointer = null;
    let stopped = false;
    let onScreen = true;
    // resting ice bobs gently, unless the visitor asked for less motion
    const bobbing = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    // the letters are still rising for the first moments, so keep redrawing
    const risingFor = 1600;

    const readTheme = () => {
        const palette = document.documentElement.dataset.theme === "dark" ? palettes.dark : palettes.light;
        outline = palette.outline;
        for (let i = 0; i < 256; i++) {
            const t = i / 255;
            const [from, to, k] = t < 0.5 ? [palette.milk, palette.latte, t * 2] : [palette.latte, palette.matcha, t * 2 - 1];
            for (let ch = 0; ch < 3; ch++) colors[i * 3 + ch] = from[ch] + (to[ch] - from[ch]) * k;
        }
    };

    const baselineOf = (span) => span.offsetTop + (span.offsetHeight - (ascent + descent)) / 2 + ascent;

    // matcha sits on top of the milk in each line of the name, already bleeding into it
    const pour = () => {
        const lines = [...new Set(letters.map(baselineOf))].sort((a, b) => a - b);
        ctx.font = `${fontSize}px "Bagel Fat One"`;
        const xHeight = ctx.measureText("x").actualBoundingBoxAscent;
        for (let y = 0; y < GH; y++) {
            const py = (y + 0.5) / GH * height - PAD;
            let line = 0;
            while (line < lines.length - 1 && py > lines[line] + fontSize * 0.04) line++;
            for (let x = 0; x < GW; x++) {
                const wobble = 0.16 * Math.sin(x * 0.21 + line * 2) + 0.1 * Math.sin(x * 0.53 + 1.3) + 0.07 * Math.sin(x * 1.1 + line);
                const edge = lines[line] - xHeight * (0.5 + wobble);
                matcha[y * GW + x] = 0.84 - 0.62 * smoothstep((py - edge) / (xHeight * 0.95) + 0.5);
            }
        }

        // ice floats along the top of each line; a few start lower and bob up
        cubes = [];
        let seed = 7;
        const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        lines.forEach((baseline) => {
            for (let i = 0; i < 7; i++) {
                const size = 0.13 + 0.05 * random();
                const surface = (PAD + baseline - xHeight + size * fontSize * 0.55) / height * GH;
                cubes.push({
                    x: (PAD + (0.04 + 0.92 * (i + random()) / 7) * (width - 2 * PAD)) / width * GW,
                    y: surface + (i % 3 === 1 ? size * fontSize / height * GH : 0),
                    surface,
                    angle: (random() - 0.5) * 0.5,
                    size,
                    phase: random() * Math.PI * 2,
                });
            }
        });
        poured = true;
    };

    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        width = heading.offsetWidth + 2 * PAD;
        height = heading.offsetHeight + 2 * PAD;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        fontSize = parseFloat(getComputedStyle(heading).fontSize);
        ctx.font = `${fontSize}px "Bagel Fat One"`;
        const metrics = ctx.measureText("annie wong");
        ascent = metrics.fontBoundingBoxAscent;
        descent = metrics.fontBoundingBoxDescent;
        if (!poured) pour();
        kick();
    };

    // push the liquid along with the cursor, with a little swirl
    const stir = (x, y, dx, dy) => {
        const radius = 9;
        const speed = Math.hypot(dx, dy);
        for (let cy = Math.max(1, Math.floor(y - radius)); cy <= Math.min(GH - 2, Math.ceil(y + radius)); cy++) {
            for (let cx = Math.max(1, Math.floor(x - radius)); cx <= Math.min(GW - 2, Math.ceil(x + radius)); cx++) {
                const rx = cx - x, ry = cy - y;
                const d = (rx * rx + ry * ry) / (radius * radius);
                if (d >= 1) continue;
                const falloff = (1 - d) * (1 - d);
                const i = cy * GW + cx;
                u[i] = Math.max(-2.5, Math.min(2.5, u[i] + (dx * 0.5 - ry / radius * speed * 0.4) * falloff));
                v[i] = Math.max(-2.5, Math.min(2.5, v[i] + (dy * 0.5 + rx / radius * speed * 0.4) * falloff));
            }
        }
    };

    const step = () => {
        energy = 0;
        for (let y = 1; y < GH - 1; y++) {
            for (let x = 1; x < GW - 1; x++) {
                const i = y * GW + x;
                // the motion spreads out and dies down
                nextU[i] = (u[i] * 0.6 + 0.1 * (u[i - 1] + u[i + 1] + u[i - GW] + u[i + GW])) * 0.965;
                nextV[i] = (v[i] * 0.6 + 0.1 * (v[i - 1] + v[i + 1] + v[i - GW] + v[i + GW])) * 0.965;

                // carry the matcha along: look up where this cell's liquid came from
                const sx = Math.min(GW - 1.001, Math.max(0, x - u[i]));
                const sy = Math.min(GH - 1.001, Math.max(0, y - v[i]));
                const x0 = Math.floor(sx), y0 = Math.floor(sy);
                const fx = sx - x0, fy = sy - y0;
                const j = y0 * GW + x0;
                let value = (matcha[j] * (1 - fx) + matcha[j + 1] * fx) * (1 - fy)
                    + (matcha[j + GW] * (1 - fx) + matcha[j + GW + 1] * fx) * fy;

                // moving liquid blends with its neighbours
                const speed = Math.hypot(u[i], v[i]);
                const around = (matcha[i - 1] + matcha[i + 1] + matcha[i - GW] + matcha[i + GW]) / 4;
                value += (around - value) * Math.min(0.35, speed * 0.12);
                nextMatcha[i] = value;
                energy += speed;
            }
        }
        // the edges copy the cells beside them
        for (let x = 0; x < GW; x++) {
            nextMatcha[x] = nextMatcha[GW + x];
            nextMatcha[(GH - 1) * GW + x] = nextMatcha[(GH - 2) * GW + x];
        }
        for (let y = 0; y < GH; y++) {
            nextMatcha[y * GW] = nextMatcha[y * GW + 1];
            nextMatcha[y * GW + GW - 1] = nextMatcha[y * GW + GW - 2];
        }
        [matcha, nextMatcha] = [nextMatcha, matcha];
        [u, nextU] = [nextU, u];
        [v, nextV] = [nextV, v];

        // the ice gets carried by the liquid, then floats back up to the surface
        const cellW = width / GW, cellH = height / GH;
        for (const cube of cubes) {
            const i = Math.round(cube.y) * GW + Math.round(cube.x);
            cube.fromX = cube.x;
            cube.fromY = cube.y;
            cube.x += u[i] * 0.7;
            cube.y += v[i] * 0.7 - Math.min(0.12, cube.y - cube.surface);
            // a floating cube turns to lie flat
            const flat = Math.round(cube.angle / (Math.PI / 2)) * (Math.PI / 2);
            cube.angle += u[i] * 0.05 + (flat - cube.angle) * 0.03;
        }
        // cubes can't overlap: push touching pairs apart, so they stack under the surface
        for (let pass = 0; pass < 4; pass++) {
            for (let a = 0; a < cubes.length; a++) {
                for (let b = a + 1; b < cubes.length; b++) {
                    const dx = (cubes[b].x - cubes[a].x) * cellW, dy = (cubes[b].y - cubes[a].y) * cellH;
                    const distance = Math.hypot(dx, dy) || 0.01;
                    const overlap = (cubes[a].size + cubes[b].size) * fontSize * 0.56 - distance;
                    if (overlap <= 0) continue;
                    const pushX = dx / distance * overlap / 2 / cellW, pushY = dy / distance * overlap / 2 / cellH;
                    cubes[a].x -= pushX;
                    cubes[a].y -= pushY;
                    cubes[b].x += pushX;
                    cubes[b].y += pushY;
                }
            }
            for (const cube of cubes) {
                cube.x = Math.min(GW - 3, Math.max(2, cube.x));
                cube.y = Math.min(GH - 3, Math.max(cube.surface, cube.y));
            }
        }
        for (const cube of cubes) {
            const moved = Math.abs(cube.x - cube.fromX) + Math.abs(cube.y - cube.fromY);
            if (moved > 0.01) energy += moved;
        }
    };

    // draws each letter where its span is, following the rise animation while it runs
    const eachLetter = (rising, paint) => {
        for (const span of letters) {
            const x = span.offsetLeft + PAD;
            ctx.save();
            if (rising) {
                const style = getComputedStyle(span);
                if (style.transform !== "none") {
                    const m = new DOMMatrix(style.transform);
                    const originX = x + span.offsetWidth / 2;
                    const originY = span.offsetTop + PAD + span.offsetHeight;
                    ctx.translate(originX, originY);
                    ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                    ctx.translate(-originX, -originY);
                }
                ctx.globalAlpha = parseFloat(style.opacity);
            }
            paint(span.textContent, x, baselineOf(span) + PAD);
            ctx.restore();
        }
    };

    const draw = (rising) => {
        for (let i = 0; i < GW * GH; i++) {
            const shade = Math.round(Math.min(1, Math.max(0, matcha[i])) * 255) * 3;
            pixels.data[i * 4] = colors[shade];
            pixels.data[i * 4 + 1] = colors[shade + 1];
            pixels.data[i * 4 + 2] = colors[shade + 2];
            pixels.data[i * 4 + 3] = 255;
        }
        liquidCtx.putImageData(pixels, 0, 0);

        const dpr = canvas.width / width;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px "Bagel Fat One"`;
        ctx.textBaseline = "alphabetic";

        // the letters are the glass: liquid and ice only show inside them
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000";
        eachLetter(rising, (letter, x, y) => ctx.fillText(letter, x, y));

        ctx.globalCompositeOperation = "source-in";
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(liquid, 0, 0, width, height);

        ctx.globalCompositeOperation = "source-atop";
        for (const cube of cubes) {
            const size = cube.size * fontSize;
            ctx.save();
            const bob = bobbing ? performance.now() / 1000 * 1.9 + cube.phase : 0;
            ctx.translate(cube.x / GW * width + Math.sin(bob * 0.6) * fontSize * 0.005,
                cube.y / GH * height + Math.sin(bob) * fontSize * 0.011);
            ctx.rotate(cube.angle + Math.sin(bob * 0.8) * 0.05);
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(-size / 2, -size / 2, size, size, size * 0.22);
            else ctx.rect(-size / 2, -size / 2, size, size);
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(58, 84, 32, 0.1)";
            ctx.stroke();
            ctx.lineWidth = 1.25;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            ctx.stroke();
            ctx.restore();
        }

        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = outline;
        ctx.lineWidth = Math.max(1.5, fontSize * 0.014);
        ctx.lineJoin = "round";
        eachLetter(rising, (letter, x, y) => ctx.strokeText(letter, x, y));
    };

    const tick = () => {
        frame = 0;
        if (stopped) return;
        const rising = performance.now() - startedAt < risingFor;
        step();
        draw(rising);
        // keep going while anything moves; the bobbing only needs it while the name is in view
        if (rising || energy > 0.05 || (bobbing && onScreen)) frame = requestAnimationFrame(tick);
    };

    function kick() {
        if (!frame && !stopped) frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event) => {
        const box = canvas.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width * GW;
        const y = (event.clientY - box.top) / box.height * GH;
        if (lastPointer && event.timeStamp - lastPointer.time < 120) {
            stir(x, y, x - lastPointer.x, y - lastPointer.y);
            kick();
        }
        lastPointer = { x, y, time: event.timeStamp };
    };

    const themeWatcher = new MutationObserver(() => {
        readTheme();
        kick();
    });
    const sizeWatcher = new ResizeObserver(resize);
    const viewWatcher = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) kick();
    });

    readTheme();
    resize();
    heading.addEventListener("pointermove", onPointerMove);
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    sizeWatcher.observe(heading);
    viewWatcher.observe(heading);

    return () => {
        stopped = true;
        cancelAnimationFrame(frame);
        heading.removeEventListener("pointermove", onPointerMove);
        themeWatcher.disconnect();
        sizeWatcher.disconnect();
        viewWatcher.disconnect();
    };
}
