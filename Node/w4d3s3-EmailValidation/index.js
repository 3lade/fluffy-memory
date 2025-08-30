function formatCheck(email, cb)
{
    const formatRegEx= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(formatRegEx.test(email))
    {
        cb(null, true);
        console.log("Format check passed");
    } else {
        cb("Email format is invalid", false);
        console.log("Format check failed");
    }
}

function domainCheck(email, cb)
{
    const [username, domain] = email.split('@',2);
    if(domain && domain.trim() !== "")
    {
        cb(null, true)
        console.log("Domain check passed");
    } else {
        cb("Email must include a domain", false);
        console.log("Domain check failed");
    }
}

function tldCheck(email, cb)
{
    const tldRegex = /\.[a-zA-Z]{2,}$/;
    if(tldRegex.test(email))
    {
        cb(null, true);
        console.log("TLD check passed");
    } else {
        cb("Email must include a valid top-level domain", false)
        console.log("TLD check failed");
    }
}

function validateEmail(email, cb)
{
    const validators = [formatCheck, domainCheck, tldCheck];
    let errors=[];

    function runCheck(index) {
        if(index>=validators.length)
        {
            console.log("Validation complete.");
            const isValid=errors.length === 0;
            cb(errors.length ? errors : null, isValid)
            return;
        }
        validators[index](email,(error, isValid)=>
        {
            if(!isValid || error)
            {
                errors.push(error);
            }
            runCheck(index+1);
        });
    }
    runCheck(0);

}

module.exports={validateEmail};