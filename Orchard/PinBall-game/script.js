const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
let count=0;
canvas.width=500;
canvas.height=700;

//where ball starts
const ball={
    x: canvas.width/2,//start from middle
    y: canvas.height/3,
    radius: 10,
    dx: 10, //change the directions, coordinates of ball to move it
    dy: 5,
}

const paddle={
    height:10,
    width: 100,
    x: canvas.width/2,
    y: canvas.height-15,
    dx: 1,
    speed: 10 
    //speed of paddle
}

//ball dropping function
const dropBall=()=>{
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2) //for full ball
    ctx.fillStyle="blue";
    ctx.fill();
    ctx.closePath();
}


//moving the paddle function
const movePaddle=()=>
{
    paddle.x += paddle.dx;

    if(paddle.x<0)
    {
        paddle.x=0;
    }

    if((paddle.x + paddle.width) > canvas.width)
    {
        paddle.x = canvas.width - paddle.width;
    }
}

//let boolgameOver=false;

//paddle function
const dropPaddle=()=>
{
    ctx.fillStyle="red";
    ctx.fillRect(paddle.x,paddle.y, paddle.width,paddle.height)
}

//moving the drop ball function
const moveBall=()=>
{
    ball.x += ball.dx;
    ball.y += ball.dy;

    //bounceball function for canvas wall, hit the sides
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0)
    {
        ball.dx *= -1;
    }

    // bounceball do when hit the top 
    if(ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    //bounceball function for paddle and bounce
    if(
        ball.y + ball.radius >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
        
    ){
        ball.dy *= -1;
        ball.y = paddle.y - ball.radius;
        count++;
    }

    //Gameover --> display Game Over message when bottom of canvas
    if(ball.y - ball.radius > canvas.height)
    {
        const gameOver=document.getElementById("gameOver");
        gameOver.innerHTML="GameOver";
        gameOver.style.display="block";

        const score=document.getElementsbyId("score");
        score.innerHTML=`Score: ${count}`;

        //Automatic reload
        document.location.reload();

    }
}


const update=()=>
{

    //if(boolgameOver) return;

    //this makes it look like a ball is moving instead of a straight line forming while moving
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dropBall();
    dropPaddle();

    moveBall();
    movePaddle();

    requestAnimationFrame(update); //a recursive function to keep executing the update function when ever the x and y changes
}

document.addEventListener('keydown', (e)=> {
    if(e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    }
    else if(e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
})

document.addEventListener('keyup' , (e) =>
{
    if(e.key === "ArrowRight" || e.key === "ArrowLeft")
    {
        paddle.dx=0;
    }
})

update();
