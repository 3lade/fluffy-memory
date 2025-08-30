var red = document.getElementById("redRange");
var blue= document.getElementById("blueRange");
var green=document.getElementById("greenRange");

var redN = 128;
var greenN =0;
var blueN= 128;

document.addEventListener('load',updateColorDisplay());

function updateColorDisplay(){
    var colorDisplay = document.getElementById("colorDisplay");
    colorDisplay.style.background=`rgb(${redN}, ${greenN}, ${blueN})`;
    console.log(`rgb(${redN}, ${greenN}, ${blueN})`);
}
document.getElementById("randomColorBtn").addEventListener('click',()=>{
    maxR=255;
    minR =0;
    redN = Math.floor(Math.random()*(maxR-minR) +minR);
    blueN = Math.floor(Math.random()*(maxR-minR)+minR);
    greenN = Math.floor(Math.random()*(maxR-minR)+minR);
    updateColorDisplay();
})

red.addEventListener('input',(event)=>{
    redN = Number(event.target.value);
    updateColorDisplay();
})

blue.addEventListener('input',(event)=>{
    blueN = Number(event.target.value);
    updateColorDisplay();
})

green.addEventListener('input',(event)=>{
    greenN =Number(event.target.value);
    updateColorDisplay();
})

