function acceptCookies() {
  document.getElementById("cookieBanner").classList.add("hidden");
  localStorage.setItem("cookiesAccepted", "true");
}

function openCookieSettings() {
  document.getElementById("cookieModal").classList.remove("hidden");
}

function closeCookieSettings() {
  document.getElementById("cookieModal").classList.add("hidden");
  document.getElementById("cookieBanner").classList.add("hidden");
  localStorage.setItem("cookiesAccepted", "true");
}

window.onload = function () {
  const accepted = localStorage.getItem("cookiesAccepted");
  if (!accepted) {
    document.getElementById("cookieBanner").classList.remove("hidden");
  }
};
