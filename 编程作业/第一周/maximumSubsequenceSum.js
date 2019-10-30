/*
* 给一个序列，输出最大子列和，及最大子列的第一个数和最后一个数
* 如果最大子列不是唯一的，输出索引i和j最小的那个子序列
* 如果序列里的每个值都是负数，则他的最大子列和默认为0，并且应该输出整个序列的第一个和最后一个数字
*
* Input
* 10
* -10 1 2 3 4 -5 -23 3 7 -21
* Output
* 10 1 4
*
* */

process.stdin.setEncoding('utf8');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lineNum = 2;
const rows = [];

rl.on('line', (input) => {
    if (input) {
        rows.push(input.trim());
        if (rows.length >= lineNum) {
            rl.input.emit('end');
        }
    }
});

rl.input.on('end', () => {
    let num = +rows[0];
    let list = rows[1].split(' ').map((value) => {
        return +value;
    })
    if (list.length !== num) {
        console.log('输入的序列长度不正确');
        return;
    }
    maxSubseqSum(num, list);
});

function maxSubseqSum (num = 0, list = []) {
    let maxSum = 0;
    let sum = 0;
    let maxFirst = 0;
    let maxLast = 0;
    let negativeNum = 0;
    let fIndex = 0;
    let maxFIndex = 0;
    let maxLIndex = 0;

    for (let i = 0; i < list.length; i++) {
        sum += list[i];
        // if (sum > maxSum) {
        //     maxSum = sum;
        //     maxFIndex = fIndex;
        //     maxLIndex = i;
        // }
        if (sum >= maxSum) {
            if (sum > maxSum) {
                maxSum = sum;
                maxFIndex = fIndex;
                maxLIndex = i;
            } else {
                if (fIndex === maxFIndex) {
                    maxLIndex = i;
                }
            }
        }
        if (sum < 0) {
            sum = 0;
            fIndex = i + 1;
        }
        if (list[i] <= 0) {
            negativeNum++;
        }
    }
    if (negativeNum > list.length) {
        maxSum = 0;
        maxFIndex = 0;
        maxLIndex = list.length - 1;
    }
    maxFirst = list[maxFIndex];
    maxLast = list[maxLIndex];
    console.log(maxSum, maxFirst, maxLast);
}
