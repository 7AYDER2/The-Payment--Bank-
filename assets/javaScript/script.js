 'use strict';

const account1= {
    owner:'HAYDER MOHAMMED',
    movements:[200,450,-400,3000,-650,-130,70,1300],
    interestRate:1.2,
    pin:1111,
};

 const account2= {
     owner:'AHMED MOHAMMED',
     movements:[5000,3400,-150,-790,-3210,-1000,8500,-30],
     interestRate:1.5,
     pin:2222,
 };

 const account3= {
     owner:'ALI MOON',
     movements:[200,-200,340,-300,-20,50,400,-460],
     interestRate:0.7,
     pin:3333,
 };

 const account4= {
     owner:'Sarah Smith',
     movements:[430,1000,700,50,90],
     interestRate:1,
     pin:4444,
 };

 const accounts = [account1,account2,account3,account4];
 const movements = [200,450,-400,3000,-650,-130,70,1300]
 // Elements
 const labelWelcome = document.querySelector('.welcome');
 const labelDate = document.querySelector('.date');
 const labelBalance = document.querySelector('.balance__value');
 const labelSumIn = document.querySelector('.summary__value--in');
 const labelSumOut = document.querySelector('.summary__value--out');
 const labelSumInter = document.querySelector('.summary__value--interest');
 const labelTimer =document.querySelector('.timer');
 const containerApp = document.querySelector('.app');
 const containerMovements = document.querySelector('.movements');
 const btnLogin = document.querySelector('.login_btn');
 const btnTransfer = document.querySelector('.form__btn--transfer');
 const btnLoan = document.querySelector('.from__btn--loan');
 const btnClose = document.querySelector('.from__btn--close');
 const btnSort = document.querySelector('.btn--sort');
 const inputLoginUsername =document.querySelector('.login_input--user');
 const inputLoginPin = document.querySelector('.login_input--pin');
 const inputTransferTo = document.querySelector('.form__input--to');
 const inputTransferAmount = document.querySelector('.form__input--amount');
 const inputLoanAmount = document.querySelector('.form__input--loan-amount');
 const inputCloseUsername =document.querySelector('.form__input--user');
 const inputClosePin = document.querySelector('.form__input--pin');


 const displayMovements =function (movements,sort = false) {
      containerMovements.innerHTML = '';

      const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

     movs.forEach(function (mov,i){
           const type = mov > 0 ?'deposit':'withdrawal'
           const html =`
           <div class="movements__row">
                    <div class="movements__type movements__type--${type}">${i+1}${type}</div>
                    <div class="movements__value">${mov}€</div>
                </div>
           `;

       containerMovements.insertAdjacentHTML('afterbegin',html)

   });
  }


 const calcDisplayBalance = function (acc){
     acc.Balance = movements.reduce((acc,mov) =>acc+mov,0)
     labelBalance.textContent = `${acc.Balance}€`
 }


 const calcDisplaySummary = function (acc){

     const incomes = acc.movements
         .filter(mov=>mov>0)
         .reduce((acc,mov)=>acc+mov);
     labelSumIn.textContent = `${incomes}€`;

     const outcomes = acc.movements
         .filter((mov)=>mov<0)
         .reduce((acc,mov)=>acc+mov);
     labelSumOut.textContent=`${Math.abs(outcomes)}€`;

     const interest = acc.movements
         .filter(mov=>mov>0)
         .map(deposite => deposite * acc.interestRate/100)
         .filter(int=>int>=1)
         .reduce((acc,int)=>acc+int);//int==>interest
     labelSumInter.textContent =`${interest}€`
 }


 const createUserNames = function(accs) {
     accs.forEach(function (acc){
       acc.username = acc.owner
             .toUpperCase()
             .split(' ')
             .map(name=> name[0])
             .join('');
     })
 }
 createUserNames(accounts)

 const updateUI = function (acc){
     //Display Movement
     displayMovements(acc.movements)
     //Display balance
     calcDisplayBalance(acc)
     // DisplaySummary
     calcDisplaySummary(acc);
 }

 let currrentAccount;
 // Event handler
 btnLogin.addEventListener('click',function (e){
     e.preventDefault();
     currrentAccount = accounts.find(acc=> acc.username === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value))

          labelWelcome.textContent = `Welcome back, ${currrentAccount.owner.split(' ')[0]}`;
          containerApp.style.opacity = 100;

          // clear input filed
          inputLoginUsername.value = inputLoginPin.value = '';
          inputLoginPin.blur();

        updateUI(currrentAccount);

 })


 // Event for transfer button
 btnTransfer.addEventListener('click',function (event){
    event.preventDefault();
  const amount =  Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc=>
      acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ''

  if(amount > 0 && receiverAcc && currrentAccount.Balance >= amount &&
   receiverAcc?.username !== currrentAccount.username){
      // Doing the transform condition
      currrentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount)

      //update UI
      updateUI(currrentAccount);
  }
})

 // BUTTON LOan
 btnLoan.addEventListener('click',function (event){
     event.preventDefault();

     const amount = Number(inputLoanAmount.value);

     if(amount>0 && currrentAccount.movements.some(acc=>
         acc >= amount * 0.1))
     {
       //Add movement
         currrentAccount.movements.push(amount);
         //update UI
         updateUI(currrentAccount);
     }

     inputLoanAmount.value = ''
 })

 // Event to colse account
 btnClose.addEventListener('click',function (event){
     event.preventDefault();

     if(currrentAccount.username == inputCloseUsername.value && currrentAccount.pin == inputClosePin.value) {
         const index = accounts.findIndex(acc=>acc.username === currrentAccount.username);

         //Delet account
         accounts.splice(index,1);

         //Hide UI
         containerApp.style.opacity = 0;
     }
     inputCloseUsername.value = inputClosePin.value = '';
 })

 let sorted = false;
 btnSort.addEventListener('click',function (e){
    e.preventDefault();
    displayMovements(currrentAccount.movements,!sorted)
     sorted =!sorted;
 })






















