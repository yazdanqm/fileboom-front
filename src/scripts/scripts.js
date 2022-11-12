var myMenu = document.getElementById("myMenu");
var fake = document.getElementById("fake");
let isClosed = false;

let fromTop = null;
if (myMenu) {

  let mainHeader = document.getElementsByClassName("main-header");
  let headerInner = document.getElementsByClassName("header-inner");

  var el = window.getComputedStyle(mainHeader[0]).getPropertyValue('padding-top');
  var el2 = window.getComputedStyle(headerInner[0]).getPropertyValue('height');
  var el3 = window.getComputedStyle(myMenu).getPropertyValue('height');

  fromTop = parseFloat(el) + parseFloat(el2) - parseFloat(el3) - parseFloat(el);

}


var closeBtn = document.getElementById("closeBtn");

if (closeBtn) {
  closeBtn.addEventListener("click", function closing() {
    myMenu.classList.add("myclass");
    setTimeout(() => {
      myMenu.style.display = "none";
      fake.style.display = "none";
    }, "400");

    isClosed = true;
  });
}

if (myMenu) {
  window.addEventListener("scroll", function(event) {
    var scroll = this.scrollY;
    if (scroll > fromTop) {
      myMenu.classList.add("fixed-class");
      if (!isClosed) {
        fake.style.display = "block";
      }
    } else {
      myMenu.classList.remove("fixed-class");
      fake.style.display = "none";
    }
  });
}

let myNav = document.getElementById("myNav");
let openNav = document.getElementById("openNav");
openNav.addEventListener("click", navFucn);

function navFucn(event) {
  myNav.style.right = "0px";
}
let searchClick = document.getElementById("searchClick");
let searchInp = document.getElementById("searchInp");

window.addEventListener("mousedown", function(event) {
  if (myNav.style.right === "0px") {
    if (
      event.target != myNav &&
      event.target.parentNode.parentNode != myNav &&
      event.target.parentNode.parentNode.parentNode != myNav
    ) {
      document.getElementById("myNav").style.right = "-245px";
    }
  }

  if (searchInp.classList.length > 8) {
    if (event.target.parentNode != searchInp && event.target != searchInp) {
      searchInp.classList.remove("activ");
      searchInp.classList.add("tttt");
    }
  }
});

searchClick.addEventListener("click", function() {
  searchInp.classList.add("activ");
});





let images = document.getElementsByClassName("bgimg");

for (var index = 0; index < images.length; index++) {

  GetImageColor(images[index]);

}

function GetImageColor(img) {
  var isLoadedSuccessfully = img.complete && img.naturalWidth !== 0;

  if (!isLoadedSuccessfully) {
    setTimeout(GetImageColor, 1000, img)
  } else {
    var rgb = getAverageRGB(img);
    let colorCode = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    let colorVal = "";
    if (colorCode > 186) {
      colorVal = "#000";
    } else {
      colorVal = "#fff";
    }


    let firstChildOfOurCard = img.parentElement.parentElement.firstChild.nextSibling;
    let ourParent = img.parentElement.parentElement;
    let price = ourParent.querySelector(".price");
    let categories = ourParent
      .querySelector(".ourlist")
      .getElementsByTagName("a");


    firstChildOfOurCard.style.color = colorVal;
    price.style.color = colorVal;
    for (var ind = 0; ind < categories.length; ind++) {
      categories[ind].style.color = colorVal;
    }
    let span = ourParent.querySelector(".ourlist").getElementsByTagName("span");
    for (var ind = 0; ind < span.length; ind++) {
      span[0].style.color = colorVal;
    }
  }


}

function getAverageRGB(imgEl) {
  var blockSize = 5,
    defaultRGB = {
      r: 0,
      g: 0,
      b: 0
    },
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = {
      r: 0,
      g: 0,
      b: 0
    },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}

const select = document.querySelectorAll(".selectBtn");
const option = document.querySelectorAll(".option");
let inde = 1;

