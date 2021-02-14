// ON decleare le Api et le varible on vas utiliser
let url = "https://places-dsn.algolia.net/1/places/query";
const inputWord = document.getElementById('search');
const match = document.getElementById('match-list');

// Avec les d'ecuteur on peux dire qes-est-ce que on veux 
inputWord.addEventListener('keyup', () => {
    match.innerHTML = "";
    // le condition 
    if (inputWord.value) {
        // on utilise Ajec avec le post method pour fait un request et avoir un response 
        fetch(url, {
                method: 'POST',
                body: JSON.stringify({ query: inputWord.value })
            })
            .then(reponse => reponse.json())
            .then((data) => {
                console.log(data)
                    // on fait un boucle 
                for (let i = 0; i < 10; i++) {
                    //  on rejouter le list avec d'aide de innsertAjecentHtml pour affechier le list de result de differenct paye
                    match.insertAdjacentHTML('beforeend', `
            <li class="showcarte" data-lat="${data.hits[i]._geoloc.lat}" data-lng="${data.hits[i]._geoloc.lng}"
>  
            ${data.hits[i].locale_names.default[0]}


            </li>
            `)


                }
            })

    }

})

/*....................................CARTE.....................*/
// on rejouter les d'eouter dans le button, au moment on click le button on affichier le latitude et le longitude de la cate de le paye on cherche  
let button = document.getElementById('btn').addEventListener('click', () => {
    const latlog = document.querySelectorAll('.showcarte')
    console.log(latlog)

    // on decleare le latitude et longitude qu'on rejoute avec le inserAjecentHTML pour utilise ça dans notre carte de affisage
    const lat = latlog[0].getAttribute("data-lat")
    const lng = latlog[0].getAttribute("data-lng")

    console.log(lat, lng)
    map.flyTo([lat, lng]);

})

var map = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();