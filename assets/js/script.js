console.log("coding here");

//document.queryselector for input text box in the future
var inputEl = document.querySelector(".user-input-search");
var buttonEl = document.querySelector(".result-button");
var divListEl = document.querySelector(".divList");

var listOfTitles = []; // user seraching the stuff up will be returned in a Array
var listOfURL = [];
var listOfGenre = [];
var listOfImage = [];   
var listOfSynoposis = [];

//event listeners
buttonEl.addEventListener("click", function(event) {
    event.preventDefault();
    clearList(); //if there was a previous list that was created
    getInputValue();
});

inputEl.addEventListener("keydown", function(event) {
    if(event.key === 'Enter')
    {
        event.preventDefault();
        clearList();
        getInputValue();
    }
});


function getInputValue() {
    var input = inputEl.value;
    inputEl.value = ""; //clears the serach bar so it is ready for next search
    console.log(input); // user searching what they put in
    searchApi(input);
}


function searchApi(query) {


    var apiURL = "https://api.jikan.moe/v4/anime?q="+ query +"&sfw"; // User search up specific manga

    fetch(apiURL)
    .then(response => response.json()) //turns it into a json object
    .then(info => {
        //displays the information like titles, images, the link to MyAnimeList.net
        //console.log(info);
        searchTitle(info);
        searchURL(info);
        searchGenre(info);
        searchImage(info);
        searchSynopsis(info);
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

function searchSynopsis(info) {//description of anime
    for(var i = 0; i < info.data.length; i++) {
        try {
            if(info.data[i].synopsis == null)
            {
                throw new Error("Null in synopsis");
            }
            listOfSynoposis.push(info.data[i].synopsis);
        }
        catch(error) {
            listOfSynoposis.push("Synopsis Not Available");
        }
    }
} 

function display() {
    for(var i = 0; i < listOfTitles.length; i++) {
        // console.log("-----------------------------------");
        // console.log(listOfTitles[i]);
        // console.log(listOfURL[i]);
        // console.log(listOfGenre[i]);
        // console.log(listOfImage[i]);
        // console.log("-----------------------------------");

        // create elements

        //div tag that holds everything
        var divItem = document.createElement("div");
        divItem.classList.add("result-container");

        //title of anime
        var titleEl = document.createElement("h2");
        titleEl.classList.add("result-title");
        titleEl.textContent = listOfTitles[i];

        //genre of anime
        var genreEl = document.createElement("p");
        genreEl.textContent = listOfGenre[i];

        //image of anime
        var imgEl = document.createElement("img");
        imgEl.src = listOfImage[i];

        //description of anime with event listener attached
        var synopEl = document.createElement("button");
        synopEl.classList.add("synopsis-button");
        synopEl.textContent = "Synopsis";
        synopEl.addEventListener("click", function(event) {
            event.preventDefault();
            displayModal(event);
        });

        //Modal-content Will not be seen
        var modalEl = document.createElement("div");
        modalEl.classList.add("modal-content");
        modalEl.classList.add("modal-background");
        modalEl.style.display = "none";
        var closeButtonEl = document.createElement("button");
        closeButtonEl.classList.add("close");
        closeButtonEl.textContent = "Exit"; //multiplication 'x'
        closeButtonEl.addEventListener("click", function(event) {
            closeModal(event);
        });
        var textModalEl = document.createElement("p");
        textModalEl.textContent = listOfSynoposis[i];
        modalEl.appendChild(closeButtonEl);
        modalEl.appendChild(textModalEl);





        var malLink = document.createElement("a");
        malLink.classList.add("mal-link");
        malLink.textContent = "MyAnimeList";
        malLink.href = listOfURL[i];

        // append elements

        divItem.appendChild(titleEl);
        divItem.appendChild(genreEl);
        divItem.appendChild(imgEl);
        divItem.appendChild(synopEl);
        divItem.appendChild(malLink);
        divItem.append(modalEl);
        //added all of it to the item

        divListEl.appendChild(divItem);
        //add it to the actual page
    }
}

function displayModal(event) {
   var parent = event.target.parentNode;
   var child = parent.querySelector(".modal-content")
   child.style.display = "block";
}

function closeModal(event) {
    //console.log("here");
    var parent = event.target.parentNode;
    parent.style.display = "none";
}

function clearList() { //when user serach for another thing, i want to clear the previous list
    while(divListEl.firstChild) {
        divListEl.removeChild(divListEl.firstChild);
    }
    listOfTitles = []; // clear the list too
    listOfURL = [];
    listOfGenre = [];
    listOfImage = [];  
    listOfSynoposis = [];
}

// searchApi("Naruto");
// console.log(listOfTitles.length); //for some reason. javascript continues before starting the function

