console.log("Fichier 2 chargé");

let searchIcon = document.getElementById('search_icon')
let searchBar = document.getElementById('search_bar')



function searchActive () {
    // if (searchBar.value == "") {
        searchIcon.classList.toggle('flipped');
        searchBar.classList.toggle('flipped');
    // } else if (searchBar.value !== null) {
        
    //         console.log(searchBar.value);
        
    // } else {
    //     searchIcon.classList.add('flipped')
    //     searchBar.classList.add('flipped')
    // }
}

searchIcon.addEventListener('click', searchActive)


let table = localStorage.getItem('myTable')

if( table ){
    table = JSON.parse(table)
}
else {
    table = []
}

let itemList = document.getElementById('itemlist');

  table.forEach(function (obj) {

    function getFilename(path) {
        var filename = path.replace(/^.*[\\\/]/, '');
        return "Ressources/" + filename;
      }

    if (obj.statut == 'ready') {
        var statutJeu = 'Prêt à être joué'       
    } else if (obj.statut == 'notDownloaded') {
        var statutJeu = 'Pas encore téléchargé'
    } else {
        var statutJeu = 'Pas encore acheté'
    }

    let item = document.createElement('li');
    item.innerHTML = `
        <div class="newItem">
            <div class="firstcontent">
                <img src="${getFilename(obj.image)}" alt="${obj.nom}">
                <div class="infoItem unscrolled">
                    <div class="statut ${obj.statut}">${statutJeu}</div>
                    <h3>${obj.nom}</h3>
                </div>
            </div>
            <div class="contentdisplayed">
                <h4>Description :</h4>
                <div class="content-element">${obj.desc}</div>
                <h4>Nom de l'éditeur :</h4>
                <div class="content-element">${obj.nomEdit}</div>
                <h4>Date de publication :</h4>
                <div class="content-element">${obj.publi}</div>
                <h4>Identifiant :</h4>
                <div class="content-element">${obj.id}</div>
                <h4>Mail :</h4>
                <div class="content-element">${obj.mail}</div>
                <h4>Mot de passe :</h4>
                <div class="content-element">${obj.pw}</div>
            </div>
            <span class="mdi mdi-arrow-down-drop-circle-outline" id="dropList"></span>
        </div>`;
    itemList.appendChild(item);
  });

console.table(table);

let accordion = document.getElementsByClassName('mdi-arrow-down-drop-circle-outline');
let info = document.getElementsByClassName('contentdisplayed');

for (let i = 0; i < info.length; i++) {

    accordion[i].addEventListener('click', function() {                

                if (this.style.transform == "rotate(180deg) translateX(-20%)") {
                this.style.transform = "rotate(0deg) translateX(0)"; 
                info[i].style.height = "0px"
                console.log('clic');
            } else {
                this.style.transform = "rotate(180deg) translateX(-20%)";
                info[i].style.height = info[i].scrollHeight+"px"
                console.log('clic');
            }
        })
}

let searchInput = document.getElementById('search_bar');

searchInput.addEventListener('keyup', function() {
  let filter = searchInput.value.toUpperCase();
  let items = document.getElementsByTagName('li');

  Array.from(items).forEach(function(item) {
    let name = item.getElementsByTagName('h3')[0].textContent.toUpperCase();
    if (name.startsWith(filter)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

let filterSelect = document.getElementById('filter-select');

filterSelect.addEventListener('change', function() {
  let filter = filterSelect.options[filterSelect.selectedIndex].getAttribute('data-status');
  console.log(filter);
  let items = document.getElementsByTagName('li');

  Array.from(items).forEach(function(item) {
    let status = item.querySelector('.statut').classList[1];
    if (filter === "all" || status === filter) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});