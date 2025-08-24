

$(document).ready(function () {
    $("form.needs-validation").on("submit", function (event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
        }
        else {
            let nameUser = $("input[type = 'text']").val();
            let emailUser = $("input[type = 'email']").val();
            let passwordUser = $("input[type = 'password']").val();
            let passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!passwordPattern.test(passwordUser)) {
                $("#loginAlert")
                    .removeClass("d-none alert-success")
                    .addClass("alert alert-danger")
                    .text("Password must be at least 8 characters, include 1 uppercase and 1 number.");
                return;
            }

            let user = {
                name: nameUser,
                email: emailUser,
                password: passwordUser
            }
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const exists = users.some(u => u.email === user.email);
            if (exists) {
                $("#loginAlert")
                    .removeClass("d-none alert-danger")
                    .addClass("alert alert-danger")
                    .text("Email already exist");

            }
            else {
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", user.email);
                $("#loginAlert")
                    .removeClass("d-none alert-success")
                    .addClass("alert alert-success")
                    .text("SignUp successful! Redirecting...");
                setTimeout(() => {
                    window.location.replace("../html/login.html");
                }, 1000);
            }
        }
        $(this).addClass("was-validated");
    });
});