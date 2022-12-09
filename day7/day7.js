import fs from "fs";

const testInput =
    `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const input = fs.readFileSync("../input/day7Input", "utf-8");

let filteredInput = input.split('\r\n');
filteredInput = filteredInput.filter(f => f !== '$ ls')

let myfs = [];
let currentDir = ""

filteredInput.forEach(line => {
    if(line.split(" ")[0] === '$'){
        if(line.split(" ")[2] === '..'){
            let newdir = currentDir.split(' ').splice(0, currentDir.split(' ').length-2)
            currentDir = ""
            newdir.forEach(value => {
                currentDir += `${value} `
            })
        }
        else {
            currentDir +=`${line.split(" ")[2]} `
        }
    }
    else if(line.split(' ')[0] !== "dir") {
        myfs.push(`${currentDir} ${line.split(' ')[0]}`)
    }
})

let totals = {}
myfs.forEach(line => {
    const lineArr = line.split('  ')
    lineArr[0].split(' ').forEach(value => {
        if (totals[value] !== undefined) {
            if(!isNaN(+lineArr[1])) {
                totals[value] = totals[value] + +lineArr[1]
            }
        }
        else {
            totals[value] = +lineArr[1]
        }
    })
})
console.table(totals)

let sum = 0
for (const a in totals) {
    if(totals[a] <= 100000){
        sum += totals[a]
    }
}

console.log(`Total of all files under 100000: ${sum}`)
