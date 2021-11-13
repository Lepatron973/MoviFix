const passwordInput = document.querySelector("input[name=password]");
const confirmPasswordInput = document.querySelector("input[name=confirm-password]");
const submitBtn = document.querySelector("input[type=submit]");
const form = document.querySelector("form");


confirmPasswordInput.addEventListener('keyup', (e)=>{
    
})

function stopSubmit(){
    
}

form.addEventListener('submit', e => {
    if(passwordInput.value != confirmPasswordInput.value){
        e.preventDefault()
        confirmPasswordInput.style.border= "1px solid red";
        alert("veuillez rentrer le même mot de passe dans les deux champs")
        
    }else{
        form.submit()
    }
    
})