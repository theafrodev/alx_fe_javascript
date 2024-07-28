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
        category: 'philosophy'
    },
    {
        text: 'this is a quote 2',
        category: 'wellbeing'
    },
    {
        text: 'this is a quote 3',
        category: 'roots'
    },
    {
        text: 'this is a quote 4',
        category: 'wellbeing'
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

    let categoryExists = false;
    for (let i = 0; i < categoryFilter.options.length; i++) {
        if (categoryFilter.options[i].value === newQuoteCategory) {
            categoryExists = true;
            break;
        }
    }

    // If the category does not exist, add it to the dropdown
    if (!categoryExists) {
        categoryFilter.insertAdjacentHTML("beforeend", `<option value="${newQuoteCategory}">${newQuoteCategory}</option>`);
    }

    // let quoteStorage = JSON.stringify(quotes);

    saveQuotes();

    console.log(quotes);
}

function getQuotes(){

    if (localStorage.getItem('quotes')){
        // console.log(localStorage.getItem('quotes'));
        return localStorage.getItem('quotes');
    }else{
        saveQuotes();
        // console.log(localStorage.getItem('quotes'));
        return localStorage.getItem('quotes');
    }

    // console.log(JSON.parse(localStorage.getItem('quotes')));

    // return localStorage.getItem('quotes');

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
  
  let categoryFilter = document.getElementById('categoryFilter');

  function populateCategories(){

    let categories = [];
    
    quotes.forEach((item)=>{
        categories.push(item.category);
    });

    categories = [...new Set(categories)]

    console.log('Categories:' + categories);

    categories.forEach((item)=>{
        categoryFilter.insertAdjacentHTML("beforeend",`<option value=${item}>${item}</option>`);
    });

  }

  function filterQuotes(option){

    quoteDisplay.innerHTML = '';

    quotes.forEach((item)=>{
        if(item.category === option){
            quoteDisplay.insertAdjacentHTML("beforeend", `<h6>${item.text}</h6>`);
            localStorage.setItem('category', `${item.category}`);
        }else if(option === "All Categories"){
            quoteDisplay.insertAdjacentHTML("beforeend", `<h6>${item.text}</h6>`);
            localStorage.setItem('category', `${option}`);
        }
    });
  }

  function getFilter(){

    quoteDisplay.innerHTML = '';

    let option = localStorage.getItem('category');

    categoryFilter.value = option;

    console.log(option + 'here');

    quotes.forEach((item)=>{
        if(option === "All Categories"){
            quoteDisplay.insertAdjacentHTML("beforeend", `<h6>${item.text}</h6>`);
        }
        else if(item.category === option){
            quoteDisplay.insertAdjacentHTML("beforeend", `<h6>${item.text}</h6>`);
        }
    });

  }

document.addEventListener("DOMContentLoaded", ()=>{

    getQuotes();

    showRandomQuotes();

    populateCategories();

    // console.log(body);

    newQuote.addEventListener('click', ()=>{showRandomQuotes()});

    createAddQuoteForm();

    categoryFilter.addEventListener('change', () => {
        const selectedValue = categoryFilter.value;
        console.log('Selected value:', selectedValue);

        const selectedIndex = categoryFilter.selectedIndex;
        const selectedOption = categoryFilter.options[selectedIndex];
        console.log('Selected text:', selectedOption.text);

        filterQuotes(selectedOption.text);
    });

    getFilter(); 

});