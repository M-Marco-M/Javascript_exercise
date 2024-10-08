'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Lezione 147: crezione elementi del DOM
//Creazione di una funzione che manipoli il DOM facendo apparire nuoci elementi
//Lezione 164 part 2: applicazione metodo sort
let sorting = true;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovementsReduce(currentAccount.movements, sorting);
  sorting = !sorting;
});

const displayMovementsReduce = function (movements, sort = false) {
  const currentArray = sort
    ? [...movements].sort((a, b) => a - b)
    : [...movements];

  containerMovements.innerHTML = currentArray.reduce((allHtml, mov, index) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    return allHtml.concat(
      `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${index} ${type}</div>
      <div class="movements__value">${mov}€</div>
      </div>`
    );
  }, '');
};

const displayMovements = function (movements, sort = false) {
  const currentArray = sort
    ? [...movements].sort((a, b) => a - b)
    : [...movements];
  //Assegno al codice HTML di containerMovements (il div movements) il valore
  //di stringa vuota, in pratica non più in testo HTML, è vuoto
  containerMovements.innerHTML = '';

  currentArray.forEach((mov, index) => {
    //Se maggiore di 0 è un deposito, minore prelievo
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //insertAdjacentHTML aggiunge del testo HTML nella posizione indicata
    //prima dell'elemento, all'inizio dll'elemento, alla fine dell'elemento
    //dopo l'elemento.
    //Aggiungo un testo HTML che rappresenta una riga del nostro div movements
    //in questo modo si crea una pila in cui l'ultimo movimento apparirà più in alto
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>`;

    //Il testo html in questo caso viene passato come variabile stringa
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//Lezione 152: uso di map e differenza con forEach
//Costruire l'username con le iniziali del nome applicando il metodo map
//e conservarlo come stringa

//Giunti a split avrò un array, quindi potrò applicarne i metodi
//Scriverlo come funzione
//Il valore è RESTITUITO dalle arrow function

//Far si che la funzione funzioni per un array di account
const createUsernames = accs =>
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(word => word[0])
        .join(''))
  );
// createUsernames(accounts);
// console.log(accounts);

const createUsernamesReduce = accs =>
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .reduce((username, word) => username.concat(word[0]), ''))
  );

createUsernamesReduce(accounts);
console.log(accounts);

//Descrizione della funzione: La funzione createUsername
//-1) Prende in ingresso una lista di account
//-2) La cicla con un forEach
//-3) Per ogni account imposta account.username come l'elaborazione che segue
//a partire da account.owner

//----------------IMPORTANTE-----------------------
//N.B. Il metodo forEach non restituisce nulla di per se, esegue delle operazione
//=> produce un "side effect", può operare su variabili globali, ad esempio

//Lezione 153 part2: applicazione metodo reduce
//Scrivere una funzione che dato l'array di movements calcoli e stampi il bilancio

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//Lezione 154 part2: applicazione pipeline
//Utilizzare una pipeline per realizzare una funzione che dato un array in ingresso
//mostri sul DOM le spese totali, i guadagni totali e gli interessi
//Per pura pratica gli interessi vengono calcolati come 1,2% per ogni somma depositata
//purchè l'interesse sul deposito > 1€
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, interest) => acc + interest);
  labelSumInterest.textContent = `${interest}€`;
};

//Funzione che richiama le funzioni che vengono usate più volte (a ogni login e a ogni trasferimento)
const refreshAccountInfo = function (acc) {
  //Display movements
  displayMovementsReduce(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

// N.B.
//In JavaScript è una cattiva abitudine concatenare metodi che modificano l'array originale

//Lezione 159: aggiungere la funzione di login
let currentAccount;

//Bisogna aggiungere una riga con il metodo preventDefault richiamato sull'evento
//Che  fa in modo che il comportamento di default del form non venga messo in atto
//il comportamento di default, in questo caso, è il ricaricamento della pagina
//all'invio del form, cosa che comporta la perdita del dato che volevamo conservare

//Il parametro passato alla funzione è l'evento stesso

//Aggiungere l'event handler al form

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //L'optional chaining operatore previene l'errore nel caso in cui non esistesse
  //l'account col nome indicato
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split()[0]
    }`;
    //Imposta l'opacità dell0'intero container dell'app a 100, quindi lo rende visibile
    containerApp.style.opacity = 100;

    //Imposto il testo delle caselle di input di pin e username a stringa vuota
    //L'assegnazione funziona da destra verso sinistra, quindi prima imposta il pin = ""
    //e poi l'username = a pin (che vale "")
    inputLoginUsername.value = inputLoginPin.value = '';
    //Rimuove il focus da quell'elemento(il cursore non sarà più posizionato li)
    inputLoginPin.blur();

    //Refresh info account
    refreshAccountInfo(currentAccount);
  }
});

