const studentName = document.getElementById("studentName");
const registerButton = document.getElementById("registerButton");
const registrationMessage = document.getElementById("registrationMessage");

let account = null;
const savedAccount = localStorage.getItem("registeredAccount");

if (savedAccount) {
    try {
        account = JSON.parse(savedAccount);
    } catch (error) {
        registrationMessage.textContent = "ไม่สามารถอ่านข้อมูลบัญชีได้ กรุณาลงชื่อเข้าใช้อีกครั้ง";
    }
}

if (account && typeof account.fullname === "string" && account.fullname.trim()) {
    studentName.textContent = ` ${account.fullname.trim()}`;
}

const accountIdentifier = account && (account.studentId || account.username);
const registrationKey = `courseRegistration:${accountIdentifier || "guest"}`;

if (localStorage.getItem(registrationKey) === "registered") {
    registerButton.textContent = "ลงทะเบียนแล้ว";
    registerButton.disabled = true;
    registrationMessage.textContent = "คุณลงทะเบียนบทเรียนนี้แล้ว";
}

registerButton.addEventListener("click", function () {
    localStorage.setItem(registrationKey, "registered");
    registerButton.textContent = "ลงทะเบียนแล้ว";
    registerButton.disabled = true;
    registrationMessage.textContent = "ลงทะเบียนบทเรียนเรียบร้อยแล้ว";
});
