class Wind {
  constructor(props) {
    this.context = props.context;
    this.x = props.width / 2;
    this.y = props.height / 2;

    this.x -= 40;
    this.y += 90;

    this.length = 80;

    this.len = 500;
    this.halfLen = this.len / 4;

    this.windDirectionDegrees = props.windDirection;
    console.log('angle', this.windDirectionDegrees, props)

    this.speed = 10;
  }

  rotate = () => {
    this.context.save();
    const angle = this.windDirectionDegrees * Math.PI / 180;
    this.context.translate(this.x, this.y);
    this.context.rotate(angle);
    this.context.translate(-this.x, -this.y);
  }

  getRightLimits = (endX, endY) => ({
    cp1x: endX,
    cp1y: endY + 30,
    cp2x: endX - 40,
    cp2y: endY + 10,
    end1x: endX - 20,
    end1y: endY - 10,
  })

  getLeftLimits = (endX, endY) => ({
    cp1x: endX,
    cp1y: endY + 30,
    cp2x: endX + 40,
    cp2y: endY + 10,
    end1x: endX + 20,
    end1y: endY - 10,
  })

  start = (width, col) => {
    this.context.lineWidth = width; 
    this.context.strokeStyle = col; 
    this.context.beginPath(); 
  }

  drawPust = (xOffset, yOffset, length, direction) => {
    this.context.save();

    // this.context.translate(this.x, this.y);
    
    const startX = this.x - xOffset;
    const endX = this.x - xOffset;
    
    const startY = (this.y - yOffset);
    const endY = this.y - yOffset + length;

    // this.context.moveTo(this.x, this.y);
    // this.context.moveTo(0, 0);


    let lines;
    if (direction === 'right') {
      const rightLimits = this.getRightLimits(endX, endY);

      const cp1x = rightLimits.cp1x;  
      const cp1y = rightLimits.cp1y;
      const cp2x = rightLimits.cp2x;
      const cp2y = rightLimits.cp2y;
      const end1x = rightLimits.end1x;
      const end1y = rightLimits.end1y;
      lines = [[startX, startY], [endX, endY], [cp1x, cp1y, cp2x, cp2y, end1x, end1y]];
    } else {
      const leftLimits = this.getLeftLimits(endX, endY);

      const cp1x = leftLimits.cp1x;  
      const cp1y = leftLimits.cp1y;
      const cp2x = leftLimits.cp2x;
      const cp2y = leftLimits.cp2y;
      const end1x = leftLimits.end1x;
      const end1y = leftLimits.end1y;
      lines = [[startX, startY], [endX, endY], [cp1x, cp1y, cp2x, cp2y, end1x, end1y]];
    }    

    const render = {
      "2"(p, ctx) { ctx.lineTo(...p) },
      "4"(p, ctx) { ctx.quadraticCurveTo(...p) },   
      "6"(p, ctx) { ctx.bezierCurveTo(...p) },   
    }

    const overallLineDash = (this.animateTime / this.speed) % this.len;
    const lineDash = overallLineDash > this.halfLen 
      ? this.len - overallLineDash 
      : overallLineDash;
    this.context.setLineDash([lineDash % this.len, 10000]);
    this.rotate();
    this.start(4, '#ccc')
    lines.forEach(l => render[l.length](l, this.context));

    this.context.stroke();

    this.context.restore();
    this.context.closePath();
  }

  drawFirstPust = () => {
    const xOffset = -20;
    const yOffset = 0;
    const length = this.length - 10;
    this.drawPust(xOffset, yOffset, length);
  }

  drawSecondPust = () => {
    const xOffset = 0;
    const yOffset = 20;
    const length = this.length;
    this.drawPust(xOffset, yOffset, length, 'right');
  }

  drawThirdPust = () => {
    const xOffset = -40;
    const yOffset = 25;
    const length = this.length - 15;
    this.drawPust(xOffset, yOffset, length);
  }

  draw(time, startTime) {
    this.animateTime = time - startTime;
    this.drawFirstPust();
    this.drawSecondPust();
    this.drawThirdPust();
  }
}

export default Wind;