//Lezione 160: trasferimento dei soldi
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value); //Sempre convertire in number, poichè arriva una stringa
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    //Optional chaining -> Se receiverAccount non esiste restituisce undefined, che è diverso da current account, quindi da false e non entra nell'if
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    if (amount > 0 && amount < currentAccount.balance) {
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
    } else console.error('ERRORE, INSERIRE UN IMPORTO VALIDO');
  } else console.error('ERRORE, INSERIRE UN UTENTE VALIDO');

  console.log('Trasferimento avvenuto con successo');

  //Refresh info account
  refreshAccountInfo(currentAccount);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
});

//Lezione 161: funzione di chiusura dell'account, metodo findIndex
//findIndex restituisce l'indice del primo elemento che rispetta una determinata condizione
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    // if (
    //   prompt(
    //     "Sicuro di voler eliminare l'account? (Scrivi YES per confermare)"
    //   ) === 'YES'
    // )
    //Eliminazione account
    accounts.splice(accIndex, 1);
    //Sparizione UI
    containerApp.style.opacity = 0;
    //Reset campi
    inputCloseUsername = inputClosePin = '';
  }
});

//Lezione 162: some and every
//Some risponde true se c'è almeno un elemento dell'array che rispetta una determinata condizione

//Si può richiedere un prestito se è presente almeno un deposito che sia almeno il 10% del valore del prestito
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanRequest = Number(inputLoanAmount.value);
  if (
    currentAccount.movements.some(mov => mov >= loanRequest && loanRequest > 0)
  ) {
    currentAccount.movements.push(loanRequest);
    refreshAccountInfo(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();

    console.log('Prestito consentito');
  } else console.log('Prestito rifiutato');
});
//---------------------------------------------------------------//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//Lezione 167: esercizi con gli array

//-1) Calcolare a somma totale dei depositi in banca di tutti gli account
const totalDeposit = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDeposit);

//-2) Calcolare il numero di depositi superiori a 1000
const above1000deposit = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov >= 1000).length;

//Con reduce
const above1000deposit2 = accounts
  .flatMap(account => account.movements)
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);

// L'operatore ++post qui non funziona perchè incrementa effettivamente il valore nella variabile
// ma restituisce il valore originale
// Si può usare l'operatore pre++
console.log(above1000deposit);
console.log(above1000deposit2);

//-3) Creare un nuovo oggetto che contenga sia la somma dei depositi che la somma dei prelievi
const allDepositiPrelievi = accounts
  .flatMap(account => account.movements)
  .reduce(
    (acc, mov) => {
      // mov < 0 ? (acc.prelievi += mov) : (acc.depositi += mov);
      acc[mov < 0 ? 'prelievi' : 'depositi'] += mov;
      return acc;
    },
    {
      prelievi: 0,
      depositi: 0,
    }
  );
console.log(allDepositiPrelievi);

//-4) Convertire "this is a nice title" a "This Is a Nice Title"
const title = 'this is a nice title';
const exeptionWord = ['a', 'but', 'an', 'the', 'on', 'or', 'in', 'with'];
// const stringToTitle = string =>
//   string
//     .split(' ')
//     .map(word =>
//       word.length > 1 ? word[0].toUpperCase().concat(word.slice(1)) : word
//     )
//     .join(' ');

// console.log(stringToTitle(title));

