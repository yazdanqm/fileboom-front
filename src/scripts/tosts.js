import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const successToast = Toastify({
  text: "لینک کپی شد",
  duration: 2200,
  gravity: "bottom",
  position: "right",
  stopOnFocus: true,
  style: {
    background: "#F4FDF8",
    borderRadius: "0.8rem",
    border: "1px solid #2CCD70",
    color: "#2CCD70",
    boxShadow:"none"
  }
});

const failedToast = Toastify({
  text: "مشکلی پیش آمد",
  duration: 2200,
  gravity: "bottom",
  position: "left",
  stopOnFocus: true,
  style: {
    background: "red",
    borderRadius: "0.5rem"
  }
});

let copyLink = document.getElementById('copyLink');
let pageUrl = window.location.href;
let clicks = 0;

if (copyLink) {
  copyLink.addEventListener("click" , (e) => {
    e.preventDefault();
    clicks ++;

    console.log(clicks);
     navigator.clipboard.writeText(pageUrl).then(function() {
    successToast.showToast();
  }, function() {
    failedToast.showToast();
  });

  if (clicks > 1) {
   const myTimeout = setTimeout(()=>{successToast.hideToast()}, 2200);
   let tosts = document.getElementsByClassName("toastify");

   for(let tost of tosts){
     tost.classList.remove("on");
     tost.classList.add("off");
   }
  }

});
}
