document.getElementById("showSignUp").addEventListener("click", function () {
    document.getElementById("signupForm").style.display = "block";
});

// Function to generate and send OTP
document.getElementById("sendOTP").addEventListener("click", function () {
    let mobile = document.getElementById("mobile").value;

    if (!mobile || mobile.length !== 10) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    let otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    localStorage.setItem("otp", otp);
    alert("OTP Sent: " + otp); // Simulate sending OTP (replace with actual API)
    document.querySelector(".otp-group").style.display = "block";
});

// Function to store new user credentials
function registerUser() {
    let newUsername = document.getElementById("newUsername").value;
    let newMobile = document.getElementById("newMobile").value;
    let newPassword = document.getElementById("newPassword").value;

    if (newUsername && newMobile && newPassword) {
        localStorage.setItem("user_" + newUsername, JSON.stringify({ password: newPassword, mobile: newMobile }));
        alert("Account Created! Now you can log in.");
        document.getElementById("signupForm").style.display = "none";
    } else {
        alert("Please fill in all fields!");
    }
}

// Handle login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let otpEntered = document.getElementById("otp").value;
    let storedOTP = localStorage.getItem("otp");

    let storedUser = localStorage.getItem("user_" + username);
    if (storedUser) {
        storedUser = JSON.parse(storedUser);

        if (storedUser.password === password && otpEntered === storedOTP) {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid username, password, or OTP");
        }
    } else {
        alert("User not found, please sign up.");
    }
});
