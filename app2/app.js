import renderSplash from "./screens/splash_screen.js";
import renderStart from "./screens/start_screen.js";
import renderRegister from "./screens/register_screen.js";
import renderQuestionSelect from "./screens/questionsselect_screen.js";
import renderOutfitSelection from "./screens/outfitselection_screen.js";
import renderLoading from "./screens/loading_screen.js";
import renderThanks from "./screens/thanks_screen.js";
import renderEmailNotification from "./screens/emailnotification_screen.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
  switch (currentRoute?.path) {
    case "/":
      clearScripts();
      renderSplash(currentRoute?.data);
      break;
    case "/start":
      clearScripts();
      renderStart(currentRoute?.data);
      break;
    case "/register":
      clearScripts();
      renderRegister(currentRoute?.data);
      break;
    case "/questions":
      clearScripts();
      renderQuestionSelect(currentRoute?.data);
      break;
    case "/outfit":
      clearScripts();
      renderOutfitSelection(currentRoute?.data);
      break;
    case "/loading":
      clearScripts();
      renderLoading(currentRoute?.data);
      break;
    case "/thanks":
      clearScripts();
      renderThanks(currentRoute?.data);
      break;
    case "/email":
      clearScripts();
      renderEmailNotification(currentRoute?.data);
      break;
    default:
      const app = document.getElementById("app");
      app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  }
}

function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  let response = await fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  response = await response.json();
  return response;
}

export { navigateTo, socket, makeRequest };
