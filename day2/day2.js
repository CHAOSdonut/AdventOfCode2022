import fs from "fs";

const testInput =
    `A Y
B X
C Z`

const input = fs.readFileSync("../input/day2Input", "utf-8");

let matchArray = [];
const data = input.split('\r\n');
data.forEach(value => {
    matchArray.push(value.split(' '))
})

let score1 = 0;
function playMatch1(p1, p2) {
    switch (p2) {
        case 'X':
            score1 += 1
            if (p1 === "A"){score1 += 3}
            if (p1 === "B"){score1 += 0}
            if (p1 === "C"){score1 += 6}
            break;
        case 'Y':
            score1 += 2
            if (p1 === "A"){score1 += 6}
            if (p1 === "B"){score1 += 3}
            if (p1 === "C"){score1 += 0}
            break;
        case 'Z':
            score1 += 3
            if (p1 === "A"){score1 += 0}
            if (p1 === "B"){score1 += 6}
            if (p1 === "C"){score1 += 3}
            break;
        default:

    }
}

let score2 = 0;
function playMatch2(p1, p2) {
    switch (p2) {
        case 'X':
            score2 += 0
            if (p1 === "A"){score2 += 3}
            if (p1 === "B"){score2 += 1}
            if (p1 === "C"){score2 += 2}
            break;
        case 'Y':
            score2 += 3
            if (p1 === "A"){score2 += 1}
            if (p1 === "B"){score2 += 2}
            if (p1 === "C"){score2 += 3}
            break;
        case 'Z':
            score2 += 6
            if (p1 === "A"){score2 += 2}
            if (p1 === "B"){score2 += 3}
            if (p1 === "C"){score2 += 1}
            break;
        default:

    }
}

matchArray.forEach(value => {
    playMatch1(value[0], value[1])
    playMatch2(value[0], value[1])
})

console.log(`Total score game 1: ${score1}`);
console.log(`Total score game 2: ${score2}`);
