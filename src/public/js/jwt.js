const form = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const buton = document.getElementById("buton");

form.onsubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/loginJWTFront", {
        method: "POST",
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then((response) => {
            console.log("👹clg at jwt.js - response=> ", response);
            localStorage.setItem("token", response);
        })
};

buton.onclick = () => {
    fetch("http://localhost:8080/users/private", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => response.json())
        .then((response) => {
            console.log("👹clg at jwt.js - response buton=> ", response);
            
        })
};
