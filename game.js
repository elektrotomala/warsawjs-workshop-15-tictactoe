document.addEventListener('DOMContentLoaded', function(){

//Każdy gracz dostaje swoją klasę

var playerClasses = {
'playerA':'red',
'playerB':'blue' 
};

var currentPlayer;

function initGame(){

//Znajduje wszystkie divy klasy board
var fields = document.querySelectorAll('.board > div');

//Ustawiamy gracza na A
currentPlayer = 'playerA';

//Dla diva dodaje funkcję po kliknięciu
fields.forEach(field => field.addEventListener('click',fieldClickHandler));
}

function fieldClickHandler(){

var playerClass = playerClasses[currentPlayer];
this.classList.add(playerClass);

// Zapis if - tego, co niżej - w inny sposób
//currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';

if(currentPlayer === 'playerA'){
currentPlayer = 'playerB';
}
else {
currentPlayer = 'playerA';
}

//usunięcie możliwości zmiany koloru po kliknięciu

this.removeEventListener('click',fieldClickHandler); 

//console.log("Hello",this);
//this.classList.add('red');
}

//Start gry

initGame();

}
);





