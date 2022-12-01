import * as fs from "fs";

const testInput =
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const input = fs.readFileSync("../input/day1Input", "utf-8");

const elves = [];

const data = input.split('\r\n');

let elfTotal = 0
data.forEach(value => {
    if (value === ''){
        elves.push(elfTotal)
        elfTotal = 0
    }
    else {
        elfTotal += parseInt(value)
    }
})
elves.push(elfTotal)

console.log(`Calories of the highest calorie carrying elf: ${Math.max(...elves)}`);

elves.sort(function(a, b){return b - a});
const top1ProcentOfElves = elves[0] + elves[1] + elves[2]

console.log(`Total calories of top 3 elves: ${top1ProcentOfElves}`);
