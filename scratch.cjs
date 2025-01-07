const regex = /(don't|do)/g

const text = 'don\'t do it'

console.log([...text.matchAll(regex)])