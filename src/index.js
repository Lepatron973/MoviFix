import {capitalize} from './utilities';
const module = capitalize(location.pathname.split('/')[1])
import(`./pages/${module}`)

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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
//   
