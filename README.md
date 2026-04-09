# 
A practice exercise of a simple webapp for looking up US Congress members.

## Live Demo
https://glowmachine.github.io/congress-search/

## Features
- Search legislators by name/nickname, state, district, and/or party
- Debounced search input
- Live results counter

## Tech Stack
- HTML
- CSS
- JS
- JSON

## How It Works
- Legislator data is fetched from https://github.com/unitedstates/congress-legislators JSON, and users can use the search bar to find members when their terms match one of the extracted object properties. Search is live and filters results with a 0.5s debounce.

## Key Challenges
- filter button styling
- deboucing and search functionality
- asynchronous javascript

## Future Improvements
- filter functionality
- responsive layout
- UI improvements