mojo({
  patterns: {
    "#header": {
      md: {
        style: {
          "background-image": "url(./img/bg-dotted.svg)",
          "background-repeat-y": "no-repeat",
          "background-size": "100%",
          "background-position": "top",
        },
      }
    },
    ".button": {
      idle: "border-c-lgray border-(1px) bg-c-white rounded-(0.938rem) h-(3.75rem) px-8 text-1.375rem text-c-fbdark transition ts-200",
      hover: "bg-c-black text-c-white border-c-transparent",
    },
    ".r-button": {
      idle: "border-c-lgray border-(1px) bg-c-white rounded-(0.938rem) h-(3.75rem) w-(3.75rem) text-170 text-c-fbdark transition ts-200",
      hover: "bg-c-black text-c-white border-c-transparent",
    },
    ".fb-text": {
      idle: "text-c-fbdark transition ts-200",
      hover: "text-c-primary",

      a: {
        idle: "text-c-fbdark transition ts-200",
        hover: "text-c-primary",
      },
    },
    ".fixed-class": {
      style: {
        "margin-top": "2rem !important",
      },
      idle: "p-fixed top-0 left-0 right-0 transition ts-1000 !border-none ",
    },
    "#myNav": {
      style: {
        transition: "1s all",
      },
    },
    ".tttt": {
      style: {
        transition: "0.5s all",
      },
    },
    ".sec-title": {
      idle: "text-2.25rem text-w-semibold",
    },
    ".see-more": {
      idle: "text-1.5rem p-relative text-c-fbdark ts-200",
      i: {
        idle: "p-absolute left-0 ts-200",
      },
    },
    ".filter-card": {
      style: {
        "background-color": "rgb(255 255 255 / 79%)",
        "-webkit-backdrop-filter": "blur(20px)",
        "backdrop-filter": "blur(20px)",
      },
    },
    "#footer": {
      md: {
        style: {
          "background-image": "url(./img/bg-dotted.svg)",
          "background-repeat": "no-repeat",
          "background-position": "center 35px",
        }
      }
    },
    ".pagination": {
      idle: "d-flex a-items-center",
      a: {
        idle: "h-3.75rem w-3.75rem d-flex a-items-center j-content-center text-1.625rem text-c-fbgray rounded-(0.938rem) ts-300 border-1 border-c-transparent",
        hover: "border-c-lgray",

        "&.active": {
          idle: "border-1 border-c-lgray bg-white text-c-fbdark",
          hover: "bg-c-black text-c-white border-c-transparent",
        },
      },
    },
    ".myinput": {
      idle: "h-5.625rem rounded-1.25rem border-1 border-c-lgray outline-none px-8 text-1.625rem d-block w-full",
    },
    ".errors": {
      idle: "p-absolute left-0 -top-7 xt-1rem text-c-#FF0000 text-a-left mb-1"
    },
    ".red-input": {
      idle: "border-c-#FF0000"
    },
    ".buy-btn": {
      idle: "d-flex a-items-center j-content-center bg-c-primary text-c-white w-21.875rem h-5.625rem text-1.625rem text-w-semibold rounded-1.25rem mx-auto mb-6 pa-4 text-a-center"
    },
    ".lollipop": {
      idle: "bg-img-img/lollipop-gray.svg bg-r-no-repeat :background-position-(left) :background-size-(contain) ts-300",
    },
    ".hat": {
      idle: "bg-img-img/hat-gray.svg bg-r-no-repeat :background-position-(left) :background-size-(contain) ts-300",
    },
    ".car": {
      idle: "bg-img-img/car-gray.svg bg-r-no-repeat :background-position-(left) :background-size-(contain) ts-300",
    },
    ".watch": {
      idle: "bg-img-img/iwatch-gray.svg bg-r-no-repeat :background-position-(left) :background-size-(contain) ts-300",
    },
    ".lollipop-mob": {
      idle: "bg-img-img/lollipopgreen.svg bg-r-no-repeat :background-position-(left) :background-size-(contain)",
    },
    ".hat-mob": {
      idle: "bg-img-img/hat-green.svg bg-r-no-repeat :background-position-(left) :background-size-(contain)",
    },
    ".car-mob": {
      idle: "bg-img-img/car-green.svg bg-r-no-repeat :background-position-(left) :background-size-(contain)",
    },
    ".watch-mob": {
      idle: "bg-img-img/iwatch.svg bg-r-no-repeat :background-position-(left) :background-size-(contain)",
    },
    ".mini-footer" : {
      idle : "bg-c-white border-top-2 border-c-lgray h-32 p-fixed bottom-0 inset-x-0 z-(1000)",
    },
    ".mini-search" : {
      idle : "bg-c-white border-top-2 border-c-lgray h-32 p-fixed bottom-0 inset-x-0 z-(1000) d-flex a-items-center j-content-center",
    },

  },
});
