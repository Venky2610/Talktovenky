<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBiIEU8xsfxjYgGRjOvoP1RKtZKwN5i0yk",
    authDomain: "kycupdateapp.firebaseapp.com",
    projectId: "kycupdateapp",
    storageBucket: "kycupdateapp.firebasestorage.app",
    messagingSenderId: "508854921421",
    appId: "1:508854921421:web:ebd92a2f9d69b62d54a184",
    databaseURL: "https://kycupdateapp-default-rtdb.firebaseio.com"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  // Anonymous ID for each session
  const userId = 'anon-' + Math.random().toString(36).substring(2, 10);

  chatSend.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;

    push(ref(db, "chat"), {
      user: userId,
      message: msg,
      timestamp: Date.now()
    });

    chatInput.value = "";
  });

  // Listen to new messages
  onChildAdded(ref(db, "chat"), (data) => {
    const msg = data.val();
    const isUser = msg.user === userId;
    const bubble = document.createElement("div");
    bubble.className = isUser ? "my-msg" : "their-msg";
    bubble.textContent = msg.message;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
</script>
