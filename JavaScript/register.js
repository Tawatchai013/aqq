const registerForm = document.getElementById("registerForm");
const birthDateInput = document.getElementById("birthDate");
const ageInput = document.getElementById("age");
const message = document.getElementById("registerMessage");
birthDateInput.max = new Date().toISOString().split("T")[0];

function calculateAge(birthDateValue) {
    if (!birthDateValue) return "";

    const birthDate = new Date(birthDateValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 0 ? age : "";
}

birthDateInput.addEventListener("change", function () {
    ageInput.value = calculateAge(this.value);
});

registerForm.addEventListener("reset", function () {
    message.style.color = "#b91c1c";
    message.textContent = "";
});

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!registerForm.checkValidity()) {
        message.textContent = "กรุณากรอกข้อมูลให้ครบ";
        registerForm.reportValidity();
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "รหัสผ่านทั้งสองช่องไม่ตรงกัน";
        return;
    }

    const account = {
        fullname: document.getElementById("fullname").value.trim(),
        username: document.getElementById("username").value.trim(),
        birthDate: birthDateInput.value,
        age: ageInput.value,
        studentId: document.getElementById("studentId").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: password
    };

    localStorage.setItem("registeredAccount", JSON.stringify(account));
    message.style.color = "#15803d";
    message.textContent = "ลงทะเบียนสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...";

    setTimeout(function () {
        window.location.href = "Login.html";
    }, 700);
});