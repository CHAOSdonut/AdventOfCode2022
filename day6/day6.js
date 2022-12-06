import fs from "fs";

const testInput =
    `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

const input = fs.readFileSync("../input/day6Input", "utf-8");

const inputArray = Array.from(input)

function searchForUniqueChain(array) {
    for (let i = 0; i < array.length-4; i++) {
        const chain = array.slice(i, i+4)
        if(chain[0] !== chain[1] && chain[0] !== chain[2] && chain[0] !== chain[3] && chain[1] !== chain[2] && chain[1] !== chain[3] && chain[2] !== chain[3]){
           return i + 4
        }
    }
}

const star1 = searchForUniqueChain(inputArray)
console.log(`star 1 answer: ${star1}`)

function searchForUniqueChain14(array) {
    for (let i = 0; i < array.length-14; i++) {
        const chain = array.slice(i, i+14)
        const filtered = new Set(chain)
        if (chain.length === filtered.size){
            return i+14
        }
    }
}

const star2 = searchForUniqueChain14(inputArray)
console.log(`star 1 answer: ${star2}`)
