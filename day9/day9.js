import fs from "fs";

const testInput =
    `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const instructionInput = fs.readFileSync("../input/day9Input", "utf-8");

let input = instructionInput
    .split('\r\n')
    .map(i => i.split(' '))

let placesVisited = []
let head = {x:0, y:0}
let tail = {x:0, y:0}

input.forEach(i => {
    for (let j = 0; j < i[1]; j++) {
        switch (i[0]){
            case 'U':
                head.y++
                break;
            case 'D':
                head.y--
                break;
            case 'L':
                head.x--
                break;
            case 'R':
                head.x++
                break;
        }
        if (head.y - tail.y === 2){
            tail.y++
            tail.x = head.x
        }
        if (head.y - tail.y === -2){
            tail.y--
            tail.x = head.x
        }
        if (head.x - tail.x === 2){
            tail.x++
            tail.y = head.y
        }
        if (head.x - tail.x === -2){
            tail.x--
            tail.y = head.y
        }
        let coords = [tail.x, tail.y]
        placesVisited.push(coords)
    }
})

console.log(placesVisited)
console.log(placesVisited.length)
let set = new Set()
placesVisited.map(place => set.add(JSON.stringify(place)))
console.log(set.size)




