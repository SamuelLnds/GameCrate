console.log('Fichier 2 chargé');

var checkbox = document.getElementById('account_check');
var formIfChecked = document.getElementById('accountform');
var btnValidation = document.getElementById('btn_validation');
var form = document.getElementById('form');

let table = localStorage.getItem('myTable');

if( table ){
    table = JSON.parse(table)
}
else {
    table = []
}

checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
        formIfChecked.classList.toggle('checked');
    } else {
        formIfChecked.classList.toggle('checked');
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
     
    let image = document.getElementById('image').value;
    let nom = document.getElementById('game_name').value;
    let desc = document.getElementById('desc').value;
    let nomEdit = document.getElementById('editor_name').value;
    let publi = document.getElementById('publi_date').value;
    let id = document.getElementById('id_util').value;
    let mail = document.getElementById('mail_util').value;
    let pw = document.getElementById('pw_util').value;
    let statut = document.getElementById('status').value;

     // Vérification de la longueur du nom de jeu
    let error = false;
    if (nom.length > 15) {
        alert("Le nom doit faire moins de 15 caractères.");
        error = true;
    }

    // Vérification de la longueur de la description du jeu
    if (desc.length > 150) {
        alert("La description de jeu doit faire moins de 150 caractères.");
        error = true;
    }

    // Vérification de la longueur du nom de l'éditeur
    if (nomEdit.length > 15) {
        alert("Le nom de l'éditeur doit faire moins de 15 caractères.");
        error = true;
    }

    // Vérification du format de la date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publi)) {
        alert("Le formatage de la date est incorrect.");
        error = true;
    }

    if (!error) {
        let obj = {}
        
            obj.image= image,
            obj.nom= nom,
            obj.desc= desc,
            obj.nomEdit= nomEdit,
            obj.publi= publi,
            obj.id= id,
            obj.mail= mail,
            obj.pw= pw,
            obj.statut= statut

        table.push(obj);
        form.reset();

        console.table(table);

        localStorage.setItem('myTable', JSON.stringify(table));
    }
});

// Sélection de l'élément input contenant l'image
const imageInput = document.getElementById('image');

// Sélection de l'élément img qui sert de placeholder
const placeholderImg = document.querySelector('img[alt="Insérer une image"]');

// Ajout d'un écouteur d'événement "change" sur l'input
imageInput.addEventListener('change', function() {
  // Vérification qu'un fichier a bien été sélectionné
  if (imageInput.files && imageInput.files[0]) {
    // Lecture du fichier avec FileReader()
    const reader = new FileReader();
    reader.onload = function(event) {
      // Mise à jour de la source de l'élément img avec l'image sélectionnée
      placeholderImg.src = event.target.result;
    }
    reader.readAsDataURL(imageInput.files[0]);
  }
});