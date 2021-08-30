//CHARACTER INFORMATION
let name      = document.querySelector('#name');
let height    = document.querySelector('#height');
let mass      = document.querySelector('#mass');
let birthYear = document.querySelector('#birthYear');
let films     = document.querySelector('#films');

//FILM INFORMATION
let title        = document.querySelector('#title'); 
let director     = document.querySelector('#director');
let producer     = document.querySelector('#producer');
let releaseDate  = document.querySelector('#releaseDate');
let openingCrawl = document.querySelector('#openingCrawl');

//Find a Random Star Wars Character
async function findCharacter(){
    let randomNumber = Math.floor((Math.random()*83)+1);
    let charURL = 'https://swapi.dev/api/people/' + randomNumber + '/';
    
    try{
        let res = await fetch(charURL);
        let result = await res.json();
        return result;
    }catch (error){
        console.log(error);
    }
}

//Get the data of the URL for a specific  Film
async function getThisURL(Url){
    let URL = Url;
    try{
        let res = await fetch(URL);
        let result = await res.json();
        updateInfo2(result);
    }catch (error){
        console.log(error);
    } 
}

//Get the data of the URL for a specific Character
async function getThisURL1(Url){
    let URL = Url;
    try{
        let res = await fetch(URL);
        let result = await res.json();
        updateInfo3(result);
    }catch (error){
        console.log(error);
    } 
}

//Display Character Information
async function updateInfo(){
    let data = await findCharacter();
    name.innerText = data.name
    height.innerText =  `Height: ${data.height}`
    mass.innerText =  `Mass: ${data.mass}`
    birthYear.innerText =  `Birth Year: ${data.birth_year}`
    
    let f = data.films.toString();
     const actorFilms = f.split(",");
     let text = "";
     actorFilms.forEach(getFilms);
     
     
     function getFilms(value){
        let filmURL = value.toString();
        filmName(filmURL);
        async function filmName(URL){
        try{
            let filmRes = await fetch(URL);
            let filmResult = await filmRes.json();
            updateFilmInfo(filmResult);
        }catch (error){
            console.log(error);
        }
        }
        function updateFilmInfo(data){
            let filmURL1 = data.url
            text += "- <a id=filmLink onclick=getThisURL1('" +filmURL1+ "')>" + data.title + "</a><br>"
            films.innerHTML = "FILMS: <br>" + text;
        }  
     }    
} //End of UpdateInfo Function

//Find a Random Star Wars Film
async function findFilm(){
    let randomNumber = Math.floor((Math.random()*6)+1);
    let charURL = 'https://swapi.dev/api/films/' + randomNumber + '/';
    
    try{
        let res = await fetch(charURL);
        let result = await res.json();
        return result;
    }catch (error){
        console.log(error);
    }
} //END OF FIND FILMS

//Display Film Information
async function updateInfo1(){
    let data = await findFilm();
    title.innerText = data.title
    director.innerText =  `Director: ${data.director}`
    producer.innerText =  `Producer: ${data.producer}`
    releaseDate.innerText = `Release Date: ${data.release_date}`
    openingCrawl.innerHTML = data.opening_crawl
    
    let c = data.characters.toString();
     const filmCharacters = c.split(",");
     let text = "";
     filmCharacters.forEach(getCharacters);
     
     
     function getCharacters(value){
        let characURL = value.toString();
        charName(characURL);
        async function charName(URL){
        try{
            let charRes = await fetch(URL);
            let charResult = await charRes.json();
            updateCharInfo(charResult);
        }catch (error){
            console.log(error);
        }
        }
        function updateCharInfo(data){
            let charURL1 = data.url
            text += "<a id=charLink onclick=getThisURL('" +charURL1+ "')>" + data.name + "</a>, "
            characters.innerHTML = "CHARACTERS: <br>" + text;
        }  
     }  
}//END OF UPDATE INFO 1

//Display the information of a specific character on the film page
async function updateInfo2(data){
    name.innerText = data.name
    height.innerText =  `Height: ${data.height}`
    mass.innerText =  `Mass: ${data.mass}`
    birthYear.innerText =  `Birth Year: ${data.birth_year}`
}

//Display the information of a specific film on the character/index page
async function updateInfo3(data){
    title.innerText = data.title
    director.innerText =  `Director: ${data.director}`
    producer.innerText =  `Producer: ${data.producer}`
    releaseDate.innerText = `Release Date: ${data.release_date}`
}
