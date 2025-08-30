document.getElementById("searchButton").addEventListener('click', ()=>
{
    const countryInput=document.getElementById("countryInput").value;
    const results=document.getElementById("results");

    if(!countryInput)
    {
        results.textContent='Please enter a country name.'
        results.classList.add("error");
        return;
    }
    //same logic in async and await
    fetch(`https://restcountries.com/v3.1/name/${countryInput}?fullText=true`)
    .then((response) =>
    {
        if(!response.ok)
        {
            results.innerHTML='<p>Country not found</p>'
            results.classList.add("error");
        }
        return response.json()
    }).then((data)=>
    {
        displayResults(data[0]);
    }).catch((error) =>
    {
        results.innerHTML='<p>Country not found</p>';
        results.classList.add=("error");
    })

    const displayResults=(countryData)=>
    {
        const name=countryData.name.common ?? 'N/A';
        const capital=countryData.capital ?? 'N/A';
        const population=countryData.population ?? 'N/A';
        const flag=countryData.flags.png ?? 'N/A';

        results.innerHTML=
        `
        <h2>${name}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <img src="${flag}" alt="Flag of ${name}">
        `

    }
})
document.getElementById("backButton").addEventListener('click',()=>
{
    document.getElementById("countryInput").value="";
    results.innerHTML="";
})