select.forEach((a) => {
  a.addEventListener("click", (b) => {
    a.classList.toggle("active-parent");
    a.parentNode.querySelector(".myarrow").classList.toggle("active-arrow");
    const next = b.target.nextElementSibling;
    next.classList.toggle("toggle");
    next.style.zIndex = inde++;
  });
});
option.forEach((a) => {
  a.addEventListener("click", (b) => {
    b.target.parentNode.parentNode
      .querySelector(".selectBtn")
      .classList.remove("active-parent");
    b.target.parentNode.parentNode
      .querySelector(".myarrow")
      .classList.remove("active-arrow");
    b.target.parentElement.classList.remove("toggle");

    const parent = b.target.closest(".select").children[1];
    parent.setAttribute("data-type", b.target.getAttribute("data-type"));
    parent.innerText = b.target.innerText;

    let ourPrice =
      b.target.parentNode.parentNode.parentNode.querySelector(".ourprice");
    let ourMonth = ourPrice.getAttribute("month");
    let ourQuantity = parent.getAttribute("data-type");
    let ourPriceNumber = Number(ourPrice.innerText);

    if (ourMonth == 1) {
      ourPrice.innerText = 5000 * ourQuantity;
    } else if (ourMonth == 3) {
      ourPrice.innerText = 12500 * ourQuantity;
    } else if (ourMonth == 6) {
      ourPrice.innerText = 25000 * ourQuantity;
    }
  });
});

let downloadTimer = document.getElementsByClassName("download-timer");
let downloadText = document.getElementsByClassName("download-text");
if (downloadTimer.length > 0) {
  let downloadTimerNumber = Number(downloadTimer[0].innerText);

  let myTimer = setInterval(() => {
    downloadTimer[0].innerHTML = downloadTimerNumber;
    downloadTimerNumber--;
    if (downloadTimerNumber < 0) {
      clearInterval(myTimer);
      downloadText[0].innerHTML = "دانلود شما شروع شد :)";
    }
  }, 1000);
}

window.onload = function() {
  document.querySelectorAll("div.boobs div").forEach((tab, index) => {
    tab.addEventListener("click", function(el) {
      el.preventDefault();
      var tab_id = this.getAttribute("data-tab");
      this.setAttribute("data-tab", tab_id);

      // for (var item of document.querySelectorAll("div.boobs div")) {
      //   item.classList.remove("bg-red");
      // }

      for (var item2 of document.querySelectorAll(".tab-content")) {
        item2.classList.remove("!d-block");
      }

      // this.classList.add("bg-red");
      document.getElementById(tab_id).classList.add("!d-block");
    });
  });
};

// codes for handling modal login and signup form by amoo yazdan
let mobNext = document.getElementById("mobNext");
let formErr = document.getElementById("formErr");
let telNum = document.getElementById("telNum");
let telBg = document.getElementById("telBg");
let telForm1 = document.getElementById("telForm1");
let telForm2 = document.getElementById("telForm2");
let telForm3 = document.getElementById("telForm3");
let telForm4 = document.getElementById("telForm4");
let loginForm = document.getElementById("loginForm");
let closeForm = document.getElementById("closeForm");
let openForm = document.getElementById("openForm");
let openForm2 = document.getElementById("openForm2");
let openLoginForm = document.getElementById("openLoginForm");
let openLoginForm2 = document.getElementById("openLoginForm2");
let formMsg = document.getElementById("formMsg");
let codeTimer = document.getElementById("codeTimer");
let againCode = document.getElementById("againCode");
let mainCode = document.getElementById("mainCode");
let prevForm = document.getElementById("prevForm");
let forgetPass = document.getElementById("forgetPass");
let miniSearch = document.getElementById("miniSearch");
let miniSearchClose = document.getElementById("miniSearchClose");
let mobBuyBtn = document.getElementsByClassName("mobBuyBtn");

miniSearch.addEventListener("click", miniSearchHandler);

function miniSearchHandler() {
  document.getElementsByClassName("mini-footer")[0].classList.add("mini-gone");
  document.getElementsByClassName("mini-footer")[0].classList.remove("!bottom-0");
  setTimeout(() => {
    document.getElementsByClassName("mini-search")[0].classList.add("mini-s-in")
  }, 600)
}

