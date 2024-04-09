export async function render(data, info) {
  const { result } = data;
  const parentEl = document.querySelector(".app");
  const detailsMarkup = `
  <h1 class="app__title">Episode ${result.properties.episode_id}: ${
    result.properties.title
  }</h1>
  <div class="app__content content">
    <div class="content__left">
      <p classs="content__descr"> ${result.properties.opening_crawl}</p>
    </div>
    <div class="content__right">
      <div>
      <h2 class= "contetn__subheading"> Planets</h2>
          <ul class="content__list list-reset">
            ${info.planets
              .map((char) => {
                return `
                <li class="content__item">${char}</li>
              `;
              })
              .join("")}
          </ul>
      </div>
      <div>
        <h2 class= "contetn__subheading"> Characters</h2>
        <ul class="content__list list-reset">
        ${info.characters
          .map((char) => {
            return `
            <li class="content__item" >${char}</li>
          `;
          })
          .join("")}
        </ul>
      </div>

    </div>

  </div>
  <a href="?back=${true}" class="btn-back"> &Larr; Back to episodes </a>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", detailsMarkup);

  // const button = document.querySelector(".btn-back");
  // button.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   window.history.back();
  // });
}

export async function isLoading() {
  const parentEl = document.querySelector(".app");
  const loadMarkUp = `
  <h1 class="app__title">For results searching. Yes, hmmm...</h1>
  <div class ="app_wrapper">
    <img class="app__image" src="./images/yoda.png"/>
  </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", loadMarkUp);
}
