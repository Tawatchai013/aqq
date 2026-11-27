const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
        loginMessage.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
        loginForm.reportValidity();
        return;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    let savedAccount = null;
    try {
        savedAccount = JSON.parse(localStorage.getItem("registeredAccount"));
    } catch (error) {
        savedAccount = null;
    }

    if (!savedAccount) {
        loginMessage.textContent = "ยังไม่มีบัญชีในระบบ กรุณาลงทะเบียนก่อน";
        return;
    }

    if (username !== savedAccount.username || password !== savedAccount.password) {
        loginMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        return;
    }

    loginMessage.style.color = "#15803d";
    loginMessage.textContent = "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ " + savedAccount.fullname;

    setTimeout(function () {
        window.location.href = "Dashoard.html";
    }, 700);
});
