

$(document).ready(function () {
    //validation
    $("form.needs-validation").on("submit", function (event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
        }
        else {
            let nameUser = $("input[type = 'text']").val();
            let emailUser = $("input[type = 'email']").val();
            let passwordUser = $("input[type = 'password']").val();

            let user = {
                name: nameUser,
                email: emailUser,
                password: passwordUser
            }
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const exists = users.some(u => u.email === user.email);
            const existPassword = users.some(u => u.password === user.password);
            if (exists && existPassword) {
                $("#loginAlert")
                    .removeClass("d-none alert-danger")
                    .addClass("alert alert-success")
                    .text("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.replace("../index.html");
                }, 1000);
            }
            else {
                $("#loginAlert")
                    .removeClass("d-none alert-success")
                    .addClass("alert alert-danger")
                    .text("Invalid email or password. Please try again.");
            }
        }
        $(this).addClass("was-validated");
    });
});