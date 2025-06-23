import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, push, ref as dRef } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseCfg = {
  apiKey:"AIzaSyBiIEU8xsfxjYgGRjOvoP1RKtZKwN5i0yk",
  authDomain:"kycupdateapp.firebaseapp.com",
  projectId:"kycupdateapp",
  storageBucket:"kycupdateapp.appspot.com",
  messagingSenderId:"508854921421",
  appId:"1:508854921421:web:ebd92a2f9d69b62d54a184"
};
const app = initializeApp(firebaseCfg);
const db = getDatabase(app);

window.onload = ()=> {
  const form = document.createElement('div');
  document.body.appendChild(form);
  form.innerHTML = `
    <div id="liveChat">
      <div id="msgs"></div>
      <input id="liveInput" placeholder="Type..."/><button id="liveSend">Send</button>
    </div>`;
  document.getElementById('liveSend').onclick = async () => {
    const text = document.getElementById('liveInput').value.trim();
    if (!text) return;
    await push(dRef(db, "liveChats"), { text, ts: Date.now() });
    document.getElementById('liveInput').value="";
  };
};
