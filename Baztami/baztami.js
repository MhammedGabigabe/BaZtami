const btn_ajouter = document.getElementById("id-ajouter");
const modal_operation = document.getElementById("modal-ajouter");
const btn_quitter = document.getElementById("quitter-ajouter");
const grid = document.getElementById("grid-contanair");

const descri_input = document.getElementById("descri");
const mont_input = document.getElementById("mont");
const type_input = document.getElementById("type");
const date_input = document.getElementById("dateOper");

btn_ajouter.addEventListener("click", () => {
    modal_operation.classList.remove('hidden');
});

btn_quitter.addEventListener("click", () => {
    modal_operation.classList.add('hidden');
});

let liste_transactions = [];

function enregistrer_operation() {

    const description = descri_input.value;
    const montant = mont_input.value;
    const type = type_input.value;
    const date = date_input.value;

    if (!description || !montant || !date) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

     if (montant <= 0) {
        alert("Le montant doit être supérieur à 0 !");
        return;
    }

     if (isNaN(montant)) {
        alert("Le montant doit être un nombre valide !");
        return;
    }

    
    const operation = {
        description,
        montant,
        type,
        date
    };

    liste_transactions.push(operation);

    const card = document.createElement('div');
    card.className = `border-2 border-blue-900 rounded-3xl h-50 flex flex-col gap-2 p-4 items-center text-blue-900 ${type === 'revenu' ? 'bg-green-200' : 'bg-red-200'}`;


    const symbole = type === 'revenu' ? '+' : '-';

    card.innerHTML = `<p>Description : ${description}</p>
                        <p>Montant : ${symbole} ${montant} DH</p>
                        <p>Type : ${type}</p>
                        <p>Date : ${date}</p>
                        <div class="flex gap-14">
                            <button id="btn-modifier"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button id="btn-supprimer"><i class="fa-solid fa-trash"></i></button>
                        </div>`;

    grid.appendChild(card);

    document.getElementById('descri').value = '';
    document.getElementById('mont').value = '';
    document.getElementById('type').value = 'revenu';
    document.getElementById('dateOper').value = '';

    modal_operation.classList.add('hidden');

}
