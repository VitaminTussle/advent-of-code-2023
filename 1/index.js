const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    lines = lines.filter(el => el !== '');
    
    const digitRegex = /[0-9]/;
    const numMatch = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    };
    let sum = 0;
    for (const line of lines) {
        let firstDigit = '';
        let indexOfFirst = -1;
        let lastDigit = '';
        let indexOfLast = -1;
        for (let i = 0; i < line.length; i++) {
            if (line[i].match(digitRegex) && !firstDigit) {
                firstDigit = line[i];
                indexOfFirst = i;
            }
            if (line[i].match(digitRegex)) {
                lastDigit = line[i];
                indexOfLast = i;
            }
        }
        Object.keys(numMatch).forEach(key => {
            const firstIndOfMatch = line.indexOf(key);
            const lastIndOfMatch = line.lastIndexOf(key);
            if (firstIndOfMatch < indexOfFirst && firstIndOfMatch !== -1) {
                firstDigit = numMatch[key].toString();
                indexOfFirst = firstIndOfMatch;
            }
            if (lastIndOfMatch > indexOfLast) {
                lastDigit = numMatch[key].toString();
                indexOfLast = lastIndOfMatch;
            }
        })
        const combined = firstDigit + lastDigit;
        sum += parseInt(combined);
    }
    console.log(sum);
});