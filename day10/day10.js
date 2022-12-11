import fs from "fs";

const testInput = fs.readFileSync("../input/day10test", "utf-8");
const trueInput = fs.readFileSync("../input/day10Input", "utf-8");

const input = trueInput.split('\r\n')
let instArr = []
input.forEach(i => instArr.push(i.split(' ')))
instArr = instArr.filter(f => f[0] !== '')

class CPU {
    constructor() {
        this.X = 1
        this.cycle = 0
        this.totalSignalStrength = 0
        this.pixels = []
    }

    nextCycle(){
        this.drawPixel()
        this.cycle++
        this.checkSignalStrength([20,60,100,140,180,220])

    }

    checkSignalStrength(at){
        if(at.includes(this.cycle)){
            this.totalSignalStrength += this.cycle * this.X
        }
    }

    addX(x){
        this.nextCycle()
        this.nextCycle()
        this.X += parseInt(x)
    }

    noop(){
        this.nextCycle()
    }

    runInstructions(instArr){
        instArr.forEach(inst => {
            switch (inst[0]){
                case 'noop':
                    this.noop()
                    break
                case 'addx':
                    this.addX(inst[1])
                    break
                default:
                    console.log(`Invalid instruction ${inst}`)
            }
        })
    }

    drawPixel(){
        let current = this.cycle
        current = current-(40*(Math.floor(this.cycle/40)))
        if (this.X-1 === current || this.X === current || this.X+1 === current){
            this.pixels.push('\u2588')
        }
        else{
            this.pixels.push(' ')
        }
    }
}

const cpu = new CPU()
cpu.runInstructions(instArr)
console.log(`Sum of 6 signal strengths: ${cpu.totalSignalStrength}`)

console.log('resulting image: ')
console.log(cpu.pixels.join('').match(/.{1,40}/g))

