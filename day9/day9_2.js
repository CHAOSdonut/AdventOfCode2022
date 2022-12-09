import fs from "fs";

const testInput = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

const instructionInput = fs.readFileSync("../input/day9Input", "utf-8");

let input = instructionInput
    .split('\r\n')
    .map(i => i.split(' '))

let visited = []
class Section {
    constructor(child = undefined) {
        this.x = 0
        this.y = 0
        this.child = child
    }

    updateChild() {
        if(this.child) {
            if (this.y - this.child.y === 2 && this.x - this.child.x === 2 ){
                this.child.y++
                this.child.x++
            }
            if (this.y - this.child.y === -2 && this.x - this.child.x === -2 ){
                this.child.y--
                this.child.x--
            }
            if (this.y - this.child.y === 2 && this.x - this.child.x === -2 ){
                this.child.y++
                this.child.x--
            }
            if (this.y - this.child.y === -2 && this.x - this.child.x === 2 ){
                this.child.y--
                this.child.x++
            }
            if (this.y - this.child.y === 2) {
                this.child.y++
                this.child.x = this.x
            }
            if (this.y - this.child.y === -2) {
                this.child.y--
                this.child.x = this.x
            }
            if (this.x - this.child.x === 2) {
                this.child.x++
                this.child.y = this.y
            }
            if (this.x - this.child.x === -2) {
                this.child.x--
                this.child.y = this.y
            }

            this.child.updateChild()
        }
        else {
            let coords = [this.x, this.y]
            visited.push(coords)
        }
    }

    move(x, y) {
        this.x += x
        this.y += y

        this.updateChild()
    }

}

let H = new Section(new Section(new Section(new Section(new Section(new Section(new Section(new Section(new Section(new Section())))))))))

input.forEach(i => {
    for (let j = 0; j < i[1]; j++) {
        switch (i[0]) {
            case 'U':
                H.move(0, 1)
                break;
            case 'D':
                H.move(0, -1)
                break;
            case 'L':
                H.move(-1, 0)
                break;
            case 'R':
                H.move(1, 0)
                break;
        }
    }
})

console.log(`nodes visited: ${visited.length}`)
let set = new Set()
visited.map(place => set.add(JSON.stringify(place)))
console.log(`unique nodes: ${set.size}`)