miniSearchClose.addEventListener("click", miniSearchCloseHandler);

function miniSearchCloseHandler() {
  document.getElementsByClassName("mini-search")[0].classList.remove("mini-s-in");
  document.getElementsByClassName("mini-search")[0].classList.add("mini-s-gone");
  setTimeout(() => {
    document.getElementsByClassName("mini-footer")[0].classList.add("!bottom-0")
  }, 600)
}

closeForm.addEventListener("click", () => {
  loginForm.classList.add("logform-out");
  loginForm.classList.remove("logform-in");

  setTimeout(() => {
    document.getElementsByClassName("mini-footer")[0].classList.add("smoothing");
    document.getElementsByClassName("mini-footer")[0].classList.remove("mini-gone");
    if (mobBuyBtn.length > 0) {
      mobBuyBtn[0].classList.add("smoothing");
      mobBuyBtn[0].classList.remove("mob-gone");
    }
  }, 600)
});

openForm.addEventListener("click", () => {
  loginForm.classList.remove("logform-out");
  loginForm.classList.add("logform-in");
});

openForm2.addEventListener("click", () => {
  loginForm.classList.remove("logform-out");
  loginForm.classList.add("logform-in");
});

if (openLoginForm2) {
  openLoginForm2.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementsByClassName("mini-footer")[0].classList.add("mini-gone");
    document.getElementsByClassName("mini-footer")[0].classList.remove("!bottom-0");

    mobBuyBtn[0].classList.add("mob-gone");

    setTimeout(() => {
      loginForm.classList.remove("logform-out");
      loginForm.classList.add("logform-in");
    }, 600)
  });
}

if (openLoginForm) {
  openLoginForm.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementsByClassName("mini-footer")[0].classList.add("mini-gone");
    document.getElementsByClassName("mini-footer")[0].classList.remove("!bottom-0");

    setTimeout(() => {
      loginForm.classList.remove("logform-out");
      loginForm.classList.add("logform-in");
    }, 600)
  });
}

mobNext.addEventListener("click", function() {
  if (telNum.value.length <= 0) {
    formErr.innerHTML = "پر کردن این فیلد الزامی است";
    telBg.classList.add("!border-c-#FF0000");
  } else if (telNum.value.length <= 10 && telNum.value.length != 0) {
    formErr.innerHTML = "شماره وارد شده صحیح نیست";
    telBg.classList.add("!border-c-#FF0000");
  } else {
    telForm1.classList.add("d-none");
    telForm2.classList.add("d-block");
    telForm2.classList.remove("d-none");

    formMsg.innerHTML = `کد 5رقمی به شماره ${telNum.value} ارسال شد`;

    let codeTimerNumber = Number(codeTimer.innerText);

    var ttt = null;

    function timerofCode() {
      ttt = setInterval(() => {
        codeTimerNumber--;

        if (codeTimerNumber == 0) {
          mainCode.classList.add("d-none");
          againCode.classList.remove("d-none");
          againCode.classList.add("d-block");
          clearInterval(ttt);
        }

        codeTimer.innerHTML = codeTimerNumber;
      }, 1000);
      return ttt;
    }

    if (codeTimerNumber > 0) {
      timerofCode();
    }

    againCode.addEventListener("click", () => {
      againCode.classList.remove("d-block");
      againCode.classList.add("d-none");
      mainCode.classList.remove("d-none");
      codeTimerNumber = 60;
      codeTimer.innerHTML = codeTimerNumber;
      timerofCode();
    });

    prevForm.addEventListener("click", () => {
      telForm1.classList.remove("d-none");
      telForm2.classList.add("d-none");
      codeTimerNumber = 60;
      codeTimer.innerHTML = codeTimerNumber;
      clearInterval(ttt);
      formMsg.innerHTML = "شماره خود را ویرایش کنید و مجددا تلاش کنید";
      formErr.innerHTML = '';
      telBg.classList.remove("!border-c-#FF0000");
      againCode.classList.remove("d-block");
      againCode.classList.add("d-none");
      mainCode.classList.remove("d-none");
    });

    // success
  }
});

