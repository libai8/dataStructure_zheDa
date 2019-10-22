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
        rows.push(input)
        if (rows.length > lineNum - 1) {
            rl.input.emit('end');
            return;
        }
    }
})

process.stdin.on('end', () => {
    console.log('结束', rows);
});
