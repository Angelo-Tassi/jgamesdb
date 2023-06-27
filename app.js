// const platforms = fetch(
//   'https://api.rawg.io/api/platforms?key=73601ec88eab474386a6952aa8b34734'
// )
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
const sectionCenter = document.querySelector('.section-center');

const request = fetch(
  'https://api.rawg.io/api/games?key=73601ec88eab474386a6952aa8b34734&dates=2019-09-01,2019-09-30&platforms=18,1,'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const gameArticles = data.results;
    let displayGames = gameArticles.map(function (games) {
      // console.log(games)
      // const screenShots = games.short_screenshots;
      // screenShots.map(function (images) {
      // console.log(images);
      // });
      return `<article class="menu-item">
          <img class="photo" src="${games.background_image}" />         
    <div class="item-info">
    <header>
    <h3>${games.name}</h3>
    </header>
    <h4 class="price">Released ${games.released}</h4>
         <div class="underline"></div>
          <img src="${games.image}" 
            </img>
    </div>
    </article>`;
    });
    sectionCenter.insertAdjacentHTML('beforeend', displayGames);
  });
// });
