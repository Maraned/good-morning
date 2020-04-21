import React from 'react';

class Cloud {
  constructor(props) {
    this.context = props.context;
    this.x = props.width / 2;
    this.y = props.height / 2;

    this.startX = this.x - 110; 
    this.endX = this.x - -30;

    this.height = 150;
    this.startY = this.y + 85;
    this.endY = this.y - 75;

    this.animationProgress = 200;
    this.animationDirection = 'up';

    this.animationSpeed = 5;
  }

  animateBackground = () => {
    if (this.animationProgress === 990) {
      this.animationDirection = 'down';
    } else if (this.animationProgress === 200) {
      this.animationDirection = 'up';
    }

    const opacity = `${this.animationProgress / 100}`.replace('.', '');
    this.context.fillStyle = `rgb(255, 255, 255, .9${opacity})`;

    if (this.animationDirection === 'up') {
      this.animationProgress += this.animationSpeed;
    } else {
      this.animationProgress -= this.animationSpeed;
    }
  }

  draw() {
    this.context.beginPath();
    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(this.endX, this.startY);

    const cp1x1 = this.endX + 80;  
    const cp1y1 = this.startY;
    const cp1x2 = this.endX + 60;
    const cp1y2 = this.startY - 100;
    const end1x = this.endX;
    const end1y = this.startY - 65;
    this.context.bezierCurveTo(cp1x1, cp1y1, cp1x2, cp1y2, end1x, end1y);

    const cp2x1 = end1x + 20;  
    const cp2y1 = end1y - 10;
    const cp2x2 = this.endX - 20;
    const cp2y2 = this.startY - 130;
    const end2x = this.endX - 60;
    const end2y = this.startY - 85;
    this.context.bezierCurveTo(cp2x1, cp2y1, cp2x2, cp2y2, end2x, end2y);

    const cp3x1 = end2x;  
    const cp3y1 = end2y -10;
    const cp3x2 = this.startX + 20;
    const cp3y2 = this.startY - 120;
    const end3x = this.startX + 10;
    const end3y = this.startY - 60;
    this.context.bezierCurveTo(cp3x1, cp3y1, cp3x2, cp3y2, end3x, end3y);

    const cp4x1 = end3x - 30;  
    const cp4y1 = end3y - 20;
    const cp4x2 = this.startX - 60;
    const cp4y2 = this.startY - 20;
    const end4x = this.startX;
    const end4y = this.startY;
    this.context.bezierCurveTo(cp4x1, cp4y1, cp4x2, cp4y2, end4x, end4y);

    this.animateBackground();

    this.context.lineWidth = 7;
    this.context.fill();
    const previousLineDash = this.context.getLineDash();
    this.context.setLineDash([1, 0]);
    this.context.strokeStyle = 'rgba(238, 238, 238, 0.3)' // '#eee';
    this.context.stroke(); 
    this.context.setLineDash(previousLineDash);
  }
}

export default Cloud;
