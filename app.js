"use strict";
const sectionCenter = document.querySelector(".section-center");
const ButtonContainer = document.querySelector(".btn-container");
const FilterButtons = document.querySelectorAll(".filter-btn");
const browsingPage = document.querySelectorAll(".browsing");
const dropdown = document.getElementById("dropdown-container");
const platformDisplayName = document.querySelector(".platformName");
let currentPage = 1;
let currentPlatform = 166;

window.addEventListener("DOMContentLoaded", function () {
  displayGames(currentPage);
  selectPage();
  displayPlaforms();
});

function selectPage() {
  FilterButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      console.log(btn);
      if (e.currentTarget.id === "next") {
        if (currentPage >= 104) {
          currentPage = 1;
        } else {
          currentPage++;
        }
      }
      if (e.currentTarget.id === "previous") {
        if (currentPage <= 1) {
          currentPage = 104;
        } else {
          currentPage--;
        }
      }
      browsingPage.forEach(function (element) {
        element.textContent = `Currently Browsing Page ${currentPage}`;
      });

      console.log(browsingPage);

      console.log(currentPage);
      displayGames();
    });
  });
}

function displayGames() {
  // clears section center to accomodate new page when the fetch is updated
  sectionCenter.innerHTML = "";
  const request = fetch(
    `https://api.rawg.io/api/games?platforms=${currentPlatform}&key=73601ec88eab474386a6952aa8b34734&page=${currentPage}`
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

function displayPlaforms() {
  const request = fetch(
    `https://api.rawg.io/api/platforms?key=73601ec88eab474386a6952aa8b34734`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const platforms = data.results;
      let dropdownOptions = platforms.map(function (item) {
        return `<option value="${item.id}">${item.name}</option>`;
      });
      dropdownOptions.unshift(
        '<option value="" selected disabled> Select Platform </option>'
      );
      // Add an event listener to the dropdown to update the current platform
      dropdown.addEventListener("change", function (e) {
        currentPlatform = e.target.value;
        console.log(e.target);

        displayGames();
      });
      // platformDisplayName.textContent = `${item.name}`;
      dropdown.innerHTML = dropdownOptions.join("");
    });
}
