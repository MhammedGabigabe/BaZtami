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

const modal_modifier = document.getElementById("modal-modifier");
const btn_quitter_mod_modifier = document.getElementById("quitter-modal-modifier");

btn_quitter_mod_modifier.addEventListener('click', () => {
    modal_modifier.classList.add('hidden');
})

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
let card_modifier = null;
let id_modifier = null;

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

    update_total();
    affiche_operation(operation);
    modal_operation.classList.add('hidden');
}

function affiche_operation(transaction) {
    const card = document.createElement('div');
    card.className = `border-2 border-blue-900 rounded-3xl h-50 flex flex-col gap-2 p-4 items-center text-blue-900 ${transaction.type === 'revenu' ? 'bg-green-300' : 'bg-red-300'}`;
    card.setAttribute("data-id", transaction.id); // utile aussi

    const symbole = transaction.type === 'revenu' ? '+' : '-';

    card.innerHTML = `
        <p class="desc">Description : ${transaction.description}</p>
        <p class="mont">Montant : ${symbole} ${transaction.montant} DH</p>
        <p class="type">Type : ${transaction.type}</p>
        <p class="date">Date : ${transaction.date}</p>
        <div class="flex gap-14">
            <button id="btn-modi-id-${transaction.id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button id="btn-supp-id-${transaction.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    grid.appendChild(card);

    // Bouton Supprimer
    const btn_affiche_modal_supp = card.querySelector(`#btn-supp-id-${transaction.id}`);
    btn_affiche_modal_supp.addEventListener('click', () => {
        modal_supprimer.classList.remove('hidden');
        card_supprimer = card;
        id_supprimer = transaction.id;
    });

    // Bouton Modifier
    const btn_affiche_modifier = card.querySelector(`#btn-modi-id-${transaction.id}`);
    btn_affiche_modifier.addEventListener('click', () => {
        modal_modifier.classList.remove('hidden');
        document.getElementById("descri-modif").value = transaction.description;
        document.getElementById("mont-modif").value = transaction.montant;
        document.getElementById("type-modif").value = transaction.type;
        document.getElementById("date-modif").value = transaction.date;
        id_modifier = transaction.id;
        card_modifier = card;
    });
}

// const btn_affiche_modal_modifier = card.querySelector(`#btn-modi-id-${transaction.id}`);
// btn_affiche_modal_modifier.addEventListener('click', () => {
//     modal_operation.querySelector("h2").textContent = "Effectuer votre modification"
//     let modifier = document.createElement("button")
//     modifier.textContent = "modifier"
//     modifier.classList = "bg-green-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
//     let enregistre = document.getElementById("enregistrer")
//     console.log(modal_operation)
//     modal_operation.replaceChild(enregistre, modifier)

//     modal_operation.classList.remove('hidden');

// });


btn_confirmer_suppr.addEventListener('click', () => {
    if (card_supprimer && id_supprimer !== null) {
        card_supprimer.remove();
        liste_transactions = liste_transactions.filter(
            (transac) => transac.id !== id_supprimer
        )
        card_supprimer = null;
        id_supprimer = null;
        modal_supprimer.classList.add("hidden");
    }
    update_total();
});


function modifier_operation() {

    const nouvDescri = document.getElementById("descri-modif").value;
    const nouvMont = document.getElementById("mont-modif").value;
    const nouvType = document.getElementById("type-modif").value;
    const nouvDate = document.getElementById("date-modif").value;

    if (!nouvDescri || !nouvMont || !nouvDate) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    if (nouvMont <= 0) {
        alert("Le montant doit être supérieur à 0 !");
        return;
    }

    if (isNaN(nouvMont)) {
        alert("Le montant doit être un nombre valide !");
        return;
    }

    const index = liste_transactions.findIndex(tran => tran.id === id_modifier);
    if (index === -1) {
        alert("Transaction introuvable !");
        return;
    }

    liste_transactions[index] = {
        ...liste_transactions[index],
        description: nouvDescri,
        montant: nouvMont,
        type: nouvType,
        date: nouvDate
    };

    card_modifier.querySelector(".desc").textContent = `Description : ${nouvDescri}`;
    card_modifier.querySelector(".mont").textContent = `Montant : ${nouvType === 'revenu' ? '+' : '-'} ${nouvMont} DH`;
    card_modifier.querySelector(".type").textContent = `Type : ${nouvType}`;
    card_modifier.querySelector(".date").textContent = `Date : ${nouvDate}`;

    card_modifier.className = `border-2 border-blue-900 rounded-3xl h-50 flex flex-col gap-2 p-4 items-center text-blue-900 ${nouvType === 'revenu' ? 'bg-green-300' : 'bg-red-300'}`;

    modal_modifier.classList.add('hidden');
    card_modifier = null;
    id_modifier = null;

    update_total();
}

function update_total(){
    const  total_rev = document.getElementById("total-rev");
    const total_dep = document.getElementById("total-dep");
    const solde = document.getElementById("solde");

    let revenu = 0;
    let depense = 0;
    let sol = 0;

    for(let i = 0; i< liste_transactions.length;i++){
        if(liste_transactions[i].type == 'revenu'){
            revenu+= Number(liste_transactions[i].montant) ;
        }else{
            depense+=Number(liste_transactions[i].montant);
        }
    }
    
    sol= revenu-depense;
    const s=document.getElementById("s");
    if(sol < 0){
        solde.classList.remove('text-[#40db7a]');
        s.classList.add('text-red-400');
    }
    solde.textContent= sol;
    total_rev.textContent= revenu;
    total_dep.textContent= depense;
}



