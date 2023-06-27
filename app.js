"use strict";
const sectionCenter = document.querySelector(".section-center");
const ButtonContainer = document.querySelector(".btn-container");
// request platform
const requestPlatform = fetch(
  "https://api.rawg.io/api/platforms?key=73601ec88eab474386a6952aa8b34734"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (platform) {
    // console.log(platform);
    // request games
    const request = fetch(
      "https://api.rawg.io/api/games?platforms=166&key=73601ec88eab474386a6952aa8b34734"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const gameArticles = data.results;
        let displayGames = gameArticles.map(function (games) {
          console.log(games);
          let genre = games.genres.map(function (element) {
            return element.name;
          });

          return `<article class="menu-item">
          <img class="photo" src="${games.background_image}" />         
    <div class="item-info">
    <header class='meta'>
    <h4>${games.name}</h4>
    </header>
    <h4 class="price">Released ${games.released}</h4>
         <div class="underline"></div>
         <br>
          <div class='meta'><h3>Metacritic:<span class=rating>${
            games.metacritic
          }</span></h3>
          <div class="underline"></div>
           <div class='genre'></div>
           <div class='bold'>Genre</div>
             <h5>${[genre]}</h5>
              </div>
            </div>
    </div>
    </article>`;
        });

        displayGames = displayGames.join("");
        sectionCenter.insertAdjacentHTML("beforeend", displayGames);
      });
  });
