window.onload = () => {
  const div = document.createElement('div');
  div.innerHTML = `<div class="cookie-banner">
    This site uses cookies to improve experience. <button onclick="this.parentElement.style.display='none'">Accept</button>
  </div>`;
  document.body.append(div);
};
