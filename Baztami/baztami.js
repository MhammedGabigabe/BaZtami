const btn_ajouter = document.getElementById("btn-ajouter-transaction");
const modal_operation = document.getElementById("modal-ajouter");
const btn_quitter_modal_ajou = document.getElementById("quitter-modal-ajouter");

const grid = document.getElementById("grid-contanair");

const modal_supprimer = document.getElementById("modal-supprimer");
const btn_confirmer_suppr = document.getElementById("btn-sup-modal-sup");
const btn_quitter_mod_suppr = document.getElementById("btn-quit-modal-sup");

const descri_input = document.getElementById("descri");
const mont_input = document.getElementById("mont");
const type_input = document.getElementById("type");
const date_input = document.getElementById("dateOper");

btn_ajouter.addEventListener("click", () => {
    modal_operation.classList.remove('hidden');
});

btn_quitter_modal_ajou.addEventListener("click", () => {
    modal_operation.classList.add('hidden');
});

btn_quitter_mod_suppr.addEventListener('click', () => {
    modal_supprimer.classList.add('hidden');
})

let liste_transactions = [];
let id_operation = 0;
let card_supprimer = null;
let id_supprimer = null;

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
        id: id_operation,
        description,
        montant,
        type,
        date
    };

    liste_transactions.push(operation);
    id_operation++;

    document.getElementById('descri').value = '';
    document.getElementById('mont').value = '';
    document.getElementById('type').value = 'revenu';
    document.getElementById('dateOper').value = '';

    affiche_operation(operation);

}

function affiche_operation(transaction) {

    const card = document.createElement('div');
    card.className = `border-2 border-blue-900 rounded-3xl h-50 flex flex-col gap-2 p-4 items-center text-blue-900 ${transaction.type === 'revenu' ? 'bg-green-200' : 'bg-red-200'}`;

    const symbole = transaction.type === 'revenu' ? '+' : '-';

    card.innerHTML = `<p>Description : ${transaction.description}</p>
                        <p>Montant : ${symbole} ${transaction.montant} DH</p>
                        <p>Type : ${transaction.type}</p>
                        <p>Date : ${transaction.date}</p>
                        <div class="flex gap-14">
                            <button id="btn-modi-id-${transaction.id}"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button id="btn-supp-id-${transaction.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>`;

    grid.appendChild(card);

    const btn_affiche_modal_supp = card.querySelector(`#btn-supp-id-${transaction.id}`);
    btn_affiche_modal_supp.addEventListener('click', () => {
        modal_supprimer.classList.remove('hidden');
        card_supprimer = card;
        id_supprimer = transaction.id;
    });

    modal_operation.classList.add('hidden');
}

btn_confirmer_suppr.addEventListener('click', () => {
    if(card_supprimer && id_supprimer!== null){
        card_supprimer.remove();
        liste_transactions= liste_transactions.filter(
            (op) => op.id !== id_supprimer
        )
        card_supprimer = null;
        id_supprimer= null;
        modal_supprimer.classList.add("hidden");
    }
});


