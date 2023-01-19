var quote = document.getElementById("quote");
var character = document.getElementById("character");
var anime = document.getElementById("name-of-anime")
var header = document.getElementsByTagName("h1")[0];
//var btn = document.getElementById("quote-btn");

var url = "https://animechan.vercel.app/api/random";

function getQuote () {
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        quote.innerText = item.quote;
        character.innerText = item.character;
        anime.innerText = item.anime
      });
  };

window.addEventListener("load", getQuote);
//btn.addEventListener("click", getQuote);

quote.style.fontStyle = "italic";
quote.style.fontSize = "19px";
anime.style.fontSize = "19px";
character.style.fontSize = "19px";
header.style.fontSize = "25px";
character.style.fontWeight = "bold"
anime.style.fontWeight = "bold"
header.style.textAlign = "center"
character.style.textAlign = "center"
anime.style.textAlign = "center"
quote.style.textAlign = "center"
