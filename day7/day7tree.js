import fs from "fs";

class Folder {
    constructor(name, size = 0) {
        this.name = name
        this.size = size
        this.childen = []
    }

    addSize = function (s){
        this.size += s
    }
}

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

let cleanInput = testInput.split('\n')
cleanInput = cleanInput.filter(f => f !== '$ ls')

console.log(cleanInput)
