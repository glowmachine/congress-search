class App {
    constructor() {
        this.init();
    }

    async init() {
        this.cacheDOM();
        this.bindingEvents();

        const database = await this.fetchData();
        this.data = this.filterData(database);

        this.searchHandler();
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
        this.searchField.addEventListener('input', (e) => {
            e.preventDefault();
            console.log(e.target.value);
            this.searchHandler(e.target.value);
        });
    }

    searchHandler(term) {
        if (!term) {
            this.drawResults(this.data);
            this.drawCards(this.data);
        }
        else {
            const filteredData = this.data.filter(member => {
                return (
                    member.name.toLowerCase().includes(term.toLowerCase()) ||
                    member.title.toLowerCase().includes(term.toLowerCase()) ||
                    member.state.toLowerCase().includes(term.toLowerCase()) ||
                    member.party.toLowerCase().includes(term.toLowerCase())
                );
            });
            this.drawResults(filteredData);
            this.drawCards(filteredData);
        }
    };

    async fetchData() {
        try {
            const response = await fetch('https://unitedstates.github.io/congress-legislators/legislators-current.json');
            if (!response.ok) {
                throw new Error(`ok: ${response.ok}, status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }

    filterData(database) {
        const filtered = database.map(member => {
            return {
                photo: this.getPhoto(member),
                name: member.name.official_full,
                title: this.getTitle(member),
                state: this.getState(member),
                party: this.getParty(member)
            };
        });
        return filtered;
    }

    drawResults(data) {
        const num = this.countResults(data);
        const html = `
            <p>Results: ${num.results}</p>
            <p>Senators: ${num.senators}</p>
            <p>Representatives: ${num.representatives}</p>
            <p>Democrats: ${num.democrats}</p>
            <p>Independents: ${num.independents}</p>
            <p>Republicans: ${num.republicans}</p>`;
        this.resultsSection.innerHTML = html;
    }

    countResults(data) {
        const counters = {
            results: 0,
            senators: 0,
            representatives: 0,
            democrats: 0,
            independents: 0,
            republicans: 0
        };

        data.forEach(member => {
            counters.results++;

            if (member.title === 'Senator') {
                counters.senators++;
            }
            else if (member.title === 'Representative') {
                counters.representatives++;
            }

            if (member.party === 'Democrat') {
                counters.democrats++;
            }
            else if (member.party === 'Republican') {
                counters.republicans++;
            }
            else if (member.party === 'Independent') {
                counters.independents++;
            }
        });
        return counters;
    }

    drawCards(data) {
        this.cardList.innerHTML = '';
        const members = data;
        members.forEach(member => {
            this.cardList.appendChild(this.createCard(member));
        });
    }

    createCard(member) {
        const card = document.createElement('article');
        card.className = 'card';

        card.innerHTML = `
                    <img src="${member.photo}" alt="Portrait of ${member.name}" class="card__portrait" height="200" width="200">
                    <div class="card__details">
                        <h2 class="card__title">${member.name}</h2>
                        <p>${member.title} - ${member.party}</p>
                        <p>${member.state}</p>
                        <a href="#">View Profile</a>
                    </div>`;
        return card;
    }

    // TODO: find source
    getPhoto(member) {
        return null;
    }

    getTitle(member) {
        const currentTerm = member.terms.at(-1);
        return currentTerm.type === 'sen' ? 'Senator' : 'Representative';
    }

    getState(member) {
        const currentTerm = member.terms.at(-1);
        switch (currentTerm.state) {
            case "AL": return "Alabama";
            case "AK": return "Alaska";
            case "AZ": return "Arizona";
            case "AR": return "Arkansas";
            case "CA": return "California";
            case "CO": return "Colorado";
            case "CT": return "Connecticut";
            case "DE": return "Delaware";
            case "FL": return "Florida";
            case "GA": return "Georgia";
            case "HI": return "Hawaii";
            case "ID": return "Idaho";
            case "IL": return "Illinois";
            case "IN": return "Indiana";
            case "IA": return "Iowa";
            case "KS": return "Kansas";
            case "KY": return "Kentucky";
            case "LA": return "Louisiana";
            case "ME": return "Maine";
            case "MD": return "Maryland";
            case "MA": return "Massachusetts";
            case "MI": return "Michigan";
            case "MN": return "Minnesota";
            case "MS": return "Mississippi";
            case "MO": return "Missouri";
            case "MT": return "Montana";
            case "NE": return "Nebraska";
            case "NV": return "Nevada";
            case "NH": return "New Hampshire";
            case "NJ": return "New Jersey";
            case "NM": return "New Mexico";
            case "NY": return "New York";
            case "NC": return "North Carolina";
            case "ND": return "North Dakota";
            case "OH": return "Ohio";
            case "OK": return "Oklahoma";
            case "OR": return "Oregon";
            case "PA": return "Pennsylvania";
            case "RI": return "Rhode Island";
            case "SC": return "South Carolina";
            case "SD": return "South Dakota";
            case "TN": return "Tennessee";
            case "TX": return "Texas";
            case "UT": return "Utah";
            case "VT": return "Vermont";
            case "VA": return "Virginia";
            case "WA": return "Washington";
            case "WV": return "West Virginia";
            case "WI": return "Wisconsin";
            case "WY": return "Wyoming";

            // Territories
            case "DC": return "District of Columbia";
            case "PR": return "Puerto Rico";
            case "GU": return "Guam";
            case "VI": return "U.S. Virgin Islands";
            case "AS": return "American Samoa";
            case "MP": return "Northern Mariana Islands";

            default:
                return "Invalid";
        }
    }

    getParty(member) {
        const currentTerm = member.terms.at(-1);
        return currentTerm.party;
    }

    // createMember(data) {
    //     const memberDetails = {
    //         name: data.name.official_full,
    //     };

    //     function getParty() {

    //     }
    //     // return memberDetails;
    // }
}

new App();