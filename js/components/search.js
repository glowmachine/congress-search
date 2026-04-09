export function search(textInput, data) {
    const terms = textInput.toLowerCase().split(' ')
        .map(word => word.length === 2 ? word.toUpperCase() : word);

    // const members = filter(terms, data);
    return filter(terms, data);
};

export function filter(terms, data) {
    const filteredData = data.filter(member => {
        const ignoredTerms = [''];
        const searchableTerms = [...ignoredTerms, member.name, member.nickname, member.office, member.state, member.district, member.party]
            .join(' ').toLowerCase() + ` ${member.stateAbbr}`;
        return terms.every(term => searchableTerms.includes(term));
    });
    return filteredData;
}