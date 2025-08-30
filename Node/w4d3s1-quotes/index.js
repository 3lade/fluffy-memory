let quotes=[
    "Life is short, code hard.",
    "Eat, sleep, code, repeat.",
    "First solve the problem, then write the code.",
    "Debugging is like being the detective in a crime movie.",
    "Code never lies, comments sometimes do."
];

function getRandomQuote()
{
    // const len = quotes.length;
    if(quotes.length !== 0)
    {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        return quotes[randomIndex];
    } else {
        return "No quotes available."
    }
}

function listQuotes()
{
    if(quotes.length !==0)
    {
        let output="";
        quotes.forEach((quote, idx) =>
        {
            output += `${idx+1}. ${quote}\n`;
        });
        return output.trim();
    }
    else{
        return "No quotes in the list."
    }
}

function addQuote(quoteText)
{
    if(typeof quoteText !== 'string' || quoteText.trim() === "")
    {
        
        return "Invalid quote.";
    } else {
        const trimmed=quoteText.trim();
        quotes.push(trimmed);
        return `Quote added: ${trimmed}`
    }
}

function clearQuotes()
{
    if(quotes.length !== 0)
    {
        quotes=[];
        return "All quotes cleared."
    }
}

module.exports={
    getRandomQuote,
    listQuotes,
    addQuote,
    clearQuotes
}