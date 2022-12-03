import fs from "fs";

const testInput =
    `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const input = fs.readFileSync("../input/day3Input", "utf-8");

//fill alphabetArray using character-codes
let alphabetArray = []

for (let i = 97; i <= 122; i++) {
 alphabetArray.push(String.fromCharCode(i))
}

for (let i = 65; i <= 90; i++) {
    alphabetArray.push(String.fromCharCode(i))
}

//create backpack and fill compartments
const backpack = input.split('\r\n');
let splitBackpack = []
backpack.forEach(value => {
    const items = value.split("")
    const compartment1 = items.splice(0, items.length/2)
    const compartment2 = items
    splitBackpack.push([compartment1, compartment2])
})

//find duplicates in backpack
let duplicateItems = []
splitBackpack.forEach(backpack => {
    backpack[0].every(item => {
        if(backpack[1].includes(item)){
            duplicateItems.push(item)
            return false
        }
        else{
            return true
        }
    })
})

//add up priority score of duplicates
let score = 0
duplicateItems.forEach(item => {
    score += alphabetArray.indexOf(item) + 1
})

console.log(`Sum of the priorities: ${score}`)





//create 3 group with backpacks
let groups = []
let group = []
let i = 0;
backpack.forEach(value => {
    const items = value.split("")
    group.push(items)
    i++

    if(i>=3){
        groups.push(group)
        i = 0
        group = []
    }
})

//find duplicates in groups
let badges = []
groups.forEach(backpack => {
    backpack[0].every(item => {
        if(backpack[1].includes(item) && backpack[2].includes(item)){
            badges.push(item)
            return false
        }
        else{
            return true
        }
    })
})

let badgeScore = 0
badges.forEach(item => {
    badgeScore += alphabetArray.indexOf(item) + 1
})

console.log(`total priority of all badges: ${badgeScore}`)
