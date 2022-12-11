import fs from "fs";

const testInput = fs.readFileSync("../input/day11test", "utf-8");
const trueInput = fs.readFileSync("../input/day11Input", "utf-8");

const input = trueInput.split('\r\n\r\n')
let monkeyNotes = []
monkeyNotes.push()
input.forEach(monkey => {
    monkeyNotes.push(monkey.split('\r\n'))
})

let divideBy3 = true

class Monkey {
    constructor(number, items, operation, test, ifTrue, ifFalse) {
        this.number = number
        this.items = items
        this.operation = operation
        this.test = test
        this.ifTrue = ifTrue
        this.ifFalse = ifFalse
        this.itemsInspected = 0
    }

    inspectItems(){
        let count = 0
        this.items.forEach(item => {
            this.itemsInspected++
            let worry = item
            const v1 = parseInt(this.operation[2]) || worry
            const v2 = parseInt(this.operation[4]) || worry
            worry = eval(v1 + this.operation[3] + v2)
            if(divideBy3) {
                worry = Math.floor(worry / 3)
            }
            else {
                let productOfDevision = 1
                monkeys.forEach(monkey =>{
                    productOfDevision *= monkey.test
                })
                worry = worry%productOfDevision
            }

            if(worry%this.test === 0){
                this.throwAt(this.ifTrue, worry)
            }
            else {
                this.throwAt(this.ifFalse, worry)
            }
            count++
        })
        for (let i = 0; i < count; i++) {
            this.items.shift()
        }
    }

    throwAt(target, item){
        monkeys.forEach(monkey => {
            if(monkey.number === target){
                monkey.items.push(item)
            }
        })
    }
}

function monkeyBuilder(notes) {
    const monkeys = []
    notes.forEach(m => {
        monkeys.push(new Monkey(
            parseInt(m[0].substring(7, m[0].length-1)),
            m[1].substring(18).split(', ').map(n => parseInt(n)),
            m[2].substring(13).split(' '),
            parseInt(m[3].substring(21)),
            parseInt(m[4].substring(29)),
            parseInt(m[5].substring(30))
        ))
    })
    return monkeys
}

function simulateRounds(rounds){
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.inspectItems()
        })
    }
}

let monkeys = monkeyBuilder(monkeyNotes)

divideBy3 = false
simulateRounds(10000)
let num = []
monkeys.forEach(monkey => {
    console.log(`Monkey: ${monkey.number} Inspected: ${monkey.itemsInspected} Items: ${monkey.items}`)
    num.push(monkey.itemsInspected)
})
num.sort(function(a, b) {
    return a - b;
});
console.log(`\nSum of most 2 active monkeys: ${num[num.length-1] * num[num.length-2]}`)
