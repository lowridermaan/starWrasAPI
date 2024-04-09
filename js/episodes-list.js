export function render(data, info = null) {
  const parentEl = document.querySelector(".app");

  const listMarkup = `
  <h1 class="app__title">StarWars API</h1>
    <div class="app__content">
      <ul class="app__list list-reset">

      ${data.result
        .map((res) => {
          return `
        <li class="app__item item">
          <h2 class="item__heading">Episode ${res.properties.episode_id}</h2>
          <div class="item__info">
            <h3 class="info__title">${res.properties.title}</h3>
            <p class="info__descr">director : "${res.properties.director}"</p>
            <p class="info__descr">release_date : "${res.properties.release_date}"</p>
          </div>
          <a href="?filmId=${res.uid}" class="btn"></a>
        </li>
        `;
        })
        .join("")}

      </ul>
    </div>

  `;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", listMarkup);
}
/* <ul class="app__list list-reset">
          <li class="app__item item">
            <h2 class="item__heading">Episode 4</h2>
            <div class="item__info">
              <h3 class="info__title">A New Hope</h3>
              <p class="info__descr">director : "George Lucas"</p>
              <p class="info__descr">release_date : "1977-05-25"</p>
            </div>
            <a href="#" class="btn"></a>
          </li>
        </ul> */
