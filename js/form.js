var form = document.getElementById("contact-form");
  
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("contact-form-status");
    var data = new FormData(event.target);

    status.classList.remove("success", "error");
    status.style.opacity = 0;

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showStatus("¡Gracias por tu mensaje! Te responderé pronto 🙌", "success");
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    const msg = data["errors"].map(error => error["message"]).join(", ");
                    showStatus(msg, "error");
                } else {
                    showStatus("Ups, hubo un problema al enviar el mensaje 😢", "error");
                }
            })
        }
    }).catch(error => {
        showStatus("Ups, hubo un problema al enviar el mensaje 😢", "error");
    });

    function showStatus(message, type) {
        status.textContent = message;
        status.classList.add(type);
        status.style.opacity = 1;
    }
}
form.addEventListener("submit", handleSubmit)