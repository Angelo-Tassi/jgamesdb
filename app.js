"use strict";
const sectionCenter = document.querySelector(".section-center");
const ButtonContainer = document.querySelector(".btn-container");
const FilterButtons = document.querySelectorAll(".filter-btn");

let currentPage = 2;
window.addEventListener("DOMContentLoaded", function () {
  displayGames();
  selectPage(currentPage);
});
function selectPage() {
  FilterButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (e.currentTarget.id === "next") {
        currentPage++;
      }
      if (e.currentTarget.id === "previous") {
        if (currentPage < 1) {
          currentPage = 0;
        }
      } else {
        currentPage--;
      }
      console.log(currentPage);
    });
  });
}
// // function filterButtons()

// // Function to go to the next page
// function nextPage() {
//   var currentPage = currentPage++;
//   displayGames();
// }

// // Function to go to the previous page
// function previousPage() {
//   if (currentPage > 1) {
//     currentPage--;
//     displayGames();
//   }
// }
// const nextButton = document.getElementById("next");
// const previousButton = document.getElementById("previous");
// nextButton.addEventListener("click", nextPage);
// previousButton.addEventListener("click", previousPage);

// Attach event listeners to next and previous buttons

// request games

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
//   const requestPlatform = fetch(
//     'https://api.rawg.io/api/platforms?key=73601ec88eab474386a6952aa8b34734'
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (platform) {
//       // console.log(platform);
//       const platforms = platform.results;
//       let platformName = platforms.map(function (getname) {
//         return getname.name;
//       });
//       // Create the select element
//       const selectElement = document.createElement('select');

//       // Create and append the default "Select Platform" option
//       const defaultOption = document.createElement('option');
//       defaultOption.text = 'Select Platform';
//       selectElement.appendChild(defaultOption);

//       // Loop through platform names and create options
//       platformName.forEach(function (name) {
//         const option = document.createElement('option');
//         option.text = name;
//         selectElement.appendChild(option);
//       });

//       // Append the select element to a container in the HTML document
//       const container = document.getElementById('dropdown-container');
//       container.appendChild(selectElement);
//     })
//     .catch(function (error) {
//       // Handle any errors that occur during the fetch request
//       console.log(error);
//     });
// }

// }

// GetPlatformName();
