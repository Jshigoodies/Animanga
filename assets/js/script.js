console.log("coding here");

//document.queryselector for input text box in the future

var listOfTitles = []; // user seraching the stuff up will be returned in a Array
var listOfURL = [];
var listOfGenre = [];
var listOfImage = [];   

function searchApi(query) {


    var apiURL = "https://api.jikan.moe/v4/anime?q="+ query +"&sfw"; // User search up specific manga

    fetch(apiURL)
    .then(response => response.json()) //turns it into a json object
    .then(info => {
        //displays the information like titles, images, the link to MyAnimeList.net
        console.log(info);
        searchTitle(info);
        searchURL(info);
        searchGenre(info);
        searchImage(info);
        
        display();


    })
}

function searchTitle(info) { //title of anime
    for(var i = 0; i < info.data.length; i++) {
        try {
            listOfTitles.push(info.data[i].title);
        }
        catch(error) {
            listOfTitles.push("Title not Available");
        }
        
    }
}

function searchURL(info) { //url for myanimelist.net
    for(var i = 0; i < info.data.length; i++) {
        try {
            listOfURL.push(info.data[i].url);
        }
        catch(error) {
            listOfURL.push("MyAnimeList Url not Available")
        }
        
    }
}

function searchGenre(info) { // what type of anime is it?
    for(var i = 0; i < info.data.length; i++) {
        try {
            listOfGenre.push(info.data[i].themes[0].name);
        }
        catch(error) {
            listOfGenre.push("Genre Not Available");
        }
        
    }
}

function searchImage(info) { //image url
    for(var i = 0; i < info.data.length; i++) {
        try {
            listOfImage.push(info.data[i].images.jpg.image_url);
        }
        catch(error) {
            listOfImage.push("Image not available");
        }
        
    }
}

function display() {
    for(var i = 0; i < listOfTitles.length; i++) {
        console.log("-----------------------------------");
        console.log(listOfTitles[i]);
        console.log(listOfURL[i]);
        console.log(listOfGenre[i]);
        console.log(listOfImage[i]);
        console.log("-----------------------------------");
    }
}

searchApi("Naruto");
// console.log(listOfTitles.length); //for some reason. javascript continues before starting the function

