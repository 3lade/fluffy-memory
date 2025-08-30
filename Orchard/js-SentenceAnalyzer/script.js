function analyzeSentence()
{
    const sentence=document.getElementById("userSentence").value.trim();
    const result=document.getElementById("analysisOutput");

    if(!/^[a-zA-Z\s]+$/.test(sentence) || sentence.length===0)
    {
        result.innerHTML=`Please enter only alphabets and spaces.`
        return;
    }

    const cleanText=sentence.replace(/[.,/'"!@#$%^&*()]/g, '').trim();

    const words=cleanText.split(/\s+/).filter(w => w.length>0);
    const numOfWords=words.length;

    let totalWordLen=0;
    let longestWord="";

    for(let word of words)
    {
        totalWordLen+=word.length;
        if(word.length>longestWord.length)
        {
            longestWord=word;
        }
    }
    const avgWordLen=(totalWordLen/numOfWords).toFixed(2);

    result.textContent=
    `Sentence Analysis: - Number of Words: ${numOfWords} - Average Word Length: ${avgWordLen} (excluding punctuation and spaces) - Longest Word: ${longestWord}`;
}