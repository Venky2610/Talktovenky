function startChat() {
  const proceed = confirm("Do you want to chat live with Venky anonymously?");
  if (!proceed) return;

  const anonName = prompt("Enter your nickname (this stays anonymous):");
  if (!anonName) {
    alert("Name is required to proceed.");
    return;
  }

  alert(`✅ Connecting as '${anonName}'...`);

  // Redirect to Bot 2 chat link
  const bot2Username = "t.me/VenkyLiveBot"; // Replace if you gave bot a username
  window.open("https://t.me/VenkyLiveBot", "_blank");
}
