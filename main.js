// 
const steps = Array.from(document.querySelectorAll(".step"));
const stepsContent = Array.from(document.querySelectorAll(".step-content"));
const forms = Array.from(document.forms);

// Prevent forms from being submited
forms.forEach(form => form.addEventListener("submit", function(e) {
    e.preventDefault();
}));

// complet a specific step
steps.forEach(step => {
    step.addEventListener("click", function(e) {
        stepsContent.forEach(stepContent => stepContent.classList.add("hide"));
        for(let i = 0;i < stepsContent.length; i++) {
            if(this.id == stepsContent[i].dataset.id) {
                stepsContent[i].classList.remove("hide");
            }
        }
    });
});

// next buttons
const nextBtns = Array.from(document.querySelectorAll(".next"));
// back buttons
const backBtns = Array.from(document.querySelectorAll(".back"));

// next step
nextBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.add("hide");
        this.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("hide");
    })
})

//previous step
backBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.add("hide");
        this.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("hide");
    });
});

// select switcher bulls
const switchers = Array.from(document.querySelectorAll(".bull"));
switchers.forEach(switcher => {
    switcher.addEventListener("click", function(e) {
        let figures = Array.from(document.querySelectorAll(".figure"));
        let periods = Array.from(document.querySelectorAll(".period"));
        if(e.target.classList.contains("clicked")) {
            return;
        }
        if(e.target.classList[1] === "monthly") {
            this.style.opacity = 1;
            this.nextElementSibling.style.opacity = 0;
            this.nextElementSibling.classList.remove("clicked");
            this.classList.add("clicked");
            figures.forEach(figure => {
                figure.textContent = +figure.textContent / 10;
            });
            periods.forEach(period => {
                period.textContent = "/mo";
            });
        } else if (e.target.classList[1] === "yearly") {
            this.classList.add("clicked");
            this.style.opacity = 1;
            this.previousElementSibling.style.opacity = 0;
            this.previousElementSibling.classList.remove("clicked");
            figures.forEach(figure => {
                figure.textContent = +figure.textContent * 10;
            });
            periods.forEach(period => {
                period.textContent = "/yr";
            });
        }
    });
})

// confirm
const confirmBtn = document.querySelector(".confirm");
confirmBtn.addEventListener("click", function() {
    document.querySelector(".thank-you-page").classList.remove("hide");
    this.parentElement.parentElement.parentElement.classList.add("hide");
});

// Reload
document.querySelector(".thank-you-page").addEventListener("click", function() {
    window.location.reload();
});
