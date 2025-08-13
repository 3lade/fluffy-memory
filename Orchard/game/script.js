const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

canvas.width=500;
canvas.width=700;

const ball={
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    dx: 1,
    dy: 3
}

const paddle={
    height:10,
    width: 100,
    x: canvas.width/2,
    y: canvas.height/2,
    dx: 1,
    speed: 5
}

const dropBall=()=>{
    ctx.arc(ball.x,ball.y,ball.radius, 0, Math.PI*2)
}
dropBall();