let loginWithPass = document.getElementById("loginWithPass");
let loginWithMob = document.getElementById("loginWithMob");
let formTitle = document.getElementById("formTitle");

loginWithPass.addEventListener("click", function() {
  formTitle.innerHTML = "ورود با کلمه عبور";
  formMsg.innerHTML = "ایمیل به همراه کلمه عبور خود را وارد کنید";
  loginWithPass.classList.add("d-none");
  loginWithMob.classList.remove("d-none");

  // age form aval faal bood
  if (telForm2.classList.contains("d-none")) {
    telForm1.classList.add("d-none");
    telForm3.classList.add("d-block");
    telForm3.classList.remove("d-none");
  }
  // age form dovom faal bood
  if (telForm1.classList.contains("d-none")) {
    telForm2.classList.add("d-none");
    telForm2.classList.remove("d-block");
    telForm3.classList.add("d-block");
    telForm3.classList.remove("d-none");
  }
});

let mailNext = document.getElementById("mailNext");
let myMail = document.getElementById("myMail");
let myPass = document.getElementById("myPass");
let mailErr = document.getElementById("mailErr");
let passErr = document.getElementById("passErr");

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

mailNext.addEventListener("click", () => {
  if (myMail.value.length <= 0) {
    mailErr.innerHTML = "پر کردن این فیلد الزامی است";
  } else if (!validateEmail(myMail.value)) {
    mailErr.innerHTML = "ایمیل وارد شده صحیح نمی باشد";
  } else {
    mailErr.innerHTML = "";

    // success
  }

  if (myPass.value.length <= 0) {
    passErr.innerHTML = "پر کردن این فیلد الزامی است";
  } else {
    passErr.innerHTML = "";

    // success
  }
});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function() {
  // toggle the type attribute
  const type = myPass.getAttribute("type") === "password" ? "text" : "password";
  myPass.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("ri-eye-off-fill");
  this.classList.toggle("ri-eye-fill");
});

forgetPass.addEventListener("click", () => {
  telForm3.classList.add("d-none");
  telForm3.classList.remove("d-block");
  telForm4.classList.remove("d-none");
});

let forgNext = document.getElementById("forgNext");
let forgErr = document.getElementById("forgErr");
let myForgMail = document.getElementById("myForgMail");

forgNext.addEventListener("click", () => {
  if (myForgMail.value.length <= 0) {
    forgErr.innerHTML = "پر کردن این فیلد الزامی است";
  } else if (!validateEmail(myForgMail.value)) {
    forgErr.innerHTML = "ایمیل وارد شده صحیح نمی باشد";
  } else {
    forgErr.innerHTML = "";

    // success
  }
});

loginWithMob.addEventListener("click", () => {
  loginWithMob.classList.add("d-none");
  loginWithPass.classList.remove("d-none");

  if (!telForm3.classList.contains("d-none")) {
    telForm3.classList.add("d-none");
  }

  if (!telForm4.classList.contains("d-none")) {
    telForm4.classList.add("d-none");
  }

  telForm1.classList.add("d-block");
  telForm1.classList.remove("d-none");

  formTitle.innerHTML = "ورود یا ثبت نام";
  formMsg.innerHTML = "برای ادامه، شماره موبایل خود را وارد کنید";
});

let codeNum = document.getElementById("codeNum");
let formErr2 = document.getElementById("formErr2");
let mobNext2 = document.getElementById("mobNext2");
let codeNumLength = codeNum.value.length;

mobNext2.addEventListener("click", () => {
  if (codeNum.value.length <= 0) {
    formErr2.innerHTML = "پر کردن این فیلد الزامی است";
  } else if (codeNum.value.length > 0 && codeNum.value.length < 5) {
    formErr2.innerHTML = "کد وارد شده از 5 رقم کمتر است";
  } else {
    formErr2.innerHTML = "";
    // success
  }
});

const links = document.querySelectorAll(".dachik a");

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

