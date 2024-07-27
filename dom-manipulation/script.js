let quoteDisplay = document.getElementById("quoteDisplay");

let newQuote = document.getElementById("newQuote");

let form = document.createElement('div');

form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>`;

let body = document.querySelector('body');

let script = document.querySelector('script');

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

function createAddQuoteForm(){
    body.insertBefore(form, script);
}

function addQuote(){
    let newQuotetext = document.getElementById('newQuoteText').value.trim();

    let newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
   
    quotes.push({text: newQuotetext, category: newQuoteCategory});
   console.log(quotes);
}

document.addEventListener("DOMContentLoaded", ()=>{

    showRandomQuotes();

    console.log(body);

    newQuote.addEventListener('click', ()=>{showRandomQuotes()});

    createAddQuoteForm();

    

});