var cardGame = function (CardOne, CardTwo) {
    var P1;
    var P2;
    var lifeUserOne = 100;
    var lifeUserTwo = 100;
    var turno = 0
    var bandera = 0

    while (bandera === 0) {

        P1 = CardOne;
        P2 = CardTwo;



        if (lifeUserOne <= 0 || lifeUserTwo <= 0) {
            if (lifeUserOne > lifeUserTwo) {
                return (
                    CardOne
                );
            } else if (lifeUserTwo > lifeUserOne) {
                return (
                    CardTwo
                );
            } else if (lifeUserOne === lifeUserTwo) {
                return {message:"TIE"};
            }
            bandera = 1
        }


        if (P1.attack > P2.defense) {
            lifeUserTwo = lifeUserTwo - (P1.attack - P2.defense);
            CardOne.restarVida2=lifeUserTwo
        }

        if (P2.attack > P1.defense) {
            lifeUserOne = lifeUserOne - (P2.attack - P1.defense);
            CardTwo.restarVida1=lifeUserOne
        }

        if (bandera === 1) {
            return 0
        }
    }
};

// var CardOne = { attack: 45, defense: 18 }

// var CardTwo = { attack: 40, defense: 15 }


module.exports = cardGame

