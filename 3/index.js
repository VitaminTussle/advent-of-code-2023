const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    lines = lines.filter(el => el !== '');
    
    const partNumbers = [];
    const symbolLocs = [];
    const digitRegex = /[0-9]/;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let buildNum = '';
        let numLoc = -1;
        for (let j = 0; j < line.length; j++) {
            const c = line[j];
            if (digitRegex.test(c)) {
                buildNum += c;
                if (numLoc === -1) {
                    numLoc = j;
                }
            } else {
                if (buildNum) {
                    partNumbers.push({
                        num: buildNum,
                        loc: [i, numLoc]
                    });
                    buildNum = '';
                    numLoc = -1;
                }
                if (c !== '.') {
                    const possibleGear = c === '*'
                    symbolLocs.push({
                        isGear: possibleGear,
                        adj: [],
                        loc: [i, j]
                    });
                }
            }
        }
        if (buildNum) {
            partNumbers.push({
                num: buildNum,
                loc: [i, numLoc]
            });
        }
    }

    let partNumsSum = 0;
    for (const part of partNumbers) {
        for (const symbol of symbolLocs) {
            const loc = symbol.loc;
            if (
                (loc[0] === part.loc[0] && (loc[1] === part.loc[1] - 1 || loc[1] === part.loc[1] + part.num.length)) ||
                (loc[0] === part.loc[0] - 1 && loc[1] >= part.loc[1] - 1 && loc[1] <= part.loc[1] + part.num.length) ||
                (loc[0] === part.loc[0] + 1 && loc[1] >= part.loc[1] - 1 && loc[1] <= part.loc[1] + part.num.length)
            ) {
                partNumsSum += parseInt(part.num);
                symbol.adj.push(part.num);
            }
        }
    }

    let gearRatioSum = 0;
    for (const symbol of symbolLocs) {
        if (symbol.isGear && symbol.adj.length === 2) {
            gearRatioSum += symbol.adj[0] * symbol.adj[1];
        }
    }

    console.log('part nums sum:');
    console.log(partNumsSum);
    console.log('gear ratio sum:');
    console.log(gearRatioSum);
});