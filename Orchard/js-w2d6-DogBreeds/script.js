window.addEventListener('load', loadBreedInfo);

async function loadBreedInfo() {

    try{
        let desc=document.getElementById("breedDescription");
        let response=await(fetch("https://dog.ceo/api/breeds/list/all"));
        let dogsData=await response.json();
        let dogsList=Object.keys(dogsData.message);

        let dogBreed1=dogsList[0];
        desc.textContent=dogBreed1;

        let select=document.getElementById("breedSelect");

        dogsList.forEach((i) =>
        {
            let option=document.createElement("option");
            option.value=i;
            option.textContent=i;
            select.append(option);
        });
    }
    catch{
        document.getElementById("result").textContent='Error Loading breed list'
    }
}

document.getElementById("breedSelect").addEventListener('change', async(event)=>
{
    let breedName=event.target.value;
    let img=document.getElementById("breedImage");
    let desc=document.getElementById("breedDescription");

    let h2Value=document.getElementById("breedName");
    h2Value.textContent=breedName;

    try{
        let imgF=await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
        if(!imgF.ok) {
            throw new Error('Error fetching breed info.')
        }
        let imgFD=await imgF.json();
        console.log(imgFD.message);

        img.src=imgFD.message;
    }
    catch(error)
    {
        document.getElementById("result").textContent=`${error}`;
        img.src="";
    }
    try {
        let desF=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breedName}`);
        if(!desF.ok)
        {
            throw new Error('No description available.');
        }
        let desFD=await desF.json();
        console.log(desFD);
        desc.textContent=desFD.extract;
    }
    catch(error)
    {
        document.getElementById("result").textContent=`${error}`;
        desc.textContent="";
    }
});