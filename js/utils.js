export function getOffice(member) {
    const currentTerm = member.terms.at(-1);
    return currentTerm.type === 'sen' ? 'Senator' : 'Representative';
}

export function getState(member) {
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

export function getDistrict(member) {
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

export function getParty(member) {
    const currentTerm = member.terms.at(-1);
    return currentTerm.party;
}

export function getWebsite(member) {
    const currentTerm = member.terms.at(-1);
    return currentTerm.url;
}

export function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => { fn(...args) }, delay);
    };
}