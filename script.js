const searchBtn = document.querySelector("#search-btn"),
  mealList = document.querySelector("#meal"),
  mealDetailsContent = document.querySelector(".meal-details-content"),
  recipeClosebtn = document.querySelector("#recipe-close-btn"),
  modal = document.querySelector(".meal-details");

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeClosebtn.addEventListener("click", () => {
  closeModal();
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".meal-details")) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.add("hideRecipe");
  modal.classList.remove("showRecipe");
}

function openModal() {
  modal.classList.add("showRecipe");
  modal.classList.remove("hideRecipe");
}

function getMealList() {
  let searchInputTxt = document.querySelector("#search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="meal-img">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  console.log(meal);
  let html = `
          <h2 class="recipe-title">${meal.strMeal}</h2>
          <p class="recipe-category">${meal.strCategory}</p>
          <div class="recipe-instruct">
            <h3>Instructiobs:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
          </div>
          <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
          </div>
  `;

  mealDetailsContent.innerHTML = html;
  openModal();
}
