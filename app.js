"use strict";
const sectionCenter = document.querySelector(".section-center");
const ButtonContainer = document.querySelector(".btn-container");
const FilterButtons = document.querySelectorAll(".filter-btn");
let currentPage = 10;

window.addEventListener("DOMContentLoaded", function () {
  displayGames();
  selectPage(currentPage);
});

function selectPage() {
  FilterButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      console.log(btn);
      if (e.currentTarget.id === "next") {
        currentPage++;
      }
      if (e.currentTarget.id === "previous") {
        if (currentPage <= 1) {
          currentPage = 0;
        } else {
          currentPage--;
        }
      }
      console.log(currentPage);
    });
  });
}

function displayGames() {
  const request = fetch(
    `https://api.rawg.io/api/games?platforms=166&key=73601ec88eab474386a6952aa8b34734&page=${currentPage}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const gameArticles = data.results;
      let displayGames = gameArticles.map(function (games) {
        if (games.metacritic === null) {
          games.metacritic = "N/A";
          // console.log(games);
        }
        let genre = games.genres.map(function (element) {
          return element.name;
        });
        let platforms = games.platforms.map(function (platform) {
          return platform.platform.name;
        });
        return `<article class="menu-item">
          <img class="photo" src="${games.background_image}" />         
    <div class="item-info">
    <header class='meta'>
    <h4>${games.name}</h4>
    </header>
    <h4 class="price">Released ${games.released}</h4>
    <h6 class='meta'>${platforms}</h6>
         <div class="underline"></div>
         <br>
          <div class='meta'><h3>Metacritic:<span class=rating>${games.metacritic}</span></h3>
          <div class="underline"></div>
           <div class='genre'></div>
           <div class='bold'>Genre</div>
             <h5>${genre}</h5>
              </div>
            </div>
    </div>
    </article>`;
      });
      displayGames = displayGames.join("");
      sectionCenter.insertAdjacentHTML("beforeend", displayGames);
    });
}
