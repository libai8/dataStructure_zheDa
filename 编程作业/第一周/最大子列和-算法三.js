process.stdin.setEncoding('utf8');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rows = [];
let lineNum = 2;

rl.on('line', (input) => {
    if (input) {
        rows.push(input.trim());
        if (rows.length > lineNum - 1) {
            rl.input.emit('end');
            return;
        }
    }
})

process.stdin.on('end', () => {
    let num = +rows[0];
    let list = [];
    list = rows[1].split(' ').map((value) => {
        return +value;
    });
    maxSubseqSum(num, list);
});

function maxSubseqSum (num = 0, list = []) {
    let maxSum = divideAndConquer(list, 0, num - 1);
    console.log(maxSum);
}

function max (a = 0, b = 0, c = 0) {
    return a > b
        ? a > c ? a : c
        : b > c ? b : c;
}

function divideAndConquer (list = [], left = 0, right = 0) {
    // 递归
    if (left >= right) {
        return list[left] < 0 ? 0 : list[left];
    }
    let center = Math.floor((left + right) / 2);
    let maxLeftSum = divideAndConquer(list, left, center);
    let maxRightSum = divideAndConquer(list, center + 1, right);
    let maxLeftBorderSum = 0;
    let maxRightBorderSum = 0;
    let leftBorderSum = 0;
    let rightBorderSum = 0;
    // 向右扫描
    for (let i = center + 1; i <= right; i++) {
        rightBorderSum += list[i];
        if (rightBorderSum > maxRightBorderSum) {
            maxRightBorderSum = rightBorderSum;
        }
    }
    // 向左扫描
    for (let j = center; j >= left; j--) {
        leftBorderSum += list[j];
        if (leftBorderSum > maxLeftBorderSum) {
            maxLeftBorderSum = leftBorderSum;
        }
    }
    // 左边的最大和、右边的最大和、跨边的最大和，三者取最大
    return max(maxLeftSum, maxRightSum, maxLeftBorderSum + maxRightBorderSum);
}
