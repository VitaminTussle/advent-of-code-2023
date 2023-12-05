const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.split('\n');
    lines = lines.filter(el => el !== '');
    
    // part 1
    let sum = 0;
    for (const line of lines) {
        const nums = line.split(': ')[1].split(' | ');
        const winNums = nums[0].split(' ').filter(num => !!num).map(num => parseInt(num));
        const myNums = nums[1].split(' ').filter(num => !!num).map(num => parseInt(num));
        let points = -1;
        for (const num of myNums) {
            if (winNums.includes(num)) {
                points++;
            }
        }
        if (points > -1) {
            sum += Math.pow(2, points);
        }
    }

    console.log('sum of points:');
    console.log(sum);

    // part 2
    const cards = {};
    for (const line of lines) {
        const details = line.split(': ');
        const firstPart = details[0].split(' ');
        const cardId = firstPart[firstPart.length - 1];
        cards[cardId] = cards[cardId] ?? { copies: 1 };
        const card = cards[cardId];
        if (!card.winNums && !card.myNums && !card.matches) {
            const nums = details[1].split(' | ');
            const winNums = nums[0].split(' ').filter(num => !!num).map(num => parseInt(num));
            const myNums = nums[1].split(' ').filter(num => !!num).map(num => parseInt(num));
            let matches = 0;
            for (const num of myNums) {
                if (winNums.includes(num)) {
                    matches++;
                }
            }
            card.winNums = winNums;
            card.myNums = myNums;
            card.matches = matches
        }
        const cardIdNum = parseInt(cardId);
        for (let i = cardIdNum + 1; i <= cardIdNum + card.matches; i++) {
            const num = i.toString();
            cards[num] = cards[num] ?? { copies: 1 };
            cards[num].copies += card.copies;
        }
    }
    let copiesSum = 0;
    for (const card of Object.values(cards)) {
        copiesSum += card.copies;
    }
    console.log('sum of copies of cards:');
    console.log(copiesSum);
});