const stringToTitle = stringa =>
  stringa
    .toLowerCase()
    .split(' ')
    .map(word =>
      exeptionWord.includes(word)
        ? word
        : word[0].toUpperCase().concat(word.slice(1))
    )
    .join(' ');
console.log(stringToTitle(title));

//Challenge, ricreare tutte le funzioni dell'app con il metodo reduce

//Lezione 166: riepilogo dei metodi degli array

//Lezione 165: altri modi per creare e riempire array
const array = [1, 2, 3, 4, 5, 6, 7];
console.log(array);

//Questa assegnazione crea un array di lunghezza 7 ma le cui caselle sono vuote
const newArray = new Array(7);
console.log(newArray);

//Per riempirlo si può usare il metodo fill() (il metodo map(), come altri, non funzionano su array vuoti)
//L'array viene riempito di 1
// newArray.fill(1);
// console.log(newArray);

//L'array viene riempito di uno dalla posizione numero 3 alla posizione numero 5
newArray.fill(1, 3, 7);
console.log(newArray);

//Metodo della classe Array .from():
//Genera un array a partire da un iterable (di cui prende la proprietà length) e lo riempie con il return della callback function
//La callback function accetta gli stessi parametri del metodo map()
//In questo caso lo riempie di uno
const arrayFrom = Array.from({ length: 7 }, () => 1);
console.log(arrayFrom);

//Questo metodo può essere usato per riempire un array di una sequenza di numeri
//Crea un array di lunghezza 10 riempito in cui ogni casella ha valore
//del suo indice [i] + 1
const seqArrFrom = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(seqArrFrom);

//Challenge: riempire un array di lunghezza 100 con numeri proveniente da un lancio di dadi (1 - 6)
const oneundredCasualNumber = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(oneundredCasualNumber);

//Challenge personale, creare una nuova variabile che contenga tutti i valori di un oggetto
const myTestObject = {
  stringa: 'stringa',
  numero: 3,
  boolean: true,
  stringa2: 'stringa2',
};
console.log(myTestObject);

const myTestObjectArr = Array.from(Object.values(myTestObject), value => value);
console.log(myTestObjectArr);

//Questo è comunque più diretto
const myTestObjectArrByValue = Object.values(myTestObject);
console.log(myTestObjectArrByValue);

//Usarlo su una nodeList
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  //Usando il destructuring
  const movementUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI2);

  console.log(...document.querySelectorAll('.movements__value'));
});

//Lezione 164 part 1: il metodo sort
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //Metodo degli array

const arrProva = [8, 7, 64, 67, 32, -1, -51, 10];
console.log(arrProva.sort()); //Li ordina come se fossero stringhe, quindi mette prima i negativi e poi in ordine numerico secondo la prima cifra

//Per farlo funzionare con i numeri serve indicare una callback function
//che prenda in ingresso due elementi e specifichi il criterio
//Se la funzione restituisce
//-un numero negativo tiene l'ordine esistente
//-un numero positivo cambia l'ordine

//Ordinamento in ordine crescente
console.log(
  arrProva.sort((a, b) => {
    if (a < b) return -1; //Se a è minore di b mantiene l'ordine
    if (a > b) return 1; //Se a è maggiore di b li inverte
  })
);
//Ordinamento in ordine decrescente
console.log(
  arrProva.sort((a, b) => {
    if (a > b) return -1; //Se a è minore di b mantiene l'ordine
    if (a < b) return 1; //Se a è maggiore di b li inverte
  })
);

//Siccome la funzione valuta solamente se il numero restituito è negativo o positivo
//si può restituire direttamente la differenza tra a e b:
//- se a - b è negativo a < b
//- se a - b è positivo a > b

//Ordine crescente
console.log(arrProva.sort((a, b) => a - b));
//Ordine decrescente
console.log(arrProva.sort((a, b) => b - a));

//Lezione 163 part 1: flat
//Il metodo flat "apre" gli array annidati, restituendo un nuovo array "piatto"
const arr = [1, 2, [3, 4], 5, [6, 7]];
console.log(arr);
console.log(arr.flat());

