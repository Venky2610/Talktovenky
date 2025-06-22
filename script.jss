function toggleMenu() {
  const menu = document.getElementById('menuList');
  menu.classList.toggle('hidden');
}

function showInfo(type) {
  const content = {
    about: "This site was built to create a safe anonymous space for emotional expression.",
    terms: "Terms & Conditions coming soon.",
    privacy: "Your data is handled respectfully. This is a safe space.",
    support: "Contact: support@mentalconnect.help",
    faq: "Q: Is this really anonymous? A: Yes, 100%.",
    feedback: "We welcome your feedback. Thank you ❤️",
    rate: "Rate us later maybe 😋"
  };
  const modal = document.getElementById('popupModal');
  modal.innerHTML = `
    <div style="background:#222;padding:20px;border-radius:10px;">
      <p>${content[type]}</p>
      <button onclick="modal.classList.add('hidden')">Close</button>
    </div>`;
  modal.classList.remove('hidden');
}

function likeVenky() {
  alert("❤️ Thank you for supporting Venky!");
}

function dislikeVenky() {
  alert("🖤 It's okay... he's still here listening.");
}

function startChat() {
  alert("💬 Live chat loading... (feature coming soon)");
}

function recordAudio() {
  alert("🎤 Mic access coming in next update.");
}

function submitMessage() {
  const msg = document.getElementById('userMessage').value.trim();
  if (!msg) {
    alert("Please type a message first.");
    return;
  }

  const name = prompt("Before sending, enter your name (it’ll still be anonymous)");
  if (!name) {
    alert("Name required for now. Please enter something.");
    return;
  }

  // In real version, this is where we send message via API
  alert("✅ Message sent anonymously. Thank you.");
  document.getElementById('userMessage').value = "";
}

function exitToInstagram() {
  alert("📸 Redirecting to Instagram...");
  window.location.href = "https://instagram.com/_venky__21";
}
