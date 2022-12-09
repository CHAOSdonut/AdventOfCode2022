import fs from "fs";

const testInput =
    `30373
25512
65332
33549
35390`

const instructionInput = fs.readFileSync("../input/day8Input", "utf-8");

class Forest {
    constructor(textInput) {
        this.trees = []
        this.input = textInput

        this.fillForest()
        this.checkVisibility()
    }

    fillForest = function () {
        this.input = this.input.split('\r\n')
        this.input.forEach(treeLine => {
            let line = []
            treeLine.split('').forEach(tree => {
                line.push(new Tree(tree))
            })
            this.trees.push(line)
        })
    }

    checkVisibility = function () {
        let trees = this.trees
        for (let i = 0; i < trees.length; i++) {
            for (let j = 0; j < trees[i].length; j++) {
                if (trees[j - 1] === undefined || trees[j + 1] === undefined || trees[j][i - 1] === undefined || trees[j][i + 1] === undefined) {
                    this.trees[i][j].visible = true
                }
                else {
                    let leftSearch = []
                    let rightSearch = []
                    let upSearch = []
                    let downSearch = []

                    // trees[i].slice(0, i).forEach(v => {leftSearch.push(v.height)})
                    // trees[i].slice(i+1, trees.length).forEach(v => {rightSearch.push(v.height)})
                    for (let k = 0; k < i; k++) {
                        leftSearch.push(trees[k][j].height)
                    }
                    for (let l = j+1; l < trees[i].length; l++) {
                        rightSearch.push(trees[l][j].height)
                    }

                    for (let k = 0; k < j; k++) {
                        upSearch.push(trees[i][k].height)
                    }
                    for (let l = j+1; l < trees[i].length; l++) {
                        downSearch.push(trees[i][l].height)
                    }

                    if(
                        Math.max(...leftSearch) < trees[i][j].height ||
                        Math.max(...rightSearch) < trees[i][j].height ||
                        Math.max(...upSearch) < trees[i][j].height ||
                        Math.max(...downSearch) < trees[i][j].height
                    ){
                        this.trees[i][j].visible = true
                    }
                }
            }
        }
    }
}

class Tree {
    constructor(height) {
        this.height = height
        this.visible = false
    }
}

const f = new Forest(instructionInput)

//console.table(f.trees)
let count = 0
f.trees.forEach(treeLine => {
    treeLine.forEach(tree => {
        if(tree.visible){
            count++
        }
    })
})

console.log(`Visible trees: ${count}`)
