let button = document.querySelector('#button');
let name = document.querySelector('#name');
let height = document.querySelector('#height');
let mass = document.querySelector('#mass');
let birthYear = document.querySelector('#birthYear');
let films = document.querySelector('#films');

let filmButton = document.querySelector('#filmButton');
let title = document.querySelector('#title'); 
let director = document.querySelector('#director');
let producer = document.querySelector('#producer');


function findPeople(){
    
    let randomNumber = Math.floor((Math.random()*83)+1)
    let apiURL = 'https://swapi.dev/api/people/' + randomNumber + '/'
    axios.get(apiURL).then(function(response){
        updateInfo(response.data)
    })
}

function findFilms(){
    let randomNumber = Math.floor((Math.random()*6)+1)
    let apiURL = 'https://swapi.dev/api/films/' + randomNumber + '/'
    axios.get(apiURL).then(function(response){
        updateInfo2(response.data)
    })
}

function updateInfo(data){
    name.innerText = data.name
     height.innerText =  `Height: ${data.height}`
     mass.innerText =  `Mass: ${data.mass}`
     birthYear.innerText =  `Birth Year: ${data.birth_year}`
     
     let f = data.films.toString();
     const actorFilms = f.split(",");
     let text = "";
     actorFilms.forEach(getFilms);
     
     
     function getFilms(value){
        let filmURL = value.toString()
        axios.get(filmURL).then(function(response){
        updateFilmInfo(response.data)
        })
        function updateFilmInfo(data){
            text += "- <a id=filmLink href=films.htm>" + data.title + "</a><br>"
            films.innerHTML = "FILMS: <br>" + text;
        }  
     }    
}

function updateInfo2(data){
    title.innerText = data.title
     director.innerText =  `Director: ${data.director}`
     producer.innerText =  `Producer: ${data.producer}` 
}

button.addEventListener('click',findPeople);
filmButton.addEventListener('click',findFilms);

