var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;
var counter = 0;

// -------------------------------------------------------------

// objects :

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
	this.vx = 0;
	this.vy = 0;
	
}

// -------------------------------------------------------------

// draw functions :

function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCircle(ctx, x, y, radius) { // draw circle function
    ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    ctx.beginPath(); // custom shape begin
    ctx.fillStyle = 'rgba(255, 110, 110, 0.5)';
    ctx.moveTo(circles[0].x, circles[0].y);
    for (var i=0; i<circles.length; i++) 
	{
        ctx.lineTo(circles[i].x, circles[i].y);
    }
    ctx.closePath(); // custom shape end
    ctx.fill(); // fill custom shape

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.stroke(); // draw border

    for (var i=0; i<circles.length; i++) { // display all our circles
        drawCircle(ctx, circles[i].x, circles[i].y, (hoveredCircle == i) ? 25 : 15);
    }
}

function updateGame()
{
	updateGameLogic();
	drawScene();
}

function updateGameLogic()
{
	counter++;
	for (var i=0; i<circles.length; i++)
	{
		circles[i].vx += Math.random() - 0.5;
		circles[i].vy += Math.random() - 0.5;
		circles[i].x += circles[i].vx;
		circles[i].y += circles[i].vy;
		
		if (circles[i].y + circles[i].radius > canvas.height) 
		{
			circles[i].y = canvas.height - circles[i].radius;
			circles[i].vy = -Math.abs(circles[i].vy);
		}
		
		if (circles[i].x + circles[i].radius > canvas.width) 
		{
			circles[i].x = canvas.width - circles[i].radius;
			circles[i].vx = -Math.abs(circles[i].vx);
		}
		
		if (circles[i].y - circles[i].radius < 0) 
		{
			circles[i].y = circles[i].radius;
			circles[i].vy = Math.abs(circles[i].vy);
		}
		
		if (circles[i].x - circles[i].radius < 0) 
		{
			circles[i].x = circles[i].radius;
			circles[i].vx = Math.abs(circles[i].vx);
		}
		
		if (counter < 15)
			console.log(circles);
	}
}

// -------------------------------------------------------------

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var circleRadius = 15;
    var width = canvas.width;
    var height = canvas.height;

    var circlesCount = 7; // we will draw 7 circles randomly
    for (var i=0; i<circlesCount; i++) {
        var x = Math.random()*width;
        var y = Math.random()*height;
        circles.push(new Circle(x, y, circleRadius));
    }

    setInterval(updateGame, 30); // loop drawScene
});