//Di default flat "scardina" un solo livello: quest'array ha ancora degli array al suo interno
const deepNestedArr = [1, [2, [3, 4]], 5, [6, 7]];
console.log(deepNestedArr.flat());

//Il parametro indicato indica il numero di livelli da aprire
console.log(deepNestedArr.flat(2));

//Lezione 163 part 2: flatMap
//Calcolo del bilancio dtotale della banca
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance);

//In questo caso si può usare il meto flatMap, che prima mappa e poi applica il metodo flat
//Il limite di flatMap è che lavoro su un solo livello

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance2);

//Lezione 162 - b: every metod
//Funziona in modo simili a some, ma restituisce true solo se tutti gli elementi rispettano la condizione

//Passare una funzione per nome come callback function
const deposit = mov => mov > 0;

console.log(
  'Every:',
  [200, 450, -400, 3000, -650, -130, 70, 1300].every(deposit)
);
//Restituisce false poichè alcuni numeri nell'array sono negativi

//Lezione 158: metodo find
//Il metodo find restituisce un singolo valore:
//il primo valore che rispetta la condizione data
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Per cercare il primo prelievo:
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

//Stampare l'oggetto in cui proprietario è uguale a Jessica Davis
const jessicDavisAcc = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(jessicDavisAcc);

//Fare la stessa operazione con un for-of
let jessicaDavisForof = {};
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') jessicaDavisForof = acc;
}
console.log(jessicaDavisForof);
/*
//Lezione 154 part1: concatenazione dei metodi e debug nella pipeline
//Fin quando dei metodi dell'array restituiscono un array possono essere concatenati
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//PIPELINE (Sequenza di istruzioni al termine del quale viene prodotto un risultato semplice e univoco)
//Debug nella pipeline

// const totalDepositUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

//Per controllare i risultati all'interno di una pipeline si può stampare l'array
//passato come parametro a una funzione nella funzione successiva a quella di cui vogliamo controllare l'output
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    mov * eurToUsd;
    console.log(arr);
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUsd);
*/

/*
//Lezione 153 part1: metodo reduce
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Può essere usato per calcolare il bilancio, cioè la somma di tutti i movimenti
//Il primo parametro della funzione in reduce è l'accumulatore
//poi seguono gli altri come per gli altri metodi
//Oltre alla funzione stessa, però, c'è un secondo parametro, che è il valore
//iniziale dell'accumulatore

//Va restituita l'operazione che vogliamo venga ripetuta e accumulata nella variabile

const balance = movements.reduce(function (acc, mov, i, movs) {
  console.log(`Giro ${i}: ${acc}`);
  return acc + mov;
}, 0);
console.log(balance);

//Con ciclo for-of
let balanceForOf = 0;
for (const mov of movements) {
  balanceForOf += mov;
}
console.log(balanceForOf);

//Reduce con arrow function
const balanceArrow = movements.reduce((acc, mov) => acc + mov);
console.log(balanceArrow);

//Usare reduce per calcolare il valore massimo
const maxValue = movements.reduce(
  (acc, mov) => (mov > acc ? (acc = mov) : (acc = acc)),
  mov[0]
);
console.log(maxValue);
*/

//Lezione 152: metodo filter
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

//Il vantaggio di usare i metodi rispetto ai cicli for è quello di poterli concatenare
//uno con l'altro per ottenere un solo risultato finale che può essere direttamente
//stampato o conservato, senza conservare passaggi intermedi in delle variabili

const depositsForOf = [];
for (const mov of movements) {
  if (mov > 0) depositsForOf.push(mov);
}
console.log(depositsForOf);

//Challenge: realizzare un filtro per i prelievi
//Restituisce solo i mov per cui la condizione mov < 0 è valida
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//Questo chiarisce meglio il meccanismo di filter
console.log(movements.filter(mov => 10 > 0));

