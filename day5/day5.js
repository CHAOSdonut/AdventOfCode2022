import fs from "fs";

const testCrates = [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P']
]

const crates = [
    ['R','N','P','G'],
    ['T','J','B','L','C','S','V','H'],
    ['T','D','B','M','N','L'],
    ['R','V','P','S','B'],
    ['G','C','Q','S','W','M','V','H'],
    ['W','Q','S','C','D','B','J'],
    ['F','Q','L'],
    ['W','M','H','T','D','L','F','V'],
    ['L','P','B','V','M','J','F']
]

const crates9001 = [
    ['R','N','P','G'],
    ['T','J','B','L','C','S','V','H'],
    ['T','D','B','M','N','L'],
    ['R','V','P','S','B'],
    ['G','C','Q','S','W','M','V','H'],
    ['W','Q','S','C','D','B','J'],
    ['F','Q','L'],
    ['W','M','H','T','D','L','F','V'],
    ['L','P','B','V','M','J','F']
]
const crates9000 = [
    ['R','N','P','G'],
    ['T','J','B','L','C','S','V','H'],
    ['T','D','B','M','N','L'],
    ['R','V','P','S','B'],
    ['G','C','Q','S','W','M','V','H'],
    ['W','Q','S','C','D','B','J'],
    ['F','Q','L'],
    ['W','M','H','T','D','L','F','V'],
    ['L','P','B','V','M','J','F']
]

const testInput =
    `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const instructionInput = fs.readFileSync("../input/day5InputPruned", "utf-8");

let cleanInput = instructionInput.replaceAll(/\b(?:move|from|to)\b/gi, "")
cleanInput = cleanInput.split('\r\n')

const instructions = []
cleanInput.forEach(instruction => {
    let out = instruction.split(' ')
    out = out.filter(entry => entry !== '')
    instructions.push(out)
})
instructions.pop()

function moveCrate9000(crates9000, from, to){
    from = parseInt(from)
    to = parseInt(to)
    from--
    to--
    crates9000[to].push(crates9000[from].pop())
}


instructions.forEach(instruction => {
        for (let i = 0; i < instruction[0]; i++) {
            moveCrate9000(crates9000, instruction[1], instruction[2])
        }
    }
)
console.table(crates9000)

let topCrates9000 = ""
crates9000.forEach(crateStack => {
    topCrates9000 += crateStack[crateStack.length-1]
})

console.log(`Top crate of each stack with the 9000 model is: ${topCrates9000}`)

function moveCrate9001(instructions, crates9001){
    let amount = parseInt(instructions[0])
    let from = parseInt(instructions[1])
    let to = parseInt(instructions[2])
    from--
    to--
    amount = Math.min(amount, crates9001[from].length)
    let temp = []
    for (let i = 0; i < amount; i++) {
        temp.push(crates9001[from].pop())
    }
    for (let i = 0; i < amount; i++) {
        crates9001[to].push(temp.pop())
    }
}

instructions.forEach(instruction => {
    moveCrate9001(instruction, crates9001)
})
console.table(crates9001)

let topCrates9001 = ""
crates9001.forEach(crateStack => {
    if (crateStack[crateStack.length - 1] !== undefined)
    topCrates9001 += crateStack[crateStack.length - 1]
})

console.log(`Top crate of each stack with the 9001 model is: ${topCrates9001}`)

// console.table(testCrates)
// moveCrate9001([1,2,1], testCrates)
// console.table(testCrates)
// moveCrate9001([3,1,3], testCrates)
// console.table(testCrates)
// moveCrate9001([2,2,1], testCrates)
// console.table(testCrates)
// moveCrate9001([1,1,2], testCrates)
// console.table(testCrates)




