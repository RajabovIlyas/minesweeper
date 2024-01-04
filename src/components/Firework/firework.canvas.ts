import { MutableRefObject } from 'react';

const rndColor = () => {
  const base = Math.random() * 360 | 0;
  const color = (275 * (base / 200 | 0)) + base % 200;
  return (fac = 0) => `hsl(${color}, ${(fac || 1) * 100}%, ${(fac || 1) * 60}%)`;
};

interface Coordinate {
  r: number;
  s: number;
  d: number;
  y: number;
}

interface Salve {
  x: number;
  mx: number,
  y: number,
  ym: number,
  c: (fac?: number) => string,
  cb: ((salve: Salve) => void) | null
  explosion?: Coordinate[]
}

class Battery {
  fireworks: Fireworks;
  salve: Salve[];
  x: number;
  t: number;
  count = 0;
  tmod: number;
  tmax: number;

  _shot: (salve: Salve) => void;

  _prepareExplosion: (salve: Salve) => void;
  _explode: (salve: Salve) => void;


  constructor(fireworks: Fireworks) {
    this.fireworks = fireworks;
    this.salve = [];
    this.x = Math.random();
    this.t = 0;
    this.tmod = 20 + Math.random() * 20 | 0;
    this.tmax = 250;


    this._shot = (salve: Salve) => {

      if (salve.y < salve.ym) {
        salve.cb = this._prepareExplosion;
      }

      salve.x += salve.mx;
      salve.y -= 0.01;

      const r = Math.atan2(-0.01, salve.mx);

      if (!this.fireworks.engine) {
        return;
      }

      this.fireworks.engine.strokeStyle = salve.c(.7);
      this.fireworks.engine.beginPath();

      this.fireworks.engine.moveTo(
        (this.x + salve.x) * this.fireworks.width + Math.cos(r) * 4,
        salve.y * this.fireworks.height + Math.sin(r) * 4
      );

      this.fireworks.engine.lineTo(
        (this.x + salve.x) * this.fireworks.width + Math.cos(r + Math.PI) * 4,
        salve.y * this.fireworks.height + Math.sin(r + Math.PI) * 4
      );

      this.fireworks.engine.lineWidth = 3;
      this.fireworks.engine.stroke();

      // this.fireworks.engine.fillRect((this.x + salve.x) * this.fireworks.width, salve.y * this.fireworks.height, 10, 10);
    };

    this._prepareExplosion = (salve: Salve) => {
      salve.explosion = [];

      for (let i = 0, max = 32; i < max; i++) {
        salve.explosion.push({
          r: 2 * i / Math.PI,
          s: 0.5 + Math.random() * 0.5,
          d: 0,
          y: 0
        });
      }

      salve.cb = this._explode;
    };

    this._explode = (salve) => {
      if (!this.fireworks.engine) {
        return;
      }
      if(salve.c){
        this.fireworks.engine.fillStyle = salve.c();
      }


      Array.isArray(salve.explosion) && salve.explosion.forEach((explo: Coordinate) => {

        explo.d += explo.s;
        explo.s *= 0.99;
        explo.y += 0.5;

        const alpha = explo.s * 2.5;

        if (!this.fireworks.engine) {
          return;
        }

        this.fireworks.engine.globalAlpha = alpha;

        if (alpha < 0.05) {
          salve.cb = null;
        }

        this.fireworks.engine.fillRect(
          Math.cos(explo.r) * explo.d + (this.x + salve.x) * this.fireworks.width,
          Math.sin(explo.r) * explo.d + explo.y + salve.y * this.fireworks.height,
          3,
          3
        );
      });

      this.fireworks.engine.globalAlpha = 1;
    };
  }

  pushSalve() {

    this.salve.push({
      x: 0,
      mx: -0.02 * Math.random() * 0.04,
      y: 1,
      ym: 0.05 + Math.random() * 0.5,
      c: rndColor(),
      cb: this._shot
    });
  }

  render() {

    this.t++;

    if (this.t < this.tmax && (this.t % this.tmod) === 0) {
      this.pushSalve();
    }

    let rendered = false;

    this.salve.forEach((salve) => {
      if (salve.cb) {
        rendered = true;
        salve.cb(salve);
      }

    });

    if (this.t > this.tmax) {
      return rendered;
    }

    return true;
  }
}

export class Fireworks {


  canvas: HTMLCanvasElement | null;
  engine?: CanvasRenderingContext2D | null;
  stacks: Map<number, Battery>;

  static animationFrameId: number;

  static animation = false;

  width = 0;
  height = 0;

  constructor(ref: MutableRefObject<null | HTMLCanvasElement>) {
    this.canvas = ref.current;
    this.engine = ref.current?.getContext('2d');
    this.stacks = new Map<number, Battery>();

    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (!this.canvas) {
      return;
    }

    this.canvas.setAttribute('width', String(this.width));
    this.canvas.setAttribute('height', String(this.height));
  }

  clear() {
    if (!this.engine) {
      return;
    }
    this.engine.fillStyle = 'transparent';
    this.engine.clearRect(0, 0, this.width, this.height);
    this.engine.fillRect(0, 0, this.width, this.height);
  }

  deleteStacks() {
    this.clear();
    if (!this.stacks) {
      return;
    }
    cancelAnimationFrame(Fireworks.animationFrameId);
    for(const [key] of this.stacks){
      this.stacks.delete(key);
    }
    cancelAnimationFrame(Fireworks.animationFrameId);
  }

  addBattery() {
    const bat = new Battery(this);
    this.stacks.set(Date.now(), bat);
  }

  render() {

    if (this.stacks.size >= 20) {
      Fireworks.animation = false;
    }


    if (Math.random() < 0.05 && Fireworks.animation) {
      this.addBattery();
    }

    this.clear();

    Fireworks.animationFrameId = requestAnimationFrame(this.render.bind(this));

    this.stacks.forEach((scene: Battery, key: number) => {

      const rendered = scene.render();

      if (!rendered) {
        this.stacks.delete(key);
      }
    });

  }

  run() {
    Fireworks.animation = true;
    for(let i = 0; i< 10; i++){
    this.addBattery();
    }


    window.addEventListener('resize', this.resize.bind(this));
    this.render();
  }
}