//N.B. Filter fa un push all'array che poi viene restituito ogni volta che la condizione che noi restituiamo è vero
//(Ricorda che nelle arrow function c'è un return implicito)
//In pratica sostituendo la condizione con dei semplici true o false
//otterremo una copia esatta dell'array o un array vuoto
//Nel caso di true pusherà per ogni elemento, nel caso di false non pusherà mai
*/
/*
//Lezione 151: metodo map
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const usdMovements = movements.map(function (mov) {
  return mov * eurToUsd;
});

//L'array originale non viene modificato
console.log(usdMovements);
console.log(movements);

//Lo stesso risultato si può ottenere anche con altri cicli
const usdMovementsForEach = [];
movements.forEach(function (mov) {
  usdMovementsForEach.push(mov * eurToUsd);
});

//Stesso risultato
console.log(usdMovementsForEach);

//Challenge: sostituisci la funzione del metodo map con un'arrow function
const usdMovementsArrow = movements.map(mov => mov * eurToUsd);
console.log(usdMovementsArrow);

//Creazione di un array con una stringa di descrizione per ogni elemento dell'originale
const movementsDesc = movements.map(
  (mov, i) =>
    `${i + 1}: ${mov > 0 ? 'You deposited' : 'You withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDesc);

//Lezione 150: metodi map, filter e reduce
//Map: simile a forEach, ma dopo aver eseguito la funzione su un elemento
//lo conserva in un array che viene alla fine restituito

//Filter: restituisce un array in cui vengono conservati solo gli elementi che rispettano
//determinati criteri (es: arr[i] > 0)

//Reduce: restituisce un solo valore dall'array, che può essere dato dalla somma dei suoi valori o dalla loro differenza
//o moltiplicazione, ad esempio
*/

// LECTURES
/*
//Lezione 146: ciclo forEach per mappe e set
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//Funziona in maniera del tutto simile agli array. Il primo valore è il valore
//il secondo è la chiave, il terzo la mappa
currencies.forEach(function (value, key, map) {
  console.log(`${value} at ${key}`);
  console.log(map);
});

//Per i set è simile, ma il secondo parametro restituisce di nuovo il valore
//questo perchè i set non hanno chiave o indice

new Set(['USD', 'EUR', 'GBP', 'EUR', 'GBP']).forEach(function (value, _, set) {
  console.log('value', value);
  console.log(set);
  console.log('_', _);
});

//Lezione 145: ciclo forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Con for-of
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

//Con forEach
//Tra parentesi il primo parametro è l'elemento, il secondo l'indice e il terzo l'intero array
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
//Continue e break NON FUNZIONANO nel forEach


/////////////////////////////////////////////////


//Lezione 143: metodi degli array
let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice: funziona in maniera identica al metodo delle stringhe
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
//Mostra l'ultima posizione
console.log(arr.slice(-1));
console.log(arr.slice(2, -2));
console.log(arr.slice()); //Semplicemente restituisce l'array
//Come
console.log([...arr]);

//Utile per assegnare un array copia di un altro perchè bisogna ricordare che
const arr2 = arr;
//arr2 punta ad arr
arr2[0] = 'z';
console.log(arr[0]); //è uguale a z

const arr3 = arr.slice();
arr3[1] = 'z';
console.log('Arr3' + ' ' + arr3);
console.log('Arr' + ' ' + arr);

//Splice
//è diverso dalle stringhe
//Modifica l'array originale

console.log(arr.splice(2));
console.log(arr);

//Array contiene la parte troncata (le prime 2)
let vettore = ['a', 'b', 'c', 'd', 'e', 'f'];
//Rimuove l'ultimo elemento dell'array
vettore.splice(-1);
console.log(vettore);

//Reverse
//Modifica l'array originale
vettore.reverse();
console.log(vettore);

//Concat
console.log(arr.concat(vettore));
//Uguale a
console.log([...arr, ...vettore]);

//Join
console.log(vettore.join(' - '));

//Lezione 144: Metodo "at"

console.log(vettore[0]);
console.log(vettore.at(0));

//Restituire l'ultima cella
console.log(vettore.splice(-1)[0]); //Bisogna prendere il primo valore perchè restituisce un array
console.log(vettore[vettore.length - 1]);

//Con il metodo at
console.log(vettore.at(-1));

//Si può usare anche sulle stringhe
console.log('Albero'.at(-1));

*/
