document.addEventListener('DOMContentLoaded', function () {

    //Będziemy zbierać statystyki
    var liczbaKlikniec = 0;
    var numerRundy = 1;
    var statsy = ' jeszcze niezbadaną liczbę ';

    function funkcjaStatsy() {
        if (statsy === ' jeszcze niezbadaną liczbę ') {
            return ' jeszcze niezbadaną liczbę ';
        }

        //return statsy.toFixed(2);

        return Math.round(statsy);

    }


    //Każdy gracz dostaje swoją klasę

    var playerClasses = {
        'playerA': 'red',
        'playerB': 'blue'
    };

    var currentPlayer;

    //Liczba pozostałych pól

    var emptyFields;
    initGame();

    function czyjaRunda() {
        var round = document.getElementById('czyjaRunda');
        
        //Zmiana koloru
        round.className = playerClasses[currentPlayer];
        
        round.innerHTML = `Teraz ruch gracza: ${currentPlayer}`;

        
    }


    function initGame() {

        emptyFields = 9;

        //Znajduje wszystkie divy klasy board
        var fields = document.querySelectorAll('.board > div');
        document.getElementById('czyjaRunda').innerHTML = 'Rozpocznij grę';
        document.getElementById('czyjaRunda').className = 'liliowe';

        //Ustawiamy gracza na A
        currentPlayer = 'playerA';

        //Dla diva dodaje funkcję po kliknięciu
        fields.forEach(field => field.addEventListener('click', fieldClickHandler));
        fields.forEach(field => field.removeAttribute('class'));
        document.getElementById('ktoraRunda').innerHTML = 'Runda numer ' + numerRundy;
        }




    function fieldClickHandler() {

        

        var playerClass = playerClasses[currentPlayer];
        this.classList.add(playerClass);

        //Zmniejszamy liczbę wolnych pól
        emptyFields--;

        // Zapis if - tego, co niżej - w "skrócony zapis if"
        //currentPlayer = currentPlayer === 'playerA' ? 'playerB' : 'playerA';

        if (currentPlayer === 'playerA') {

            document.getElementById('czyjaRunda').innerHTML = 'Teraz ruch playerA';
            currentPlayer = 'playerB';
        } else {
            document.getElementById('czyjaRunda').innerHTML = 'Teraz ruch playerB';
            currentPlayer = 'playerA';
        }

        czyjaRunda();
        
        //Zwiększamy statystykę kliknięć
        liczbaKlikniec++;

        //usunięcie możliwości zmiany koloru po kliknięciu
        this.removeEventListener('click', fieldClickHandler);

        console.log('Numer klikniecia: ' + liczbaKlikniec);

        checkWinner();
    }

    function checkWinner() {

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

        console.log('Liczba kliknięć i numer rundy: ' + liczbaKlikniec, numerRundy);

        if (boardChek.includes('redredred')) {

            //Arrow function =>

            setTimeout(() => {
                alert('Red Wins!');
                numerRundy++;
                statsy = liczbaKlikniec / (numerRundy - 1);
                initGame();
            }, 100);

        }

        if (boardChek.includes('blueblueblue')) {

            setTimeout(() => {
                alert('Blue Wins!');
                numerRundy++;
                statsy = liczbaKlikniec / (numerRundy - 1);
                initGame();
            }, 100);

        }

        if (emptyFields === 0) {

            setTimeout(() => {


                alert('Nie ma już wolnych pól.');
                numerRundy++;
                statsy = liczbaKlikniec / (numerRundy - 1);
                initGame();
            }, 100);

        }



        console.log('Średnia liczba kliknięć na rundę: ' + statsy);



        document.getElementById('ktoraRunda').innerHTML = 'Runda numer ' + numerRundy + '. W jednej rundzie oddano średnio ' + funkcjaStatsy() + ' kliknięć.';

    }


});