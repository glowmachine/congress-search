import { debounce } from './utils.js';
import { fetchData, extractData } from './services.js';
import { search } from './components/search.js';
import { drawResults, drawCards } from './components/render.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            this.cacheDOM();
            this.bindingEvents();

            const database = await fetchData();
            this.data = extractData(database);

            this.render('');
        }
        catch (err) {
            console.log("init() failed:", err);
        }
    }

    render(query) {
        const filteredMembers = search(query, this.data);
        drawResults(this.resultsSection, filteredMembers);
        drawCards(this.cardList, filteredMembers);
    }

    cacheDOM() {
        this.resultsSection = document.querySelector('.results__section');
        this.cardList = document.querySelector('.card__list');
        this.filterButton = document.querySelector('.header__filter-btn');
        this.filterButtonLines = this.filterButton.querySelector('.header__filter-btn-lines');
        this.searchField = document.querySelector('.header__text-field');
        // this.searchButton = document.querySelector('.header__submit-btn');
    }

    bindingEvents() {
        this.filterButtonListener();
        this.searchFieldListener();
    }

    filterButtonListener() {
        this.filterButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.filterButtonLines.classList.toggle('active');
        });
    }

    searchFieldListener() {
        const debouncedRender = debounce((value, data) => {
            this.render(value, data)
        }, 350)

        this.searchField.addEventListener('input', (e) => {
            debouncedRender(e.target.value, this.data);
        });
    }
}

new App();