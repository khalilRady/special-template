let spansOption = document.querySelectorAll(".option-box .box2 span");
let spans = Array.from(document.querySelectorAll(".option-box .box span"));
let optionBullets = Array.from(document.querySelectorAll(".box3 span"));
let nav = document.querySelector(".nav-bullets");
let changeBackground;
let backgroundchanging;
//get information from local storage

if (window.localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  spans.forEach((span) => {
    span.classList.remove("active");
    for (i = 0; i < spans.length; i++) {
      if (spans[i].dataset.color == window.localStorage.getItem("color")) {
        spans[i].classList.add("active");
      }
    }
  });
}
let optionOfRandomize = true;
let info = localStorage.getItem("random_background");
if (info !== null) {
  if (info === "true") {
    spansOption.forEach((span) => {
      span.classList.remove("active");
    });
    spansOption[0].classList.add("active");

    optionOfRandomize = true;
  } else if (info === "false") {
    spansOption.forEach((span) => {
      span.classList.remove("active");
    });
    spansOption[1].classList.add("active");
    optionOfRandomize = false;
  }
}

let showOption = window.localStorage.getItem("showing");
if (showOption !== null) {
  if (showOption === "show") {
    optionBullets.forEach((opt) => {
      opt.classList.remove("active");
    });

    optionBullets[0].classList.add("active");
    nav.style.display = "block";
  } else if (showOption === "hide") {
    optionBullets.forEach((opt) => {
      opt.classList.remove("active");
    });

    optionBullets[1].classList.add("active");
    nav.style.display = "none";
  }
}

let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

changeBackground = function () {
  if (optionOfRandomize === true) {
    backgroundchanging = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgs.length);
      document.querySelector(".landing").style.backgroundImage =
        "url(imgs/" + imgs[randomNumber] + ")";
    }, 10000);
  }
};
changeBackground();
// ==========================================//
// setting box
document.querySelector(".icon i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".option-box").classList.toggle("open");
  document.querySelector(".option-box .icon").classList.toggle("open");
};
// ==========================================//

// changing colors
//===================================//
spans.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove class from spans
    for (i = 0; i < spans.length; i++) {
      spans[i].classList.remove("active");
    }
    // add class from spans
    e.currentTarget.classList.add("active");
    // add color on local storage by data attribute
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    // change main color
    document.documentElement.style.setProperty(
      "--main-color",
      e.currentTarget.dataset.color
    );
  });
});
//===================================//

// stop random background //
spansOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    document.querySelectorAll(".option-box .box2 span").forEach((el) => {
      el.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    if (e.currentTarget.dataset.option == "yes") {
      optionOfRandomize = true;
      changeBackground();
      window.localStorage.setItem("random_background", true);
    } else {
      optionOfRandomize = false;
      clearInterval(backgroundchanging);
      window.localStorage.setItem("random_background", false);
    }
  });
});

// stop the interval

// add show class and hide on click on mobile version

document.querySelector("header .icon").addEventListener("click", function () {
  document.querySelector("header .container ul.links").classList.toggle("show");
});

// on scroll do somthing

let skills = document.querySelector(".skills");

window.onload = function () {
  window.onscroll = () => {
    // let skillsOffset = skills.offsetTop;
    // let skillsHight = skills.offsetHieght;
    // let windowHight = this.innerHeight;
    let windowScroll = this.pageYOffset;

    if (windowScroll > 700) {
      Array.from(
        document.querySelectorAll(".skills .skill-progress span")
      ).forEach((span) => {
        span.style.width = span.dataset.progress;
      });
    }
  };
};

// work on imgs by create popup

let images = Array.from(document.querySelectorAll(".gallary .images-box img"));

images.forEach((img) => {
  img.addEventListener("click", () => {
    //create the overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    //append the overlay on the body
    document.body.appendChild(overlay);
    //create the popup-box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);

    //create the heading of the img
    if (img.alt !== null) {
      let h3 = document.createElement("h3");
      let h3Txt = document.createTextNode(img.alt);
      h3.appendChild(h3Txt);
      popupBox.appendChild(h3);
    }

    // create the image
    let popup_img = document.createElement("img");
    popup_img.src = img.src;
    popupBox.appendChild(popup_img);

    // //create the closing span
    let closingSpan = document.createElement("span");
    let closeTxt = document.createTextNode("X");
    closingSpan.appendChild(closeTxt);
    popupBox.appendChild(closingSpan);
    closingSpan.onclick = () => {
      popupBox.remove();
      overlay.remove();
    };
  });
});

// heavy and advanced javascript

let bodyChildern = Array.from(document.body.children);

let ul = document.createElement("ul");
ul.className = "links d-flex";

for (i = 0; i < bodyChildern.length; i++) {
  if (bodyChildern[i].dataset.name !== undefined) {
    // links on the header
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("data-section", `.${bodyChildern[i].dataset.bullet}`);
    a.setAttribute("href", "#");

    let aTxt = document.createTextNode(bodyChildern[i].dataset.name);
    a.appendChild(aTxt);
    li.appendChild(a);
    ul.appendChild(li);
    // bullets on the nav-bullets

    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.setAttribute("data-section", `.${bodyChildern[i].dataset.bullet}`);
    let div = document.createElement("div");
    let divTxt = document.createTextNode(`${bodyChildern[i].dataset.name}`);
    div.appendChild(divTxt);
    bullet.appendChild(div);
    nav.appendChild(bullet);
  }
  document.querySelector(".landing .container p").after(ul);
  // nav.appendChild(bullet);
  // console.log(bodyChildern[i].dataset.name);
}

// work with bullets of the nav-bullets
let allBullets = Array.from(document.querySelectorAll(".nav-bullets .bullet"));
let allLinks = Array.from(document.querySelectorAll(".links li a"));
function scrollintosomewhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(`${e.target.dataset.section}`)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollintosomewhere(allBullets);
scrollintosomewhere(allLinks);

function handleActive(element) {
  element.addEventListener("click", (e) => {
    e.currentTarget.parentElement.querySelectorAll(".active").forEach((a) => {
      a.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
}

optionBullets.forEach((opt) => {
  handleActive(opt);
  opt.addEventListener("click", (e) => {
    if (e.currentTarget.dataset.option == "show") {
      nav.style.display = "block";
      window.localStorage.setItem("showing", e.currentTarget.dataset.option);
    } else if (e.currentTarget.dataset.option == "hide") {
      nav.style.display = "none";
      window.localStorage.setItem("showing", e.currentTarget.dataset.option);
    }
  });
});

// reset option of the website
document.querySelector(".reset-option").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// up button
let upButton = document.querySelector(".up");

window.addEventListener("scroll", () => {
  if (this.scrollY > 300) {
    upButton.classList.add("active");
  } else {
    upButton.classList.remove("active");
  }
});
// if (window.scrollY > 300) {
// } else {
// }

upButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
