
// Patron Modulo
const miModulo = (() => {
    'use strict'

    // Baraja
    let deck = [];
    let puntosJugadores = [];
    
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    
    // Referencias al HTML.
    const btnGetCard = document.querySelector('#btnGetCard'),
          btnNewGame = document.querySelector('#btnNewGame'),
          btnStop = document.querySelector('#btnStop');
    
    const score = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    // Esta funcion Inicia el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);   
        }

        
        //! Borras los puntajes de los jugadores
        score.forEach(elemt => { elemt.innerText = 0; });


        //!Borrar el contenedor de las imagens
        divCartasJugadores.forEach(elemt => { elemt.innerHTML = "" });


        //! habilitamos los botones de nueva carta y detener 
        btnStop.disabled = false;
        btnGetCard.disabled = false;
    }

          

    // Esta funcion me Crea el deck(La baraja y la barajea(Desordena el array)).
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck); //! Esto es un metodo de la libreria de underscore
    }


    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
        
    }

    // Esta funcion Me dice Cuanto vale la carta.
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }


    // Turno 0 = primer jugador y el ultimo sera computadora.
    const acumularPuntos = (turno, carta )  => {
        puntosJugadores[turno] += valorCarta(carta);
        score[turno].innerText = puntosJugadores[turno]; 
        return puntosJugadores[turno];
    }


    // Esta Funcion inserta las imagenes de las cartas en el HTML
    const crearCarta = (carta , turno) => {
        let imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        divCartasJugadores[turno].append(imgCarta);
    }

    // Esta funcion define que gana.
    const ganador = () => {

        const [puntosminimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosminimos === puntosComputadora) {
                alert('Nadien gana');
            } else if (puntosminimos > 21) {
                alert('Gano la computadora');

            } else if (puntosComputadora > 21) {
                alert('Ganaste');

            } else {
                alert('Gana la computadora');

            }

        }, 10);
    }

    // Evento para la logica de la computadora.
    const turnoComputadora = (puntosminimos) => {

        // El parametro que resive esta funcion no es mas que los puntos que lleva el juegador.
        const turnoCompu = puntosJugadores.length - 1;
        let puntosComputadora = 0;


        //Este doWhile es como las inteligensia artifical de la computadora 
        do {
            //! Obtenemos un carta de la baraja 
            const carta = pedirCarta();

            //! Mostar el puntaje de compu... 
            puntosComputadora = acumularPuntos(turnoCompu, carta);

            //! Insertar las imagenes en el HTML.
            crearCarta(carta, turnoCompu);


            if (puntosminimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosminimos) && (puntosminimos <= 21)); //! Esta es la logica para que la compu.. gane


        ganador();



    }



    // Este Evento le las cartas al user y i valida su pierde.
    btnGetCard.addEventListener('click', () => {

        //! Obtenemos una carta de la baraja.
        const carta = pedirCarta();

        //! Mostarmos el puntaje del usuario en el HTML
        const puntosJugador = acumularPuntos(0, carta)
        
        //! Insertamos la imagen en el HTML. 
        crearCarta(carta, 0);

        
        //! Validamos si el jugador perdio o gano 
        if (puntosJugador > 21) {
            console.warn('Lo siento has perdido');
            btnGetCard.disabled = true;
            btnStop.disabled = true;


            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21 ¡Ganaste!');
            btnGetCard.disabled = true;
            btnStop.disabled = true;

            turnoComputadora(puntosJugador);

        }

    });


    // Este evento ya no le da mas cartas al user y le da el turno ala computadora.
    btnStop.addEventListener('click', () => {

        btnStop.disabled = true;
        btnGetCard.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });


    // Este Evento me reiniza el juego
    btnNewGame.addEventListener('click', () => {

        //! Limpiamos consola
        console.clear();
        // Inicializar el juego
        inicializarJuego();

    });
    
    return {
        inicarJuego : inicializarJuego
    }
})();




















