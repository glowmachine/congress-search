class App {
    constructor() {
        this.init();
    }

    init() {
        this.filterButtonListener();
    }

    filterButtonListener() {
        const filterButton = document.querySelector('.header__filter-btn');
        const filterButtonLines = filterButton.querySelector('.header__filter-btn-lines');
        filterButton.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtonLines.classList.toggle('active');
        });
    }
}

new App();