document.addEventListener('DOMContentLoaded', function(){

//Każdy gracz dostaje swoją klasę

var playerClasses = {
'playerA':'red',
'playerB':'blue' 
};

var currentPlayer;

//Liczba pozostałych pól

var emptyFields;

function initGame(){

emptyFields = 9;

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

//Zmniejszamy liczbę wolnych pól
emptyFields--;

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



checkWinner();
}

function checkWinner(){


//Zbiera dane o wszystkich polach
var fields = document.querySelectorAll('.board > div');

	 /*
Idea kółka i krzyżyka - przypisane numery pól      
            +---+---+---+
            | 0 | 1 | 2 |
            +---+---+---+
            | 3 | 4 | 5 |
            +---+---+---+
            | 6 | 7 | 8 |
            +---+---+---+
          */

//Warianty wygranych w poziomie (012,345,678)
var row1 = fields[0].className + fields[1].className + fields[2].className;
var row2 = fields[3].className + fields[4].className + fields[5].className;
var row3 = fields[6].className + fields[7].className + fields[8].className;

//Warianty wygranych w pionie (036,147,258)
var column1 = fields[0].className + fields[3].className + fields[6].className;
var column2 = fields[1].className + fields[4].className + fields[7].className;
var column3 = fields[2].className + fields[5].className + fields[8].className;

//Warianty wygranych na skos (048 i 246)

var diagonal1 = fields[0].className + fields[4].className + fields[8].className;
var diagonal2 = fields[2].className + fields[4].className + fields[6].className;

var boardChek = [
row1,
row2,
row3,
column1,
column2,
column3,
diagonal1,
diagonal2
];

if (row1 === 'redredred' ||
row2 === 'redredred' ||
row3 === 'redredred' ||
column1 === 'redredred' ||
column2 === 'redredred' ||
column3 === 'redredred' ||
diagonal1 === 'redredred' ||
diagonal2 === 'redredred'
)
{
alert('Red Wins!');
}

if (emptyFields === 0){
alert('Nie ma już wolnych pól.');
return;
}


if (row1 === 'blueblueblue' ||
row2 === 'blueblueblue' ||
row3 === 'blueblueblue' ||
column1 === 'blueblueblue' ||
column2 === 'blueblueblue' ||
column3 === 'blueblueblue' ||
diagonal1 === 'blueblueblue' ||
diagonal2 === 'blueblueblue'
)
{
alert('Blue Wins!');
return;
}
}

//Start gry

initGame();

}
);





