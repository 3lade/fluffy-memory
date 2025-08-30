function lengthCheck(password,calb){
    if(password.length>=8){
       console.log("Password length check passed")
       calb(null,true)
    }
    else{
        console.log("Password length check failed")
        calb('Password is too short',false)
    }
}

function numberCheck(password,calb){
    const numRegex=/[0-9]/
  if(numRegex.test(password)){
    console.log("Number check passed")
    calb(null,true)
  }
  else{
    console.log("Number check failed")
    calb('Password must include at least one number',false)
  }
}

function specialCharCheck(password,calb){
 const specRegex=/[!@#$%^&*(),.?"{}|<>]/
 if(specRegex.test(password)){
    console.log("Special Character check passed")
    calb(null,true)
 }
 else{
    console.log("Special Character check failed")
    calb('Password must include at least one special character',false)
 }
}

function upperCaseCheck(password,calb){
    const validRegex=/[A-Z]/
    if(validRegex.test(password)){
        console.log("Uppercase letter check passed")
        calb(null,true)
    }
    else{
        console.log("Uppercase letter check failed")
        calb('Password must include at least one uppercase letter',false)
    }
}

function checkPasswordStrength(password,calb){
   const validators=[lengthCheck,numberCheck,specialCharCheck,upperCaseCheck]
   let errors=[]

   function runCheck(index){
    if(index>=validators.length){
        console.log("Password Strength Check Completed")
      const isValid=errors.length===0
      calb(errors.length?errors:null,isValid)
      return
    }
    validators[index](password,(error,isValid)=>{
        if(!isValid&&error){
            errors.push(error)
        }
        runCheck(index+1)
    })
   }
   runCheck(0)
}

module.exports={checkPasswordStrength}