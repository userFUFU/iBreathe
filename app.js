(() => {
  const canvas = document.getElementById("field");
  const ctx = canvas && canvas.getContext("2d", { alpha: false });

  if (!canvas || !ctx) {
    document.body.classList.add("no-canvas");
    return;
  }

  const scenePresets = {
    corona: {
      type: "corona",
      desktopCount: 800,
      mobileCount: 400,
      fanStart: Math.PI + 0.08,
      fanEnd: Math.PI * 2 - 0.08,
      baseY: 1.015,
      radiusX: 0.19,
      radiusY: 0.4,
      rootSpread: 0.018,
      breathScale: 0.045,
      drift: 7,
      mouseRadius: 170,
      mouseForce: 4.4,
      spring: 0.045,
      friction: 0.86,
      lineSegments: 10,
      rootLift: -6,
      rootLiftJitter: 3,
      curve: 18,
      lengthBase: 0.82,
      lengthCenter: 0.2,
      lengthEdge: -0.03,
      lengthMin: 0.9,
      lengthRange: 0.18,
      lineWidthMin: 0.42,
      lineWidthMax: 1.22,
      lineAlphaMin: 0.075,
      lineAlphaMax: 0.48,
      dotRadiusMin: 0.66,
      dotRadiusMax: 2.55,
      dotSkip: 0.26,
      warm: [211, 171, 92],
      coolBack: [96, 144, 222],
      coolFront: [58, 103, 218],
      sunRadiusX: 0.42,
      sunRadiusY: 0.52,
      sunScaleX: 1.42,
      sunScaleY: 0.5,
      sunOffset: 0.16,
      blueLift: 0.34,
      blueRadius: 0.5
    },
    meadow: {
      type: "meadow",
      desktopCount: 420,
      mobileCount: 220,
      fanStart: Math.PI + 0.18,
      fanEnd: Math.PI * 2 - 0.18,
      baseY: 1.02,
      radiusX: 0.16,
      radiusY: 0.52,
      rootSpread: 0.52,
      breathScale: 0.035,
      drift: 13,
      mouseRadius: 150,
      mouseForce: 3.6,
      spring: 0.038,
      friction: 0.88,
      lineSegments: 12,
      rootLift: -14,
      rootLiftJitter: 9,
      curve: 38,
      lengthBase: 0.62,
      lengthCenter: 0.2,
      lengthEdge: -0.08,
      lengthMin: 0.72,
      lengthRange: 0.28,
      lineWidthMin: 0.36,
      lineWidthMax: 1.1,
      lineAlphaMin: 0.06,
      lineAlphaMax: 0.38,
      dotRadiusMin: 0.35,
      dotRadiusMax: 1.35,
      dotSkip: 0.62,
      warm: [178, 176, 120],
      coolBack: [112, 156, 108],
      coolFront: [72, 125, 82],
      grassHueMin: 92,
      grassHueMax: 132,
      sunRadiusX: 0.48,
      sunRadiusY: 0.36,
      sunScaleX: 1.55,
      sunScaleY: 0.38,
      sunOffset: 0.2,
      blueLift: 0.25,
      blueRadius: 0.46
    },
    signal: {
      type: "signal",
      desktopCount: 22,
      mobileCount: 16,
      fanStart: Math.PI + 0.32,
      fanEnd: Math.PI * 2 - 0.32,
      baseY: 0.98,
      radiusX: 0.25,
      radiusY: 0.28,
      rootSpread: 0.4,
      breathScale: 0.055,
      drift: 10,
      mouseRadius: 190,
      mouseForce: 3.9,
      spring: 0.036,
      friction: 0.89,
      lineSegments: 11,
      rootLift: -5,
      rootLiftJitter: 4,
      curve: 30,
      lengthBase: 0.72,
      lengthCenter: 0.15,
      lengthEdge: -0.04,
      lengthMin: 0.78,
      lengthRange: 0.24,
      lineWidthMin: 0.34,
      lineWidthMax: 1.06,
      lineAlphaMin: 0.055,
      lineAlphaMax: 0.36,
      dotRadiusMin: 0.38,
      dotRadiusMax: 1.55,
      dotSkip: 0.5,
      warm: [194, 178, 212],
      coolBack: [160, 122, 214],
      coolFront: [112, 86, 188],
      sunRadiusX: 0.5,
      sunRadiusY: 0.42,
      sunScaleX: 1.7,
      sunScaleY: 0.32,
      sunOffset: 0.22,
      blueLift: 0.2,
      blueRadius: 0.55
    },
    tide: {
      type: "tide",
      desktopCount: 18,
      mobileCount: 12,
      baseY: 0.55,
      breathScale: 0.12,
      drift: 12,
      mouseRadius: 210,
      mouseForce: 2.2,
      spring: 0.022,
      friction: 0.92,
      lineSegments: 8,
      warm: [156, 190, 202],
      coolBack: [112, 178, 212],
      coolFront: [64, 124, 188],
      blueLift: 0.12,
      blueRadius: 0.68
    },
    bloom: {
      type: "bloom",
      desktopCount: 16,
      mobileCount: 16,
      baseY: 0.57,
      breathScale: 0.2,
      drift: 5,
      mouseRadius: 180,
      mouseForce: 1.7,
      spring: 0.052,
      friction: 0.86,
      warm: [246, 226, 222],
      coolBack: [230, 172, 184],
      coolFront: [220, 146, 166],
      petalCount: 8,
      blueLift: 0.05,
      blueRadius: 0.5
    },
    pendulum: {
      type: "pendulum",
      desktopCount: 1,
      mobileCount: 1,
      baseY: 0.18,
      breathScale: 0.05,
      drift: 5,
      mouseRadius: 115,
      mouseForce: 0.00072,
      spring: 0.0009,
      friction: 0.998,
      warm: [214, 214, 198],
      coolBack: [132, 162, 170],
      coolFront: [72, 98, 120],
      blueLift: -0.12,
      blueRadius: 0.62
    }
  };

  const settings = {
    type: "corona",
    desktopCount: 800,
    mobileCount: 400,
    maxDpr: 2,
    fanStart: Math.PI + 0.08,
    fanEnd: Math.PI * 2 - 0.08,
    baseY: 1.015,
    radiusX: 0.19,
    radiusY: 0.40,
    rootSpread: 0.018,
    breathIn: 4,
    breathOut: 6,
    breathScale: 0.045,
    drift: 7,
    mouseRadius: 170,
    mouseForce: 4.4,
    spring: 0.045,
    friction: 0.86,
    lineSegments: 10,
    scene: "corona"
  };

  const mouse = {
    x: -9999,
    y: -9999,
    px: -9999,
    py: -9999,
    vx: 0,
    vy: 0,
    active: false,
    energy: 0
  };

  function applyScene(name) {
    const preset = scenePresets[name] || scenePresets.corona;
    Object.assign(settings, preset, { scene: name });
    updateLayout();
  }

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    originX: 0,
    originY: 0,
    radius: 0,
    breath: 0,
    particles: [],
    lastTime: performance.now()
  };

  function random(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let next = value;
      next = Math.imul(next ^ (next >>> 15), next | 1);
      next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
      return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
    };
  }

  const rand = random(219781);

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function breathingValue(time) {
    const cycle = settings.breathIn + settings.breathOut;
    const phase = (time / 1000) % cycle;

    if (phase < settings.breathIn) {
      return 0.5 - Math.cos((phase / settings.breathIn) * Math.PI) * 0.5;
    }

    return 0.5 + Math.cos(((phase - settings.breathIn) / settings.breathOut) * Math.PI) * 0.5;
  }

  function quadraticPoint(p0, p1, p2, t) {
    const inv = 1 - t;
    return {
      x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
      y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y
    };
  }

  class Particle {
    constructor(index, total) {
      const order = index / Math.max(1, total - 1);
      const jittered = clamp(order + (rand() - 0.5) * 0.006, 0, 1);
      const center = Math.sin(jittered * Math.PI);
      const edge = 1 - center;
      const depth = rand();
      const layer = depth < 0.5 ? 0 : depth < 0.86 ? 1 : 2;
      const layerWeight = layer / 2;

      this.angle = lerp(settings.fanStart, settings.fanEnd, jittered);
      this.baseRadius =
        state.radius *
        (settings.lengthBase + center * settings.lengthCenter + edge * settings.lengthEdge) *
        (settings.lengthMin + rand() * settings.lengthRange);
      this.rootOffset = (jittered - 0.5) * state.width * settings.rootSpread + (rand() - 0.5) * 6;
      this.rootLift = center * settings.rootLift + (rand() - 0.5) * settings.rootLiftJitter;
      this.phase = rand() * Math.PI * 2;
      this.phase2 = rand() * Math.PI * 2;
      this.layer = layer;
      this.layerWeight = layerWeight;
      this.curve = (rand() - 0.5) * settings.curve * (0.35 + center);
      this.lineWidth = lerp(settings.lineWidthMin, settings.lineWidthMax, rand()) * lerp(0.62, 1.2, layerWeight);
      this.lineAlpha = lerp(settings.lineAlphaMin, settings.lineAlphaMax, layerWeight) * lerp(0.82, 1.16, rand());
      this.dotRadius = lerp(settings.dotRadiusMin, settings.dotRadiusMax, rand()) * lerp(0.58, 1.18, layerWeight);
      this.dotAlpha = layer === 0 || rand() < settings.dotSkip ? 0 : lerp(0.24, 0.76, rand()) * lerp(0.6, 1, layerWeight);

      const target = this.target(0);
      this.x = target.x;
      this.y = target.y;
      this.vx = 0;
      this.vy = 0;
    }

    origin() {
      return {
        x: state.originX + this.rootOffset,
        y: state.originY + this.rootLift
      };
    }

    target(time) {
      const origin = this.origin();
      const breath = 1 + (state.breath - 0.5) * settings.breathScale;
      const localBreath = Math.sin(time * 0.00068 + this.phase) * settings.drift;
      const slowDrift = Math.sin(time * 0.00024 + this.phase2) * settings.drift * 0.62;
      const radius = (this.baseRadius + localBreath + slowDrift) * breath;
      const x = origin.x + Math.cos(this.angle) * radius * settings.radiusX * 2.18;
      const y = origin.y + Math.sin(this.angle) * radius * settings.radiusY;
      const perpX = -Math.sin(this.angle);
      const perpY = Math.cos(this.angle);
      const sway = Math.sin(time * 0.00038 + this.phase) * settings.drift * (0.4 + this.layerWeight * 0.34);

      return {
        x: x + perpX * sway,
        y: y + perpY * sway * 0.55
      };
    }

    update(time, dt) {
      const target = this.target(time);

      if (mouse.energy > 0.001) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < settings.mouseRadius) {
          const falloff = 1 - smoothstep(0, settings.mouseRadius, distance);
          const force = falloff * falloff * mouse.energy;
          const inv = 1 / Math.max(distance, 0.001);
          this.vx += dx * inv * settings.mouseForce * force * (0.72 + this.layerWeight * 0.34);
          this.vy += dy * inv * settings.mouseForce * force * (0.72 + this.layerWeight * 0.34);
          this.vx += clamp(mouse.vx, -26, 26) * 0.025 * force;
          this.vy += clamp(mouse.vy, -26, 26) * 0.025 * force;
        }
      }

      this.vx += (target.x - this.x) * settings.spring * dt;
      this.vy += (target.y - this.y) * settings.spring * dt;
      this.vx *= Math.pow(settings.friction, dt);
      this.vy *= Math.pow(settings.friction, dt);
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    draw() {
      const origin = this.origin();
      const tip = { x: this.x, y: this.y };
      const mid = {
        x: (origin.x + tip.x) * 0.5,
        y: (origin.y + tip.y) * 0.5
      };
      const dx = tip.x - origin.x;
      const dy = tip.y - origin.y;
      const length = Math.hypot(dx, dy) || 1;
      const control = {
        x: mid.x + (-dy / length) * this.curve,
        y: mid.y + (dx / length) * this.curve
      };

      drawTaperedLine(origin, control, tip, this);

      if (this.dotAlpha > 0) {
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, this.dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(54, 99, 219, ${this.dotAlpha})`;
        ctx.fill();
      }
    }
  }

  class GrassBlade {
    constructor(index, total) {
      const order = index / Math.max(1, total - 1);
      const jittered = clamp(order + (rand() - 0.5) * 0.012, 0, 1);
      const depth = rand();
      const layer = depth < 0.45 ? 0 : depth < 0.82 ? 1 : 2;
      const layerWeight = layer / 2;
      const ground = state.height * 0.9 + Math.sin(jittered * Math.PI * 2) * 10;

      this.rootX = lerp(-state.width * 0.05, state.width * 1.05, jittered);
      this.rootY = ground + (rand() - 0.5) * 18;
      this.height = state.height * lerp(0.18, 0.42, rand()) * lerp(0.8, 1.08, layerWeight);
      this.restLean = lerp(-34, 34, rand()) + Math.sin(jittered * Math.PI * 2) * 18;
      this.phase = rand() * Math.PI * 2;
      this.phase2 = rand() * Math.PI * 2;
      this.width = lerp(0.8, 2.2, rand()) * lerp(0.6, 1.1, layerWeight);
      this.alpha = lerp(0.1, 0.42, layerWeight) * lerp(0.75, 1.1, rand());
      this.hue = lerp(settings.grassHueMin || 110, settings.grassHueMax || 150, rand());
      this.tipX = this.rootX + this.restLean;
      this.tipY = this.rootY - this.height;
      this.vx = 0;
      this.vy = 0;
    }

    update(time, dt) {
      const breath = (state.breath - 0.5) * 34;
      const lift = state.breath * 18;
      const sway = Math.sin(time * 0.00042 + this.phase) * settings.drift * (0.72 + state.breath * 0.42) + Math.sin(time * 0.00021 + this.phase2) * settings.drift * 0.55;
      let targetX = this.rootX + this.restLean + sway + breath;
      let targetY = this.rootY - this.height - lift + Math.sin(time * 0.0003 + this.phase2) * 8;

      if (mouse.energy > 0.001) {
        const dx = this.tipX - mouse.x;
        const dy = this.tipY - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < settings.mouseRadius) {
          const force = (1 - smoothstep(0, settings.mouseRadius, distance)) ** 2 * mouse.energy;
          const inv = 1 / Math.max(distance, 0.001);
          this.vx += dx * inv * settings.mouseForce * force;
          this.vy += dy * inv * settings.mouseForce * force * 0.5;
          this.vx += clamp(mouse.vx, -26, 26) * 0.04 * force;
        }
      }

      this.vx += (targetX - this.tipX) * settings.spring * dt;
      this.vy += (targetY - this.tipY) * settings.spring * dt;
      this.vx *= Math.pow(settings.friction, dt);
      this.vy *= Math.pow(settings.friction, dt);
      this.tipX += this.vx * dt;
      this.tipY += this.vy * dt;
    }

    draw() {
      const bendX = lerp(this.rootX, this.tipX, 0.55) + (this.tipX - this.rootX) * 0.15;
      const bendY = lerp(this.rootY, this.tipY, 0.52);
      const gradient = ctx.createLinearGradient(this.rootX, this.rootY, this.tipX, this.tipY);
      gradient.addColorStop(0, `hsla(${this.hue}, 34%, 58%, 0.02)`);
      gradient.addColorStop(0.42, `hsla(${this.hue}, 34%, 48%, ${this.alpha * 0.55})`);
      gradient.addColorStop(1, `hsla(${this.hue + 10}, 40%, 38%, ${this.alpha})`);

      ctx.beginPath();
      ctx.moveTo(this.rootX, this.rootY);
      ctx.quadraticCurveTo(bendX, bendY, this.tipX, this.tipY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }

  class WaveLine {
    constructor(index, total) {
      const order = index / Math.max(1, total - 1);
      const layer = order;
      this.baseY = lerp(state.height * 0.48, state.height * 0.92, order);
      this.amplitude = lerp(10, 36, rand()) * lerp(0.65, 1.1, 1 - order * 0.35);
      this.frequency = lerp(1.15, 2.4, rand());
      this.phase = rand() * Math.PI * 2;
      this.speed = lerp(0.00016, 0.00036, rand());
      this.alpha = lerp(0.06, 0.28, 1 - layer) * lerp(0.75, 1.12, rand());
      this.width = lerp(0.7, 1.8, rand()) * lerp(0.7, 1.05, 1 - layer);
      this.offsets = [];
      const points = 32;
      for (let i = 0; i <= points; i += 1) {
        this.offsets.push({ y: 0, vy: 0 });
      }
    }

    update(time, dt) {
      const points = this.offsets.length - 1;
      for (let i = 0; i <= points; i += 1) {
        const x = (i / points) * state.width;
        const targetY =
          Math.sin((i / points) * Math.PI * 2 * this.frequency + time * this.speed + this.phase) *
          this.amplitude *
          (0.68 + state.breath * 0.46);

        const point = this.offsets[i];
        if (mouse.energy > 0.001) {
          const y = this.baseY + point.y;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < settings.mouseRadius) {
            const force = (1 - smoothstep(0, settings.mouseRadius, distance)) ** 2 * mouse.energy;
            point.vy += (dy / Math.max(distance, 0.001)) * settings.mouseForce * 2.4 * force;
            point.vy += clamp(mouse.vy, -26, 26) * 0.035 * force;
          }
        }

        point.vy += (targetY - point.y) * settings.spring * dt;
        point.vy *= Math.pow(settings.friction, dt);
        point.y += point.vy * dt;
      }
    }

    draw() {
      const points = this.offsets.length - 1;
      const gradient = ctx.createLinearGradient(0, this.baseY, state.width, this.baseY);
      gradient.addColorStop(0, `rgba(80, 150, 200, 0)`);
      gradient.addColorStop(0.2, `rgba(${settings.coolBack[0]}, ${settings.coolBack[1]}, ${settings.coolBack[2]}, ${this.alpha})`);
      gradient.addColorStop(0.78, `rgba(${settings.coolFront[0]}, ${settings.coolFront[1]}, ${settings.coolFront[2]}, ${this.alpha * 0.9})`);
      gradient.addColorStop(1, `rgba(${settings.coolFront[0]}, ${settings.coolFront[1]}, ${settings.coolFront[2]}, 0)`);

      ctx.beginPath();
      for (let i = 0; i <= points; i += 1) {
        const x = (i / points) * state.width;
        const y = this.baseY + this.offsets[i].y;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevX = ((i - 1) / points) * state.width;
          const prevY = this.baseY + this.offsets[i - 1].y;
          ctx.quadraticCurveTo((prevX + x) * 0.5, (prevY + y) * 0.5, x, y);
        }
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }

  class TideOrb {
    constructor(index, total) {
      const order = index / Math.max(1, total - 1);
      const rows = state.width < 700 ? 3 : 4;
      const cols = Math.ceil(total / rows);
      const row = Math.floor(index / cols);
      const col = index % cols;
      const rowT = row / Math.max(1, rows - 1);
      const laneT = (col + 0.5) / cols;

      this.baseX = lerp(state.width * 0.12, state.width * 0.88, laneT) + (rand() - 0.5) * 26;
      this.baseY = lerp(state.height * 0.48, state.height * 0.82, rowT) + Math.sin(laneT * Math.PI * 2) * 12;
      this.radius = lerp(state.width * 0.07, state.width * 0.15, rand()) * lerp(1, 0.72, rowT);
      this.phase = rand() * Math.PI * 2;
      this.phase2 = rand() * Math.PI * 2;
      this.alpha = lerp(0.12, 0.28, 1 - rowT) * lerp(0.82, 1.15, rand());
      this.x = this.baseX;
      this.y = this.baseY;
      this.vx = 0;
      this.vy = 0;
    }

    update(time, dt) {
      const breath = (state.breath - 0.5) * settings.breathScale;
      const targetX = this.baseX + Math.sin(time * 0.00016 + this.phase) * settings.drift * 0.9;
      const targetY = this.baseY + Math.sin(time * 0.0002 + this.phase2) * settings.drift * 0.45 + breath * this.radius * 1.8;

      if (mouse.energy > 0.001) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < settings.mouseRadius + this.radius * 0.35) {
          const force = (1 - smoothstep(0, settings.mouseRadius + this.radius * 0.35, distance)) ** 2 * mouse.energy;
          const inv = 1 / Math.max(distance, 0.001);
          this.vx += dx * inv * settings.mouseForce * force;
          this.vy += dy * inv * settings.mouseForce * force;
        }
      }

      this.vx += (targetX - this.x) * settings.spring * dt;
      this.vy += (targetY - this.y) * settings.spring * dt;
      this.vx *= Math.pow(settings.friction, dt);
      this.vy *= Math.pow(settings.friction, dt);
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(1.8, 0.34);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
      gradient.addColorStop(0, `rgba(110, 181, 217, ${this.alpha * 0.16})`);
      gradient.addColorStop(0.48, `rgba(96, 168, 210, ${this.alpha * 0.24})`);
      gradient.addColorStop(0.82, `rgba(90, 160, 206, ${this.alpha * 0.08})`);
      gradient.addColorStop(1, "rgba(90, 160, 206, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);

      ctx.strokeStyle = `rgba(55, 127, 190, ${this.alpha * 0.78})`;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.radius * 0.92, this.radius * 0.92, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(95, 172, 214, ${this.alpha * 0.46})`;
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.radius * 0.58, this.radius * 0.58, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.34})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, -this.radius * 0.18, this.radius * 0.42, this.radius * 0.2, 0, Math.PI * 1.05, Math.PI * 1.92);
      ctx.stroke();
      ctx.restore();
    }
  }

  class BloomPetal {
    constructor(index, total) {
      const petalCount = settings.petalCount || 8;
      const spoke = index % petalCount;
      const ring = Math.floor(index / petalCount);
      const spokeT = spoke / petalCount;
      const ringT = ring / Math.max(1, Math.ceil(total / petalCount) - 1);
      const size = Math.min(state.width, state.height);

      this.angle = spokeT * Math.PI * 2 + ringT * (Math.PI / petalCount);
      this.phase = spokeT * Math.PI * 2 + ringT * 0.52;
      this.drawAngle = this.angle;
      this.baseSpread = size * lerp(0.082, 0.128, ringT);
      this.closedSpread = size * lerp(0, 0.045, ringT);
      this.radius = size * lerp(0.074, 0.105, ringT);
      this.alpha = lerp(0.24, 0.4, ringT);
      this.cx = state.width * 0.5;
      this.cy = state.height * settings.baseY;
      this.open = 0.5;
      this.x = this.cx + Math.cos(this.angle) * this.closedSpread;
      this.y = this.cy + Math.sin(this.angle) * this.closedSpread * 0.9;
      this.vx = 0;
      this.vy = 0;
    }

    update(time, dt) {
      const open = 0.5 - Math.cos(state.breath * Math.PI) * 0.5;
      const rotation = (Math.sin(time * 0.00011) * 0.08 + (open - 0.5) * 0.08) * open;
      const spread = lerp(this.closedSpread, this.baseSpread, open);
      const pulse = Math.sin(time * 0.00032) * settings.drift * 0.18 * open;
      const angle = this.angle + rotation;

      this.open = open;
      this.drawAngle = angle;
      const targetX = this.cx + Math.cos(angle) * (spread + pulse);
      const targetY = this.cy + Math.sin(angle) * (spread + pulse * 0.4) * 0.92;

      if (mouse.energy > 0.001) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < settings.mouseRadius) {
          const force = (1 - smoothstep(0, settings.mouseRadius, distance)) ** 2 * mouse.energy;
          const inv = 1 / Math.max(distance, 0.001);
          this.vx += dx * inv * settings.mouseForce * force * 0.72;
          this.vy += dy * inv * settings.mouseForce * force * 0.72;
        }
      }

      this.vx += (targetX - this.x) * settings.spring * dt;
      this.vy += (targetY - this.y) * settings.spring * dt;
      this.vx *= Math.pow(settings.friction, dt);
      this.vy *= Math.pow(settings.friction, dt);
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    draw() {
      const angle = this.open < 0.08 ? 0 : this.drawAngle;
      const radius = this.radius * lerp(0.68, 1.06, this.open);
      const alpha = this.alpha * lerp(0.22, 1, this.open);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);
      ctx.scale(lerp(1, 1.06, this.open), lerp(1, 0.98, this.open));

      const gradientMix = smoothstep(0.28, 0.88, this.open);
      const innerAlpha = alpha * lerp(0.84, 0.9, gradientMix);
      const midAlpha = alpha * lerp(0.84, 0.84, gradientMix);
      const outerAlpha = alpha * lerp(0.84, 0.5, gradientMix);
      const closedColor = settings.warm.map((value, i) => Math.round(lerp(value, settings.coolBack[i], 0.34)));
      const innerColor = settings.warm.map((value, i) => Math.round(lerp(closedColor[i], value, gradientMix)));
      const midColor = settings.coolBack.map((value, i) => Math.round(lerp(closedColor[i], value, gradientMix)));
      const outerColor = settings.coolFront.map((value, i) => Math.round(lerp(closedColor[i], value, gradientMix)));
      const petalFill = ctx.createLinearGradient(-radius, 0, radius, 0);
      petalFill.addColorStop(0, `rgba(${innerColor[0]}, ${innerColor[1]}, ${innerColor[2]}, ${innerAlpha})`);
      petalFill.addColorStop(0.52, `rgba(${midColor[0]}, ${midColor[1]}, ${midColor[2]}, ${midAlpha})`);
      petalFill.addColorStop(1, `rgba(${outerColor[0]}, ${outerColor[1]}, ${outerColor[2]}, ${outerAlpha})`);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = petalFill;
      ctx.fill();

      const highlightAlpha = alpha * lerp(0.12, 0.2, this.open);
      if (highlightAlpha > 0.001) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.clip();

        const highlightOffset = radius * lerp(0, 0.34, this.open);
        const highlightRadius = radius * lerp(0.08, 0.45, this.open);
        const highlight = ctx.createRadialGradient(
          highlightOffset,
          -radius * 0.18 * this.open,
          0,
          highlightOffset,
          -radius * 0.18 * this.open,
          highlightRadius
        );
        highlight.addColorStop(0, `rgba(255, 244, 232, ${highlightAlpha})`);
        highlight.addColorStop(0.45, `rgba(250, 226, 228, ${highlightAlpha * 0.5})`);
        highlight.addColorStop(1, "rgba(250, 226, 228, 0)");
        ctx.fillStyle = highlight;
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
        ctx.restore();
      }

      ctx.strokeStyle = `rgba(${settings.coolFront[0]}, ${settings.coolFront[1]}, ${settings.coolFront[2]}, ${alpha * 0.16})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.985, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  }

  class Pendulum {
    constructor() {
      this.anchorX = state.width * 0.5;
      this.anchorY = state.height * 0.17;
      this.length = Math.min(state.height * 0.5, state.width * 0.32);
      this.angle = Math.PI * 0.49;
      this.velocity = 0;
      this.bobX = this.anchorX;
      this.bobY = this.anchorY + this.length;
      this.trail = [];
    }

    update(time, dt) {
      const simDt = dt * 0.6;
      this.anchorX = state.width * 0.5;
      this.anchorY = state.height * 0.17;
      this.length = Math.min(state.height * 0.5, state.width * 0.32);

      const dx = this.bobX - mouse.x;
      const dy = this.bobY - mouse.y;
      const distance = Math.hypot(dx, dy);
      if (mouse.energy > 0.001 && distance < settings.mouseRadius) {
        const force = (1 - smoothstep(0, settings.mouseRadius, distance)) ** 2 * mouse.energy;
        const tangentX = Math.cos(this.angle);
        const tangentY = -Math.sin(this.angle);
        const tangentPush = clamp(mouse.vx, -18, 18) * tangentX + clamp(mouse.vy, -18, 18) * tangentY;
        const naturalDirection = this.velocity === 0 ? -Math.sign(this.angle || 1) : Math.sign(this.velocity);
        const energyPush = Math.max(0, tangentPush * naturalDirection) * naturalDirection;
        this.velocity += energyPush * settings.mouseForce * force;
      }

      const gravity = settings.spring * 1.15;
      const tinyBreath = Math.sin(time * 0.00018) * 0.00008 * state.breath;
      this.velocity += (-gravity * Math.sin(this.angle) + tinyBreath) * simDt;
      this.velocity *= Math.pow(settings.friction, simDt);
      this.velocity = clamp(this.velocity, -0.085, 0.085);
      this.angle += this.velocity * simDt;

      this.bobX = this.anchorX + Math.sin(this.angle) * this.length;
      this.bobY = this.anchorY + Math.cos(this.angle) * this.length;

      this.trail.push({ x: this.bobX, y: this.bobY, a: 1 });
      if (this.trail.length > 42) {
        this.trail.shift();
      }
      for (const point of this.trail) {
        point.a *= Math.pow(0.9, dt);
      }
    }

    draw() {
      const bobRadius = Math.min(state.width, state.height) * 0.024;

      ctx.save();
      ctx.lineCap = "round";

      for (let i = 1; i < this.trail.length; i += 1) {
        const prev = this.trail[i - 1];
        const point = this.trail[i];
        const alpha = point.a * (i / this.trail.length) * 0.04;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(70, 118, 166, ${alpha})`;
        ctx.lineWidth = bobRadius * 0.34;
        ctx.stroke();
      }

      const stringGradient = ctx.createLinearGradient(this.anchorX, this.anchorY, this.bobX, this.bobY);
      stringGradient.addColorStop(0, "rgba(70, 118, 166, 0.14)");
      stringGradient.addColorStop(1, "rgba(70, 118, 166, 0.36)");
      ctx.beginPath();
      ctx.moveTo(this.anchorX, this.anchorY);
      ctx.lineTo(this.bobX, this.bobY);
      ctx.strokeStyle = stringGradient;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      const glow = ctx.createRadialGradient(this.bobX, this.bobY, 0, this.bobX, this.bobY, bobRadius * 2.6);
      glow.addColorStop(0, `rgba(${settings.coolBack[0]}, ${settings.coolBack[1]}, ${settings.coolBack[2]}, 0.28)`);
      glow.addColorStop(0.58, `rgba(${settings.coolBack[0]}, ${settings.coolBack[1]}, ${settings.coolBack[2]}, 0.09)`);
      glow.addColorStop(1, `rgba(${settings.coolBack[0]}, ${settings.coolBack[1]}, ${settings.coolBack[2]}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(this.bobX, this.bobY, bobRadius * 2.6, 0, Math.PI * 2);
      ctx.fill();

      const bob = ctx.createRadialGradient(
        this.bobX - bobRadius * 0.3,
        this.bobY - bobRadius * 0.34,
        0,
        this.bobX,
        this.bobY,
        bobRadius
      );
      bob.addColorStop(0, `rgba(${settings.warm[0] + 18}, ${settings.warm[1] + 18}, ${settings.warm[2] + 18}, 0.94)`);
      bob.addColorStop(0.52, `rgba(${settings.coolBack[0]}, ${settings.coolBack[1]}, ${settings.coolBack[2]}, 0.88)`);
      bob.addColorStop(1, `rgba(${settings.coolFront[0]}, ${settings.coolFront[1]}, ${settings.coolFront[2]}, 0.86)`);
      ctx.fillStyle = bob;
      ctx.beginPath();
      ctx.arc(this.bobX, this.bobY, bobRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${settings.coolFront[0]}, ${settings.coolFront[1]}, ${settings.coolFront[2]}, 0.24)`;
      ctx.beginPath();
      ctx.arc(this.anchorX, this.anchorY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function createParticles() {
    const total = state.width < 700 ? settings.mobileCount : settings.desktopCount;
    const particles = [];
    for (let i = 0; i < total; i += 1) {
      if (settings.type === "meadow") {
        particles.push(new GrassBlade(i, total));
      } else if (settings.type === "signal") {
        particles.push(new WaveLine(i, total));
      } else if (settings.type === "tide") {
        particles.push(new TideOrb(i, total));
      } else if (settings.type === "bloom") {
        particles.push(new BloomPetal(i, total));
      } else if (settings.type === "pendulum") {
        particles.push(new Pendulum());
      } else {
        particles.push(new Particle(i, total));
      }
    }
    if (settings.type === "corona") {
      state.particles = particles.sort((a, b) => a.layer - b.layer || a.baseRadius - b.baseRadius);
    } else if (settings.type === "bloom") {
      state.particles = particles.sort((a, b) => b.radius - a.radius);
    } else {
      state.particles = particles;
    }
  }

  function updateLayout() {
    if (!state.width || !state.height) return;
    state.originX = state.width * 0.5;
    state.originY = state.height * settings.baseY;
    state.radius = Math.min(state.width, state.height * 1.55);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, settings.maxDpr);
    const width = Math.max(320, Math.round(rect.width));
    const height = Math.max(480, Math.round(rect.height));

    if (state.width === width && state.height === height && state.dpr === dpr) {
      return;
    }

    state.width = width;
    state.height = height;
    state.dpr = dpr;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    updateLayout();
    createParticles();
  }

  function updateMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouse.vx = x - mouse.x;
    mouse.vy = y - mouse.y;
    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = x;
    mouse.y = y;
    mouse.active = true;
    mouse.energy = Math.min(1, mouse.energy + 0.4);
  }

  function drawBackground() {
    const w = state.width;
    const h = state.height;
    const breath = state.breath;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#fbfdff");
    sky.addColorStop(0.48, "#f1f8ff");
    sky.addColorStop(1, "#e6f3ff");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const blue = ctx.createRadialGradient(
      state.originX,
      state.originY - h * settings.blueLift,
      0,
      state.originX,
      state.originY - h * settings.blueLift * 0.82,
      Math.max(w, h) * lerp(settings.blueRadius, settings.blueRadius + 0.06, breath)
    );
    blue.addColorStop(0, "rgba(150, 194, 244, 0.17)");
    blue.addColorStop(0.58, "rgba(150, 194, 244, 0.1)");
    blue.addColorStop(1, "rgba(150, 194, 244, 0)");
    ctx.fillStyle = blue;
    ctx.fillRect(0, 0, w, h);

    if (settings.type === "meadow") {
      drawMeadowGlow(breath);
    } else if (settings.type === "signal") {
      drawSignalGlow(breath);
    } else if (settings.type === "tide") {
      drawTideGlow(breath);
    } else if (settings.type === "bloom") {
      drawBloomGlow(breath);
    } else if (settings.type === "pendulum") {
      drawPendulumGlow(breath);
    } else {
      drawWarmSun(breath);
    }

    const haze = ctx.createLinearGradient(0, h * 0.5, 0, h);
    haze.addColorStop(0, "rgba(255,255,255,0)");
    haze.addColorStop(1, "rgba(255,255,255,0.58)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, w, h);
  }

  function drawWarmSun(breath) {
    const radius = Math.min(state.width * settings.sunRadiusX, state.height * settings.sunRadiusY) * lerp(0.96, 1.06, breath);
    ctx.save();
    ctx.translate(state.originX, state.originY + radius * settings.sunOffset);
    ctx.scale(settings.sunScaleX, settings.sunScaleY);

    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    glow.addColorStop(0, "rgba(248, 178, 62, 0.62)");
    glow.addColorStop(0.32, "rgba(249, 199, 95, 0.36)");
    glow.addColorStop(0.66, "rgba(249, 199, 95, 0.13)");
    glow.addColorStop(1, "rgba(249, 199, 95, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(-radius * 1.5, -radius * 1.5, radius * 3, radius * 3);
    ctx.restore();
  }

  function drawMeadowGlow(breath) {
    const h = state.height;
    const ground = ctx.createLinearGradient(0, h * 0.58, 0, h);
    ground.addColorStop(0, "rgba(206, 226, 184, 0)");
    ground.addColorStop(0.74, `rgba(177, 215, 157, ${lerp(0.24, 0.34, breath)})`);
    ground.addColorStop(1, "rgba(221, 219, 150, 0.34)");
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, state.width, h);
  }

  function drawSignalGlow(breath) {
    const h = state.height;
    const water = ctx.createLinearGradient(0, h * 0.32, 0, h);
    water.addColorStop(0, "rgba(232, 222, 250, 0)");
    water.addColorStop(0.56, `rgba(200, 178, 236, ${lerp(0.14, 0.24, breath)})`);
    water.addColorStop(1, "rgba(234, 226, 246, 0.48)");
    ctx.fillStyle = water;
    ctx.fillRect(0, 0, state.width, h);
  }

  function drawTideGlow(breath) {
    const h = state.height;
    const water = ctx.createLinearGradient(0, h * 0.18, 0, h);
    water.addColorStop(0, "rgba(226, 244, 251, 0)");
    water.addColorStop(0.5, `rgba(157, 211, 231, ${lerp(0.16, 0.24, breath)})`);
    water.addColorStop(1, "rgba(210, 232, 235, 0.58)");
    ctx.fillStyle = water;
    ctx.fillRect(0, 0, state.width, h);
  }

  function drawBloomGlow(breath) {
    const h = state.height;
    const bloom = ctx.createRadialGradient(
      state.width * 0.5,
      h * 0.58,
      0,
      state.width * 0.5,
      h * 0.58,
      Math.max(state.width, h) * lerp(0.22, 0.3, breath)
    );
    bloom.addColorStop(0, "rgba(118, 204, 226, 0.13)");
    bloom.addColorStop(0.55, "rgba(142, 210, 235, 0.06)");
    bloom.addColorStop(1, "rgba(142, 210, 235, 0)");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, state.width, h);

    const coreRadius = Math.min(state.width, h) * lerp(0.036, 0.058, breath);
    const core = ctx.createRadialGradient(
      state.width * 0.5,
      h * 0.57,
      0,
      state.width * 0.5,
      h * 0.57,
      coreRadius
    );
    core.addColorStop(0, "rgba(237, 252, 255, 0.26)");
    core.addColorStop(0.62, "rgba(142, 210, 235, 0.07)");
    core.addColorStop(1, "rgba(142, 210, 235, 0)");
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, state.width, h);
  }

  function drawPendulumGlow(breath) {
    const h = state.height;
    const w = state.width;
    const vertical = ctx.createLinearGradient(0, 0, 0, h);
    vertical.addColorStop(0, "rgba(236, 248, 252, 0.12)");
    vertical.addColorStop(0.52, `rgba(186, 222, 232, ${lerp(0.12, 0.18, breath)})`);
    vertical.addColorStop(1, "rgba(235, 243, 246, 0.42)");
    ctx.fillStyle = vertical;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(
      w * 0.5,
      h * 0.68,
      0,
      w * 0.5,
      h * 0.66,
      Math.max(w, h) * lerp(0.28, 0.34, breath)
    );
    glow.addColorStop(0, "rgba(117, 176, 204, 0.12)");
    glow.addColorStop(0.58, "rgba(117, 176, 204, 0.05)");
    glow.addColorStop(1, "rgba(117, 176, 204, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  function drawTaperedLine(origin, control, tip, particle) {
    const start = 0.018;
    let prev = quadraticPoint(origin, control, tip, start);

    for (let i = 1; i <= settings.lineSegments; i += 1) {
      const t = start + (i / settings.lineSegments) * (1 - start);
      const point = quadraticPoint(origin, control, tip, t);
      const show = smoothstep(0.012, 0.14, t);
      const tipWeight = Math.pow(t, 1.34);
      const colorMix = smoothstep(0.16, 0.86, t);
      const cool = particle.layerWeight;
      const r = Math.round(lerp(settings.warm[0], lerp(settings.coolBack[0], settings.coolFront[0], cool), colorMix));
      const g = Math.round(lerp(settings.warm[1], lerp(settings.coolBack[1], settings.coolFront[1], cool), colorMix));
      const b = Math.round(lerp(settings.warm[2], lerp(settings.coolBack[2], settings.coolFront[2], cool), colorMix));

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(point.x, point.y);
      ctx.lineWidth = particle.lineWidth * (0.06 + tipWeight * 0.94);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${particle.lineAlpha * show * (0.18 + tipWeight * 0.82)})`;
      ctx.stroke();
      prev = point;
    }
  }

  function frame(time) {
    resize();
    const rawDt = (time - state.lastTime) / 16.67;
    const dt = clamp(rawDt || 1, 0.5, 2.1);
    state.lastTime = time;
    state.breath = breathingValue(time);

    mouse.energy *= Math.pow(0.962, dt);
    mouse.vx *= Math.pow(0.7, dt);
    mouse.vy *= Math.pow(0.7, dt);

    drawBackground();

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const particle of state.particles) {
      particle.update(time, dt);
      particle.draw();
    }
    ctx.restore();

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", updateMouse, { passive: true });
  window.addEventListener("pointerleave", () => {
    mouse.active = false;
  });

  document.querySelectorAll('input[name="scene"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      applyScene(input.value);
      mouse.energy = 0;
      mouse.vx = 0;
      mouse.vy = 0;
      createParticles();
    });
  });

  applyScene("corona");
  resize();
  requestAnimationFrame(frame);
})();