let directBuy = document.getElementById("directBuy");
if (directBuy) {
  directBuy.addEventListener("click", (e) => {
    e.preventDefault();
    const href = directBuy.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  })

}



let payment = document.getElementsByClassName("payment");

for (const pay of payment) {
  pay.addEventListener("click", payHandler);
}

function payHandler(e) {
  for (const pay of payment) {
    pay.querySelector(".checkmark").classList.remove("opacity-(1)")
  }
  this.querySelector(".checkmark").classList.add("opacity-(1)")
}

// for swiper slider bug in auto width

let SW = document.getElementsByClassName("swiper-wrapper");

if (SW.length) {
  SW[0].style.display = "block";
  setTimeout(() => {
    document.getElementsByClassName("swiper-wrapper")[0].style.display = "flex"
  }, 0.1);
}



const viewBtn = document.querySelector(".view-modal");
if (viewBtn) {
  const popup = document.querySelector(".s-popup");
  const close = popup.querySelector(".close");

  viewBtn.onclick = (e) => {
    e.preventDefault();
    popup.classList.toggle("show");
  }
  close.onclick = () => {
    viewBtn.click();
    popup.classList.add('closing-pop')
  }
}


let loader = document.getElementById("loader");
let loaderImg = document.getElementById("loaderImg");
if (loader) {
  const showImgLoader = setTimeout(() => {
    loaderImg.classList.add("set-transition")
  }, 300)
  const hideImgLoader = setTimeout(() => {
    loaderImg.classList.add("logo-out")
  }, 1900)
  const hideLoader = setTimeout(() => {
    loader.classList.add("myclass")
  }, 2300)
  const removeLoader = setTimeout(() => {
    loader.classList.add("!d-none")
  }, 3000)
}

let checkout = document.getElementById("checkout");

if (checkout) {
  let chName = document.getElementById("chName");
  let chFamily = document.getElementById("chFamily");
  let chTel = document.getElementById("chTel");
  let chMail = document.getElementById("chMail");


  checkout.addEventListener("click", checkoutHandler);

  function checkoutHandler(e) {
    e.preventDefault();
    let isErros = false;
    if (chName.value.length < 1) {
      chName.parentElement.querySelector(".errors").innerHTML = "پر کردن این فیلد الزامی است";
      chName.classList.add("red-input");
      isErros = true;
    } else {
      chName.parentElement.querySelector(".errors").innerHTML = "";
      chName.classList.remove("red-input");
    }

    if (chFamily.value.length < 1) {
      chFamily.parentElement.querySelector(".errors").innerHTML = "پر کردن این فیلد الزامی است";
      chFamily.classList.add("red-input");
      isErros = true;
    } else {
      chFamily.parentElement.querySelector(".errors").innerHTML = "";
      chFamily.classList.remove("red-input");
    }

    if (chTel.value.length <= 0) {
      chTel.parentElement.querySelector(".errors").innerHTML = "پر کردن این فیلد الزامی است";
      chTel.classList.add("red-input");
      isErros = true;

    } else if (chTel.value.length <= 10 && chTel.value.length != 0) {
      chTel.parentElement.querySelector(".errors").innerHTML = "شماره وارد شده صحیح نیست";
      chTel.classList.add("red-input");
      isErros = true;

    } else {
      chTel.parentElement.querySelector(".errors").innerHTML = "";
      chTel.classList.remove("red-input");
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (chMail.value.length <= 0) {
      chMail.parentElement.querySelector(".errors").innerHTML = "پر کردن این فیلد الزامی است";
      chMail.classList.add("red-input");
      isErros = true;
    } else if (!validateEmail(chMail.value)) {
      chMail.parentElement.querySelector(".errors").innerHTML = "ایمیل وارد شده صحیح نمی باشد";
      chMail.classList.add("red-input");
      isErros = true;
    } else {
      chMail.parentElement.querySelector(".errors").innerHTML = "";
      chMail.classList.remove("red-input");
    }

    if (!isErros) {
      alert("success :)");
    }
  }

}
