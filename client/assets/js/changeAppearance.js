// CHANGE THEME

const changeThemeBtn = document.getElementById("changeTheme");

changeThemeBtn.addEventListener("click", () => {
  const currentStylesheet = document.getElementById("themeStylesheet");
  const theme = [
    "assets/css/theme-black.css",
    "assets/css/theme-blue.css",
    "assets/css/theme-green.css",
    "assets/css/theme-indigo.css",
    "assets/css/theme-light-blue.css",
    "assets/css/theme-light-green.css",
    "assets/css/theme-orange.css",
    "assets/css/theme-pink.css",
    "assets/css/theme-white-blue.css",
    "assets/css/theme-white.css",
    "assets/css/theme-yellow.css",
  ];
  const currentTheme = currentStylesheet.getAttribute("href");
  const nextTheme = (theme.indexOf(currentTheme) + 1) % theme.length;
  currentStylesheet.setAttribute("href", theme[nextTheme]);
});

// SHOW/HIDE ELEMENTS
const togglerBtns = document.querySelectorAll("[id^='TogglerBtn']");
togglerBtns.forEach((togglerBtn) => {
  togglerBtn.addEventListener("click", () => {
    const togglerTarget = togglerBtn.getAttribute("data-target");
    if (togglerTarget) {
      const togglerTargetElement = document.getElementById(togglerTarget);
      if (togglerTargetElement) {
        if (togglerTarget === "twitter" || togglerTarget === "instagram") {
          if (togglerTargetElement.style.display === "inline-flex") {
            togglerTargetElement.style.display = "none";
          } else {
            togglerTargetElement.style.display = "inline-flex";
          }
        } else {
          if (togglerTargetElement.style.display === "block") {
            togglerTargetElement.style.display = "none";
          } else {
            togglerTargetElement.style.display = "block";
          }
        }
      } else {
        console.error(`${togglerTarget} nema`);
      }
    } else {
      console.error("data target nema abo nepravilno");
    }
  });
});

//HERO SLIDER

const heroSliderBtn = document.getElementById("heroSliderBtn");
const heroSlider = document.getElementById("slider");
const secondaryHeroSlider = document.getElementById("secondaryHeroSlider");
heroSlider.style.display = "block";
secondaryHeroSlider.style.display = "none";

heroSliderBtn.addEventListener("click", () => {
  if (heroSlider.style.display === "block") {
    heroSlider.style.display = "none";
    secondaryHeroSlider.style.display = "flex";
  } else {
    heroSlider.style.display = "block";
    secondaryHeroSlider.style.display = "none";
  }
});
