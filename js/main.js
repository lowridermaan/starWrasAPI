const cssPromises = {};

function loadResourses(src) {
  // JS
  if (src.endsWith(".js")) {
    return import(src);
  }
  // CSS
  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      document
        .querySelector("head")
        .insertAdjacentHTML(
          "beforeend",
          `<link rel="stylesheet" href=${src}></link>`
        );
      const link = document.querySelector("link");

      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", resolve);
      });
    }
    return cssPromises[src];
  }
  // API data
  return fetch(src).then((res) => {
    return res.json();
  });
}

const searchParams = new URLSearchParams(location.search);
const filmId = searchParams.get("filmId");
let back = searchParams.get("back");

function getFilmInfo(apiUrl) {
  const characters = apiUrl.map((url) =>
    fetch(url).then((response) => response.json())
  );

  return Promise.all(characters).then((response) =>
    response.map((res) => res.result.properties.name)
  );
}

const info = {};

async function renderPage(moduleName, apiUrl, css) {
  const [pageModule, data] = await Promise.all(
    [moduleName, apiUrl, css].map((src) => loadResourses(src))
  );
  if (filmId && !back) {
    pageModule.isLoading();
    info.characters = await getFilmInfo(data.result.properties.characters);
    info.planets = await getFilmInfo(data.result.properties.planets);
  }

  pageModule.render(data, info);
}

if (filmId && !back) {
  renderPage(
    "./episode-details.js",
    `https://www.swapi.tech/api/films/${filmId}`,
    "./css/style.css"
  );
} else {
  back = false;
  renderPage(
    "./episodes-list.js",
    "https://www.swapi.tech/api/films",
    "./css/style.css"
  );
}
