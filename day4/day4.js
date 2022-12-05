import fs from "fs";

const testInput =
    `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const input = fs.readFileSync("../input/day4Input", "utf-8");

const pairs = input.split('\r\n')
const splitPairs = []

pairs.forEach(pair => {
    const arr = pair.split(',');
    const out = []
    arr.forEach(value => {
        const tempArray = value.split('-')
        tempArray.forEach(value1 => {out.push(parseInt(value1))})
    })
    splitPairs.push(out);
})

console.table(splitPairs)

let count = 0
function checkCompleteOverlap(x) {
    if (x[0] <= x[2] && x[1] >= x[3] || x[0] >= x[2] && x[1] <= x[3])
    {
        return true
    }
}
splitPairs.forEach(pair => {
    if( checkCompleteOverlap(pair)){
        count++
    }
})

console.log(`pairs in completely in each-others range: ${count}`)

let count2 = 0
function checkPartialOverlap(x) {
    if (x[0] >= x[2] && x[0] <= x[3] || x[1] >= x[2] && x[1] <= x[3])
    {
        return true
    }
}
splitPairs.forEach(pair => {
    if(checkPartialOverlap(pair) || checkCompleteOverlap(pair)){
        count2++
    }
})

console.log(`pairs in completely or partially in each-others range: : ${count2}`)
