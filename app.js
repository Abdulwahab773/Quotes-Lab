let authorSelect = document.getElementById("author-select");
let nameOfAuthor = document.getElementById("author-name");
let search_btn = document.getElementById("search_btn");
let mainContainer = document.getElementById("mainContainer");
let author_name = document.getElementById("author_name")
let quotes_container = document.getElementById("quotes_container");
let quoteOfTheday = document.getElementById("quoteOfTheday");
let authorOfTheDay = document.getElementById("authorOfTheDay");


async function getQuotes() {
    let response = await fetch("https://dummyjson.com/quotes/?limit=0");
    let data = await response.json();
    let quotes = data.quotes;
    let authorNames = [];


    quotes.forEach((item) => {
        if (!authorNames.includes(item.author)) {
            authorNames.push(item.author);
        };
    })


    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
    quoteOfTheday.innerHTML = randomQuote.quote;
    authorOfTheDay.innerHTML = `–${randomQuote.author}`;




    for (let i = 0; i < authorNames.length; i++) {
        authorSelect.innerHTML += `<option value='${authorNames[i]}'>${authorNames[i]}</option>`;
    }

    search_btn.addEventListener('click', () => {
        let selectedAuthor = authorSelect.value;

        if (selectedAuthor === "-- Select an Author --") {
            alert("Please Select An Author!");
            return;

        } else {
            quotes_container.innerHTML = "";

            for (let i = 0; i < quotes.length; i++) {
                if (quotes[i].author === selectedAuthor) {
                    quotes_container.innerHTML += `<div class="quote-item">
                        <div class="quote-card" id="quote_card">
                            <p>${quotes[i].quote}</p> 
                            <span>${quotes[i].author}</span>
                        </div>
                    </div>`
                    
                }
            };


            mainContainer.classList.add("author-quotes");
            mainContainer.classList.remove("hidden");
            author_name.innerHTML = `"${selectedAuthor}"`;
        };
    });
};

getQuotes();