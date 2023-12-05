const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    lines = lines.filter(el => el !== '');
    
    const bagConfig = {
        red: 12,
        green: 13,
        blue: 14
    };
    let possibleIdsSum = 0;
    let powerSum = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const gameId = i + 1;
        const trimmedLine = line.split(': ')[1];
        const games = trimmedLine.split('; ');
        let isGamePossible = true;
        const minPossibleCubes = {
            red: 0,
            green: 0,
            blue: 0
        };
        for (const game of games) {
            const cubes = game.split(', ');
            for (const cube of cubes) {
                const details = cube.split(' ');
                const color = details[1];
                const amt = parseInt(details[0]);
                if (bagConfig[color] < amt) {
                    isGamePossible = false;
                }
                if (minPossibleCubes[color] < amt) {
                    minPossibleCubes[color] = amt;
                }
            }
        }
        if (isGamePossible) {
            possibleIdsSum += gameId;
        }
        powerSum += minPossibleCubes.red * minPossibleCubes.green * minPossibleCubes.blue;
    }
    console.log('sum of possible ids:');
    console.log(possibleIdsSum);
    console.log('sum of powers:');
    console.log(powerSum);
});