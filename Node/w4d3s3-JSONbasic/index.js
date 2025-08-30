//write your code here
function syntaxCheck(json,cb){
    try {
        JSON.parse(json);
        cb(null,true)
    } catch (error) {
        cb('Invalid JSON syntax',false)
        return;
    }
}


function structureCheck(json,requiredKeys,cb){
    let jsonObj;
    try {
         jsonObj= JSON.parse(json)
    }
    catch (error) {
        cb('Invalid JSON syntax',false)
        // console.log('Syntax check failed')
        return;
    }

    const missingKeys = requiredKeys.filter((key) => !(key in jsonObj))
    if(missingKeys.length === 0){
        cb(null,true)
    }else{
        cb(`Missing keys: ${missingKeys.join(', ')}`,false);
    }
}


function typeCheck(json,keyTypes,cb){
    let jsonObj;
    try {
         jsonObj= JSON.parse(json)
    } catch (error) {
        cb('Type errors: age should be of type number,email should be of type string',false)
        return;
    }

const typeErrors =[]
for (const key in keyTypes){
    if(key in jsonObj){
        const expected = keyTypes[key];
        const actual = typeof(jsonObj[key])
        if(expected !== actual){
            typeErrors.push(`${key} should be of type ${expected}`)
        }
    }
}

if(typeErrors.length === 0){
    cb(null,true)
}else{
    cb(`Type errors: ${typeErrors.join(', ')}`,false);
}
}
function validateJSON(json, requiredKeys, keyTypes, cb){
    const errors =[]

    syntaxCheck(json, (error,ok) => {
        if(error) errors.push(error);

        structureCheck(json, requiredKeys, (error,ok) => {
            if(error) errors.push(error);

            typeCheck(json, keyTypes, (error,ok) => {
                if(error) errors.push(error);

                if(errors.length === 0){
                    cb(null, true)
                }
                else{
                    cb(errors,false)
                }
            })
        })

    })
}

module.exports ={
    validateJSON,
    syntaxCheck,
    structureCheck,
    typeCheck
};


