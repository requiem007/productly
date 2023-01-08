import { Article } from "./Article";

// ===================бургер========================================================================================================================================

const burgerIcon = document.querySelector(".icon-menu");
const menuBody = document.querySelector(".header__nav");

if (burgerIcon) {
    burgerIcon.addEventListener("click", function (e) {
        document.body.classList.toggle("lock");
        burgerIcon.classList.toggle("menu-open");
        menuBody.classList.toggle("menu-open");
    });
}

//плавная прокрустка по клику ==============================================================================================

const menuLinks = document.querySelectorAll(".nav__link[data-goto]"); //собрал в массив все ссылки с дата-атрибутов data-goto
if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
}
function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector("header").offsetHeight;
        if (burgerIcon.classList.contains("menu-open")) {
            document.body.classList.remove("lock");
            burgerIcon.classList.remove("menu-open");
            menuBody.classList.remove("menu-open");
        }

        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
        });
        e.preventDefault();
    }
}

//  табы ==============================================================================================

window.onload = function () {
    // Tags
    addTagsClickHandler();
};

const addTagsClickHandler = () => {
    document.querySelector(".tabs-strategies__nav").addEventListener("click", (e) => {
        if (e.target.classList.contains("tabs-strategies__button")) {
            let clickedButton = e.target;
            removeActive();
            addActive(clickedButton);
            if (clickedButton.innerText === "All") {
                showAllStrategies();
            } else {
                filterStrategyBySelectedButton(clickedButton.innerText);
            }
            // console.log(clickedButton.innerText);
        }
    });
};

const removeActive = () => {
    let buttons = document.querySelectorAll(".tabs-strategies__button");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
};

const addActive = (clickedButton) => {
    clickedButton.classList.add("active");
};

const showAllStrategies = () => {
    let strategies = document.querySelectorAll(".tabs-strategies__items .tabs-strategies__item");
    strategies.forEach((strategy) => {
        strategy.classList.remove("hide");
    });
};

const filterStrategyBySelectedButton = (selectedButton) => {
    let strategies = document.querySelectorAll(".tabs-strategies__items .tabs-strategies__item");
    strategies.forEach((strategy) => {
        strategy.classList.add("hide");
        strategy.querySelectorAll(".tabs-strategies__type").forEach((button) => {
            if (button.innerText === selectedButton) {
                strategy.classList.remove("hide");
            }
        });
    });
};
