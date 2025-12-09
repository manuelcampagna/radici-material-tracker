const formLampada = document.getElementById('form-lampada');
const materiali = JSON.parse(localStorage.getItem("materiali")) || [];

// Aggiorna lista
function aggiornaLista() {
    const lista = document.getElementById("listaMateriali");
    lista.innerHTML = "";

    materiali.forEach((item, i) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.video ? "Sì" : "No"}</span>
            <span>${item.fase}</span>
            <button class="remove-btn" data-index="${i}">X</button>
        `;

        lista.appendChild(li);
    });

    // Rimuovi elemento
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.onclick = () => {
            materiali.splice(btn.dataset.index, 1);
            salva();
        };
    });
}

function salva() {
    localStorage.setItem("materiali", JSON.stringify(materiali));
    aggiornaLista();
}

// Invio form
formLampada.addEventListener("submit", e => {
    e.preventDefault();

    const nuovo = {
        name: document.getElementById("lampName").value,
        video: document.getElementById("videoFatti").checked,
        fase: document.getElementById("faseLav").value
    };

    materiali.push(nuovo);
    salva();
    formLampada.reset();
});

// Caricamento iniziale
aggiornaLista();
