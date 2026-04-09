import { getOffice, getState, getDistrict, getParty, getWebsite } from './utils.js';

export async function fetchData() {
    try {
        const response = await fetch('https://unitedstates.github.io/congress-legislators/legislators-current.json');
        // const response = await fetch('./legislators-current.json');
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

export function extractData(database) {
    const extractedData = database.map(member => {
        return {
            name: member.name.official_full,
            nickname: member.name.nickname,
            age: member.bio.birthday,
            office: getOffice(member),
            state: getState(member),
            district: getDistrict(member),
            stateAbbr: member.terms.at(-1).state,
            party: getParty(member),
            website: getWebsite(member),
            wikipedia: `https://en.wikipedia.org/wiki/${member.id.wikipedia}`
        };
    });
    return extractedData;
}