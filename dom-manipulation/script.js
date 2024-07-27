let quoteDisplay = document.getElementById("quoteDisplay");

let newQuote = document.getElementById("newQuote");

const quotes = [
    {
        text: 'this is a quote',
        category: 'this is a quote category 1'
    },
    {
        text: 'this is a quote 2',
        category: 'this is a quote category 2'
    },
    {
        text: 'this is a quote 3',
        category: 'this is a quote category 3'
    },
    {
        text: 'this is a quote 4',
        category: 'this is a quote category 4'
    }
]

function showRandomQuotes(){
    let index = Math.floor(Math.random()*quotes.length);

    console.log(quotes[index].text);

    return quoteDisplay.innerHTML = quotes[index].text;
}

document.addEventListener("DOMContentLoaded", ()=>{

    showRandomQuotes();

    newQuote.addEventListener('click', ()=>{showRandomQuotes()});

});