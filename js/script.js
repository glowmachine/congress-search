class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            this.cacheDOM();
            this.bindingEvents();

            const database = await this.fetchData();
            this.data = this.extractData(database);

            this.search('');
        }
        catch (err) {
            console.log("init() failed:", err);
        }
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
        let timeout;
        this.searchField.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.search(e.target.value);
            }, 500);
        });
    }

    search(textInput) {
        const normalizedTerms = textInput.toLowerCase().split(' ')
            .map(word => word.length === 2 ? word.toUpperCase() : word);

        const filteredData = this.data.filter(member => {
            const ignoredTerms = [''];
            const filteredTerms = [...ignoredTerms, member.name, member.nickname, member.office, member.state, member.district, member.party]
                .join(' ').toLowerCase() + ` ${member.stateAbbr}`;
            return normalizedTerms.every(term => filteredTerms.includes(term));
        });

        this.drawResults(filteredData);
        this.drawCards(filteredData);
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

    extractData(database) {
        const extractedData = database.map(member => {
            return {
                name: member.name.official_full,
                nickname: member.name.nickname,
                age: member.bio.birthday,
                office: this.getOffice(member),
                state: this.getState(member),
                district: this.getDistrict(member),
                stateAbbr: member.terms.at(-1).state,
                party: this.getParty(member),
                website: this.getWebsite(member),
                wikipedia: `https://en.wikipedia.org/wiki/${member.id.wikipedia}`
            };
        });
        return extractedData;
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

            if (member.office === 'Senator') {
                counters.senators++;
            }
            else if (member.office === 'Representative') {
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

        let validDistrict = '';
        if (member.office === 'Representative' && member.district[0] !== '0') {
            validDistrict = ` - ${member.district}`;
        }

        card.innerHTML = `
                    <div class="card__details">
                        <h2 class="card__office">${member.name}</h2>
                        <p>${member.office} - ${member.party}</p>
                        <p>${member.state}${validDistrict}</p>
                        <a href="${member.wikipedia}">View Profile</a> / <a href="${member.website}">Visit Website</a>
                    </div>`;
        // card.innerHTML = `
        //             <div class="card__details">
        //                 <h2 class="card__office">${member.name}</h2>
        //                 <p>${member.office} - ${member.party}</p>
        //                 <p>${member.state}</p>
        //                 <a href="${member.wikipedia}">View Profile</a>
        //             </div>`;
        return card;
    }

    getOffice(member) {
        const currentTerm = member.terms.at(-1);
        return currentTerm.type === 'sen' ? 'Senator' : 'Representative';
    }

    getState(member) {
        const fullname = {
            AL: "Alabama",
            AK: "Alaska",
            AZ: "Arizona",
            AR: "Arkansas",
            CA: "California",
            CO: "Colorado",
            CT: "Connecticut",
            DE: "Delaware",
            FL: "Florida",
            GA: "Georgia",
            HI: "Hawaii",
            ID: "Idaho",
            IL: "Illinois",
            IN: "Indiana",
            IA: "Iowa",
            KS: "Kansas",
            KY: "Kentucky",
            LA: "Louisiana",
            ME: "Maine",
            MD: "Maryland",
            MA: "Massachusetts",
            MI: "Michigan",
            MN: "Minnesota",
            MS: "Mississippi",
            MO: "Missouri",
            MT: "Montana",
            NE: "Nebraska",
            NV: "Nevada",
            NH: "New Hampshire",
            NJ: "New Jersey",
            NM: "New Mexico",
            NY: "New York",
            NC: "North Carolina",
            ND: "North Dakota",
            OH: "Ohio",
            OK: "Oklahoma",
            OR: "Oregon",
            PA: "Pennsylvania",
            RI: "Rhode Island",
            SC: "South Carolina",
            SD: "South Dakota",
            TN: "Tennessee",
            TX: "Texas",
            UT: "Utah",
            VT: "Vermont",
            VA: "Virginia",
            WA: "Washington",
            WV: "West Virginia",
            WI: "Wisconsin",
            WY: "Wyoming",

            // Territories
            DC: "District of Columbia",
            PR: "Puerto Rico",
            GU: "Guam",
            VI: "U.S. Virgin Islands",
            AS: "American Samoa",
            MP: "Northern Mariana Islands"
        };
        const currentTerm = member.terms.at(-1);
        return fullname[currentTerm.state];
    }

    getDistrict(member) {
        const currentTerm = member.terms.at(-1);
        const district = currentTerm.district;
        if (!district) {
            return '';
        }
        if (district === 11 || district === 12) {
            return `${district}th District`;
        }
        else if (district % 10 === 1) {
            return `${district}st District`;
        }
        else if (district % 10 === 2) {
            return `${district}nd District`;
        }
        else if (district % 10 === 3) {
            return `${district}rd District`;
        }
        else {
            return `${district}th District`;
        }
    }

    getParty(member) {
        const currentTerm = member.terms.at(-1);
        return currentTerm.party;
    }

    getWebsite(member) {
        const currentTerm = member.terms.at(-1);
        return currentTerm.url;
    }
}

new App();