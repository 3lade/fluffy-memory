const images=[
    {
        src:"/images/image.jpg",
        caption:"day"
    },
    {
        src:"/images/image2.jpg",
        caption:"night"
    }
];

const albumImage=document.getElementById("albumImage");

const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");

let currentImage=0;

albumImage.src=images[currentImage].src;

prevBtn.addEventListener("click",()=>{
    currentImage=(currentImage-1+images.length)%images.length;
    albumImage.src=images[currentImage].src;
});

nextBtn.addEventListener("click",()=>{
    currentImage=(currentImage+1)%images.length;
    albumImage.src=images[currentImage].src;
});
