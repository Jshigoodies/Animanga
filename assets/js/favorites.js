console.log("favorites");

var divFavoriteList = document.querySelector(".favorites-list");


function checkFavorites() {
    if(localStorage.length != 0) {
        //console.log(localStorage.length);
        clearImage()
    }
}

function clearImage() { //clears the image and the rest of the stuff that's inside there
    while(divFavoriteList.firstChild) {
        divFavoriteList.removeChild(divFavoriteList.firstChild);
    }
    displayFavorites()

}

function displayFavorites() {
    for(var i = 0; i<localStorage.length; i++) {
        var title = localStorage.key(i);
        var info = JSON.parse(localStorage.getItem(title)); // 0: genre, 1: image_url, 2: MAL url, 3: synopsis
        // console.log(title);
        // console.log(info);

        // create the elements the same as the one in the search list
        var divItem = document.createElement("div");
        divItem.classList.add("result-container");

        var titleEl = document.createElement("h2");
        titleEl.classList.add("result-title");
        titleEl.textContent = title; // title

        var genreEl = document.createElement("p");
        genreEl.textContent = info[0]; // genre

        var imgEl = document.createElement("img");
        imgEl.src = info[1]; // image

        var nextLineEl = document.createElement("br");

        var synopEl = document.createElement("button");
        synopEl.classList.add("synopsis-button");
        synopEl.classList.add("modal-button");
        synopEl.classList.add("result-button");
        synopEl.classList.add("button");
        synopEl.textContent = "Synopsis";
        synopEl.addEventListener("click", function(event) {
            event.preventDefault();
            displayModal(event);
        });

        //Modal-content Will not be seen
        var modalEl = document.createElement("div");
        modalEl.classList.add("modal");
        modalEl.classList.add("is-hidden");

        var modalBackground = document.createElement("div");
        modalBackground.classList.add("modal-background");

        var modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");


        var closeButtonEl = document.createElement("button");
        closeButtonEl.classList.add("modal-close");
        closeButtonEl.classList.add("is-large");
        closeButtonEl.textContent = "Exit"; //multiplication 'x'
        closeButtonEl.addEventListener("click", function(event) {
            closeModal(event);
        });
        var textModalEl = document.createElement("p");
        textModalEl.classList.add("synopsis-text");
        textModalEl.textContent = info[3];
        textModalEl.style.color = "white";

        modalEl.appendChild(modalBackground);

        // content
        modalContent.appendChild(textModalEl);
        modalEl.appendChild(modalContent);

        // button
        modalEl.appendChild(closeButtonEl);



        var malLink = document.createElement("a");
        malLink.classList.add("mal-link");
        malLink.textContent = "MyAnimeList";
        malLink.href = info[2];

        var unFavoriteButton = document.createElement("button");
        unFavoriteButton.classList.add("favorite-button");
        unFavoriteButton.classList.add("result-button");
        unFavoriteButton.classList.add("button");
        unFavoriteButton.textContent = "-";
        unFavoriteButton.addEventListener("click", function(event) {
            event.preventDefault();
            removeFavorite(event);
        });


        divItem.appendChild(titleEl);
        divItem.appendChild(genreEl);
        divItem.appendChild(imgEl);
        divItem.appendChild(nextLineEl);
        divItem.appendChild(synopEl);
        divItem.appendChild(malLink);
        divItem.appendChild(modalEl);
        divItem.appendChild(unFavoriteButton);


        divFavoriteList.appendChild(divItem);


    }
}

function displayModal(event) {
    var parent = event.target.parentNode;
    var child = parent.querySelector(".modal")
    child.classList.remove("is-hidden");
    child.classList.add("is-active");
 }
 
function closeModal(event) {
     //console.log("here");
     var parent = event.target.parentNode;
     parent.classList.remove("is-active");
     parent.classList.add("is-hidden")
}

function removeFavorite(event) {
    //console.log("here to remove it")
    var parent = event.target.parentNode;
    var titleName = parent.querySelector(".result-title");
    localStorage.removeItem(titleName.textContent);

    var bigParent = parent.parentNode;
    bigParent.removeChild(parent);

    checkNothing();
}

function checkNothing() {
    var size = localStorage.length;
    if(size === 0) {
        var pTag = document.createElement("p");
        var imgEl = document.createElement("img");
        imgEl.src = "assets/images/favorites-empty.png";

        pTag.appendChild(imgEl);

        var noFavoritesYetEl = document.createElement("p");
        noFavoritesYetEl.textContent = "No favorites yet";


        //append everything

        divFavoriteList.appendChild(pTag);
        divFavoriteList.appendChild(noFavoritesYetEl);

    }
}


// runs here
checkFavorites();