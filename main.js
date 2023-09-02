/* Step one */
// check for empty field
const fields = document.querySelectorAll(".field");
const next1 = document.querySelector(".step-content-1 .submit");
next1.addEventListener("click", function (e) {
  let test = false;
  fields.forEach((field) => {
    if (field.value == "") {
      field.style.borderColor = "hsl(354, 84%, 57%)";
      field.previousElementSibling.style.opacity = "1";
      setTimeout(function () {
        field.style.borderColor = "hsl(229, 24%, 87%)";
        field.previousElementSibling.style.opacity = "0";
      }, 4000);
      test = false;
      return;
    } else {
      field.style.borderColor = "hsl(229, 24%, 87%)";
      field.previousElementSibling.style.opacity = "0";
      test = true;
    }
  });
  if (test) {
    getInfo();
    this.parentElement.parentElement.parentElement.classList.add("hide");
    this.parentElement.parentElement.parentElement.nextElementSibling.classList.remove(
      "hide"
    );
  }
});
// prevent forms from being validated
const allForms = document.querySelectorAll("form");
allForms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});
// get personal info
let info = {};
function getInfo() {
  let username = document.querySelector("input[name=name]");
  let email = document.querySelector("input[type=email]");
  let phone = document.querySelector("input[name=phone]");
  info.username = username.value;
  info.email = email.value;
  info.phone = phone.value;
}


/* Step two */
const next2 = document.querySelector(".step-content-2 .next");
let price = 0;
const boxes = document.querySelectorAll(".step-content-2 .box");
boxes.forEach((box) => {
  box.addEventListener("click", function (e) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].classList.remove("chosen");
    }
    e.stopPropagation();
    price = parseFloat(this.children[1].children[1].children[0].textContent);
    this.classList.add("chosen");
  });
});
let plans = [];
const containerPlans = document.querySelectorAll(".box .figure");
containerPlans.forEach((c) => {
  plans.push(parseFloat(c.textContent));
});
const monthly = document.querySelector(".switcher .bull.monthly ");
const yearly = document.querySelector(".switcher .bull.yearly ");
monthly.addEventListener("click", function () {
  if (this.classList.contains("clicked")) {
    return;
  }
  this.classList.add("clicked");
  this.style.opacity = "1";
  yearly.classList.remove("clicked");
  yearly.style.opacity = "0";
  plans = plans.map((p) => p / 10);
  for (let i = 0; i < containerPlans.length; i++) {
    containerPlans[i].textContent = plans[i];
  }
});
yearly.addEventListener("click", function () {
  if (this.classList.contains("clicked")) {
    return;
  }
  this.classList.add("clicked");
  this.style.opacity = "1";
  monthly.classList.remove("clicked");
  monthly.style.opacity = "0";
  plans = plans.map((p) => p * 10);
  for (let i = 0; i < containerPlans.length; i++) {
    containerPlans[i].textContent = plans[i];
  }
});

next2.addEventListener("click", function (e) {
  if (price == 0) {
    alert("Please chose a plan");
    return;
  }
  this.parentElement.parentElement.parentElement.classList.add("hide");
  this.parentElement.parentElement.parentElement.nextElementSibling.classList.remove(
    "hide"
  );
});


/* Step three */
let picked = [];
let addPick = 0;
const checkBoxes = document.querySelectorAll(
  ".step-content-3 input[type=checkbox]"
);
const totalPrice = document.querySelector(".step-content-4 .total-number span");
checkBoxes.forEach((cb) => {
  cb.addEventListener("change", function () {
    if (cb.checked) {
      let item =
        cb.nextElementSibling.children[1].children[0].children[0].textContent;
      picked.push(parseFloat(item));
    }
  });
});

const next3 = document.querySelector(".step-content-3 .next");
next3.addEventListener("click", function () {
  addPick = 0;
  if (picked.length == 0) {
    alert("Please chose an add-pick");
    return;
  }
  picked.forEach((a) => (addPick += a));
  this.parentElement.parentElement.parentElement.classList.add("hide");
  this.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("hide");
  totalPrice.textContent = price + addPick;
  stepFour();
});


/* Step four */
const next4 = document.querySelector(".step-content-4 .confirm");
function stepFour() {
  const pickedItem1 = document.querySelector(".picked-item-1");
  const pickedItem2 = document.querySelector(".picked-item-2");
  if (monthly.classList.contains("clicked")) {
    pickedItem1.children[0].children[0].children[0].textContent = "(monthly)";
    pickedItem1.children[1].children[0].children[1].textContent = "mo";
    pickedItem2.children[1].children[0].children[1].textContent = "mo";
  } else if (yearly.classList.contains("clicked")) {
    pickedItem1.children[0].children[0].children[0].textContent = "(yearly)";
    pickedItem1.children[1].children[0].children[1].textContent = "yr";
    pickedItem2.children[1].children[0].children[1].textContent = "yr";
  }
  pickedItem1.children[1].children[0].children[0].textContent = price;
  pickedItem2.children[1].children[0].children[0].textContent = addPick;
}
next4.addEventListener("click", function() {
    if (price == 0 || addPick == 0) {
        alert("Please go back and select items");
        return;
    }
    this.parentElement.parentElement.parentElement.classList.add("hide");
    this.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("hide");
    setTimeout(function() {
        window.location.reload();
    }, 5000);
});


/* Handle go back buttons */
const goBacks = document.querySelectorAll("button.back");
goBacks.forEach(goBack => {
    goBack.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.add("hide");
        this.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("hide");
    });
});

const steps = document.querySelectorAll(".steps .step");
const contentSteps = document.querySelectorAll(".step-content");
steps.forEach(step => {
    step.addEventListener("click", function(e) {
        e.stopPropagation();
        for (let i = 0; i < steps.length; i++) {
            steps[i].children[0].classList.remove("parent-clicked");
        }
        contentSteps.forEach(ct => {
            if (this.id == ct.dataset.id) {
                ct.classList.remove("hide");
            } else {
                ct.classList.add("hide");
            }
        });
        this.children[0].classList.add("parent-clicked");
    });
});
