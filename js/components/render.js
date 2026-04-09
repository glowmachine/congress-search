export function drawResults(element, data) {
    const num = countResults(data);
    const html = `
        <p>Results: ${num.results}</p>
        <p>Senators: ${num.senators}</p>
        <p>Representatives: ${num.representatives}</p>
        <p>Democrats: ${num.democrats}</p>
        <p>Independents: ${num.independents}</p>
        <p>Republicans: ${num.republicans}</p>`;
    element.innerHTML = html;
}

function countResults(data) {
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

export function drawCards(element, data) {
    element.innerHTML = '';
    const members = data;
    members.forEach(member => {
        element.appendChild(createCard(member));
    });
}

function createCard(member) {
    const card = document.createElement('article');
    card.className = 'card';

    let validDistrict = '';
    if (member.office === 'Representative' && member.district !== '') {
        validDistrict = ` - ${member.district}`;
    }

    card.innerHTML = `
                    <div class="card__details">
                        <h2 class="card__office">${member.name}</h2>
                        <p>${member.office} - ${member.party}</p>
                        <p>${member.state}${validDistrict}</p>
                        <a href="${member.wikipedia}">View Profile</a> / <a href="${member.website}">Visit Website</a>
                    </div>`;
    return card;
}