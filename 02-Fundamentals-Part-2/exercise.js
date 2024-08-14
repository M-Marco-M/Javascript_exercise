const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = function (avgDoplhins, avgKoalas) {
    if (avgDoplhins >= 2 * avgKoalas) {
        console.log(`Doplhins win(${avgDoplhins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDoplhins) {
        console.log(`Koalas win(${avgKoalas} vs. ${avgDoplhins})`);
    } else {
        console.log("There's no winner for this time...");
    }
}

const scoreDolphins = calcAverage(1, 3, 5);
const scoreKoalas = calcAverage(2, 4, 6);

console.log("Dolphins: " + scoreDolphins + " Koalas: " + scoreKoalas);

checkWinner(scoreDolphins, scoreKoalas);

//Esercizio 2

// const bill = 301;
// const tip = bill < 50 || bill > 300 ? bill * 0.2 : bill * 0.15;
// console.log(
//     `The bill is ${bill}, the tip is ${tip} and the total is ${bill + tip}`
// );


//Arrow function
const calcTip = bill => bill < 50 || bill > 300 ? bill * 0.2 : bill * 0.15;

console.log(calcTip(100));

const bills = [10, 50, 100, 300, 350, 500];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]), calcTip(bills[3]), calcTip(bills[4]), calcTip(bills[5])];

console.log(tips);

const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2], bills[3] + tips[3], bills[4] + tips[4], bills[5] + tips[5]];

console.log(totals);