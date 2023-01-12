var quote = document.getElementById("quote");
var character = document.getElementById("character");
var anime = document.getElementById("name-of-anime")
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