process.stdin.setEncoding('utf8');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rows = []
let lineNum = 2

rl.on('line', (input) => {
    if (input) {
        rows.push(input.trim())
        if (rows.length > lineNum - 1) {
            rl.input.emit('end');
            return;
        }
    }
})

process.stdin.on('end', () => {
    let num = +rows[0];
    let arr = []
    arr = rows[1].split(' ').map((value) => {
        return +value
    })
    maxSubseqSum(num, arr)
});

function maxSubseqSum (num = 0, arr = []) {
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if (sum < 0) {
                sum = 0
            }
            if (sum > maxSum) {
                maxSum = sum
            }
        }
    }
    console.log(maxSum)
}
