let quote = document.getElementById("quote");
let character = document.getElementById("character");
let anime = document.getElementById("name-of-anime")
let btn = document.getElementById("quote-btn");

var url = "https://animechan.vercel.app/api/random";

let getQuote = () => {
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        quote.innerText = item.quote;
        character.innerText = item.character;
        anime.innerText = item.anime
      });
  };

window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);