let quoteDisplay = document.getElementById("quoteDisplay");

let newQuote = document.getElementById("newQuote");

let form = document.createElement('div');

form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>`;

let body = document.querySelector('body');

let script = document.querySelector('script');

let quotes = [
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

function saveQuotes(){
    console.log(quotes);
    
    let saveQuote = JSON.stringify(quotes);

    localStorage.setItem('quotes', saveQuote);

    return saveQuote;
}



function showRandomQuotes(){
    let index = Math.floor(Math.random()*quotes.length);

    let quoteObject = JSON.parse(getQuotes());

    quotes = quoteObject;

    console.log(quotes);

    // console.log(quotes[index].text);

    return quoteDisplay.innerHTML = quoteObject[index].text;
}

function createAddQuoteForm(){
    body.insertBefore(form, script);
}

function addQuote(){
    let newQuotetext = document.getElementById('newQuoteText').value.trim();

    let newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
   
    quotes.push({text: newQuotetext, category: newQuoteCategory});

    let addedText = document.createElement('div');

    addedText.textContent = `${newQuotetext} added successfully`;

    quoteDisplay.appendChild(addedText);

    // let quoteStorage = JSON.stringify(quotes);

    saveQuotes();

    console.log(quotes);
}

function getQuotes(){

    if (localStorage.getItem('quotes')){
        // console.log(localStorage.getItem('quotes'));
    }else{
        saveQuotes();
        // console.log(localStorage.getItem('quotes'));
    }

    console.log(JSON.parse(localStorage.getItem('quotes')));

    return localStorage.getItem('quotes');

}

function exportQuotes(){

    const link = document.createElement('a');

    const blob = new Blob([JSON.stringify(getQuotes())], { type: 'application/json' });

    link.href = URL.createObjectURL(blob);

    link.download = 'quotes.json';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      console.log(importedQuotes);
      console.log(typeof importedQuotes);

      let checker = JSON.parse(importedQuotes);

      console.log(checker);

      checker.forEach(item => {
        //console.log(item);
        quotes.push(item);
    });

    console.log(quotes);
    saveQuotes();

      alert('Quotes imported successfully!');

    };

    //console.log(quotes);

    fileReader.readAsText(event.target.files[0]);
  }


document.addEventListener("DOMContentLoaded", ()=>{

    getQuotes();

    showRandomQuotes();

    // console.log(body);

    newQuote.addEventListener('click', ()=>{showRandomQuotes()});

    createAddQuoteForm();

});