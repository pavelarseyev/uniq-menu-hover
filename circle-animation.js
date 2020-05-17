let image = $(".image");
let canvas = document.getElementById("circle-canvas");
let ctx = canvas.getContext("2d");
let w,
  h,
  imageHeight,
  imageY,
  centerX,
  centerY,
  diameter,
  radius,
  lineWidth,
  halfLine,
  startAngle,
  circlesCount,
  x1,
  y1,
  x2,
  y2,
  endX,
  endY;

/* settings */

lineWidth = 4;
halfLine = lineWidth / 2;
startAngle = (-21 * Math.PI) / 180;
circlesCount = 2;
let lineStartIteration = 270;

function setDimensions() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  imageHeight = image.height();
  let imageWidth = image.width();
  let imageInfo = image.offset();
  let imageX = imageInfo.left;
  imageY = imageInfo.top;
  diameter = imageWidth * 1.38;
  radius = diameter / 2;
  centerX = imageX - imageWidth * 0.538 + radius;
  centerY = imageY - imageHeight * 0.113 + radius;
  /* x : 1.2; y : 0.51 */
  x1 = imageX + imageWidth * 1.4;
  y1 = imageY + imageHeight * 0.56;
  x2 = imageX + imageWidth * 1.36;
  y2 = imageY + imageHeight * 1.13;
}

window.addEventListener("load", function () {
  initCircleAnimation();
});


function updateRings() {
  setDimensions();
  drawRing();
  // for (let i = 0; i < circlesCount; i++) {
    
  // }
}

function drawRing() {
  ctx.lineWidth = lineWidth;

  let x = centerX + Math.cos(startAngle) * radius - halfLine;
  let y = centerY + Math.sin(startAngle) * radius - halfLine;

  

  for (let i = 0; i <= lineStartIteration; i++) {
    ctx.strokeStyle = `hsl(343, 94%, ${100 - (i / lineStartIteration * 44)}%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    let currentAngle = startAngle - (i * Math.PI) / 180;
    x = centerX + Math.cos(currentAngle) * radius - halfLine;
    y = centerY + Math.sin(currentAngle) * radius - halfLine;

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  let slowTime = time * 0.01;
  endX = w + 100;
  endY = y;
 
  for (let i = 0; i < circlesCount; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    let tempX2 = x2 + Math.sin(slowTime) * (i >= 1 ? 100 : -150);
    let tempY2 = y2 + Math.cos(slowTime) * (i >= 1 ? -100 : 150);
    let tempEndY = endY + Math.sin(slowTime) * (i >= 1 ? 30 : -40);
    let tempEndX = endX /* + Math.sin(slowTime) * (i >= 1 ? -30 : 40) */;

    ctx.bezierCurveTo(x1, y1, tempX2, tempY2, tempEndX, tempEndY);
    ctx.stroke();

    // ctx.fillStyle = "#ff0000"
    // ctx.fillRect(x1 - 1, y1 - 1, 2, 2);
    // ctx.fillRect(tempX2 - 1, tempY2 - 1, 2, 2);
  }
  
}
let time = 0;

function initCircleAnimation() {
  time++;
  ctx.clearRect(0, 0, w, h);
  updateRings();
  requestAnimationFrame(initCircleAnimation);
}
