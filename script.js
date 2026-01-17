var chat = JSON.parse(localStorage.getItem("chatData")) || [];

function loadChat() {
    var user = localStorage.getItem("chatUser");
    if (!user) window.location.href = "login.html";
    document.getElementById("username").innerText = user;
    displayChat();
}

function sendMessage() {
    let input = document.getElementById("msg");
    let text = input.value.trim();
    if (text == "") return;
    chat.push({
        sender: "user", text: text, time: new Date().toLocaleTimeString()
    })
    input.value = "";
    saveChat();
    setTimeout(botReply, 800);    
}

function botReply() {
    chat.push({
        sender: "bot", text: "Message Recieved", time: new Date().toLocaleTimeString()
    })
    saveChat();
}

function saveChat() {
    localStorage.setItem("chatData", JSON.stringify(chat));
    displayChat();
}

function displayChat() {
    let box = document.getElementById("chatbox");
    box.innerHTML = "";
    chat.forEach(m=> {
        let div = document.createElement("div");
        div.classList.add("message", m.sender);
        div.innerHTML = `
            ${m.text}
            <div class="time">${m.time}</div>
        `;
        box.appendChild(div);
    })
    box.scrollTop = box.scrollHeight;
}

function logout() {
    localStorage.removeItem("chatUser");
    window.location.href = "login.html";
}