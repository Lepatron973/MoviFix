const  cartAmount = document.querySelector('.cart span');
const dismissAlertBtn = document.querySelector(".dismiss-alert");

if(dismissAlertBtn != null){
    dismissAlertBtn.addEventListener("click",dismiss);
}

function dismiss(){
   let alerts = document.querySelectorAll(".alert");
   for(let alert of alerts){
       alert.style.display = "none";
   }
}