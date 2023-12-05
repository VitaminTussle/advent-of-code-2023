const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    lines = lines.filter(el => el !== '');
    
    const part1 = () => {
        const seeds = lines[0].split(' ').filter(str => !!str && str !== 'seeds:').map(seed => ({ type: 'seed', num: parseInt(seed) }));
        const mapEntries = [];
        const digitRegex = /[0-9]/;
        let srcType = '';
        let dstType = '';
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            else if (!digitRegex.test(line[0])) {
                const hyphenated = line.split(' ')[0].split('-');
                srcType = hyphenated[0];
                dstType = hyphenated[2];
            } else {
                const nums = line.split(' ').map(num => parseInt(num));
                mapEntries.push({
                    srcType,
                    dstType,
                    srcStart: nums[1],
                    dstStart: nums[0],
                    length: nums[2]
                });
            }
        }
        for (const seed of seeds) {
            while (seed.type !== 'location') {
                const maps = mapEntries.filter(m => m.srcType === seed.type);
                const applicable = maps.filter(m => m.srcStart <= seed.num && m.srcStart + m.length > seed.num);
                seed.type = maps[0].dstType;
                if (applicable[0]) {
                    const diff = seed.num - applicable[0].srcStart;
                    seed.num = applicable[0].dstStart + diff;
                }
            }
        }
        let lowest = Number.POSITIVE_INFINITY;
        for (const seed of seeds) {
            if (seed.num < lowest) {
                lowest = seed.num;
            }
        }
        console.log('lowest location num:');
        console.log(lowest);
    }

    const part2 = () => {
        const seedSetup = lines[0].split(' ').filter(str => !!str && str !== 'seeds:').map(seed => parseInt(seed));
        const seedRanges = [];
        for (let i = 0; i < seedSetup.length; i += 2) {
            seedRanges.push({ start: seedSetup[i], length: seedSetup[i + 1] });
        }
        const mapEntries = [];
        const digitRegex = /[0-9]/;
        let srcType = '';
        let dstType = '';
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            else if (!digitRegex.test(line[0])) {
                const hyphenated = line.split(' ')[0].split('-');
                srcType = hyphenated[0];
                dstType = hyphenated[2];
            } else {
                const nums = line.split(' ').map(num => parseInt(num));
                mapEntries.push({
                    srcType,
                    dstType,
                    srcStart: nums[1],
                    dstStart: nums[0],
                    length: nums[2]
                });
            }
        }
        let locNum = 0;
        let foundSeed = false;
        while (!foundSeed) {
            // progress tracker
            if (locNum % 100000 === 0) {
                console.log(locNum);
            }
            const seed = { type: 'location', num: locNum };
            while (seed.type !== 'seed') {
                const maps = mapEntries.filter(m => m.dstType === seed.type);
                const applicable = maps.filter(m => m.dstStart <= seed.num && m.dstStart + m.length > seed.num);
                seed.type = maps[0].srcType;
                if (applicable[0]) {
                    const diff = seed.num - applicable[0].dstStart;
                    seed.num = applicable[0].srcStart + diff;
                }
            }
            for (const rng of seedRanges) {
                if (seed.num >= rng.start && seed.num < rng.start + rng.length) {
                    foundSeed = true;
                    break;
                }
            }
            if (!foundSeed) {
                locNum++;
            }
        }
        console.log('lowest location num pt 2:');
        console.log(locNum);
    };

    part1();
    part2();
});