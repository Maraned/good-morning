


class Sun {
  constructor(props) {
    this.x = 200;
    this.y = 200;
    this.r = 40;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.raysAmount = 12;
    this.interval = null;
    this.offset = 0;

    this.colors = [
      '#ffd900',
      '#ffe139',
    ];

    this.context = props.context;
    this.redraw = props.redraw;

    this.sunRotationDeg = 360;
  }

  drawCircle = () => {
    this.context.save();

    this.rotateSun(true);

    this.context.fillStyle = this.colors[0];
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.startAngle, this.endAngle);

    this.context.fill();
    this.context.restore();

  }

  drawRay = (i, rayFactor) => {
    const degrees = (i + this.offset) * rayFactor;

    let height = 20;
    const width = 10;

    const startY = this.y - this.r - 30;
    this.context.save();
    this.context.fillStyle = this.colors[0];
    this.rotateSun();

    const angle = degrees * Math.PI / 180;

    this.context.translate(this.x, this.y);
    this.context.rotate(angle);

    this.context.translate(-this.x, -this.y);

    this.context.fillRect(this.x, startY, width, height);

    this.context.restore();
  };

  drawRays = () => {
    const rayFactor = 360 / this.raysAmount;

    for (let i = 0; i < this.raysAmount; i++) {
      this.drawRay(i, rayFactor);
    }
  };

  increaseOffset = () => {
    this.offset += 0.005;
    if (this.offset > 1) {
      this.offset = 0;
    }
  }

  rotateSun = (mainRotation) => {
    const angle = this.sunRotationDeg * Math.PI / 180;
    this.context.translate(this.x, this.y * 2);
    this.context.rotate(angle);
    this.context.translate(-this.x, -this.y * 2);
    if (mainRotation) {
      this.sunRotationDeg += 0.1;
      if (this.sunRotationDeg > 360) {
        this.sunRotationDeg = 0;
      }
    }
  }

  draw = () => {
    this.drawCircle();
    this.drawRays();
    this.increaseOffset();
  };
}

export default Sun;
