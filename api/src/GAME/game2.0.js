// let carta1= {
//     name: "octopi",
//       attack: 20,
//       defense: 20,
//       img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso13.png?alt=media&token=2cfce067-415f-4b42-b8bf-0ce667c628a6",
//       state: "activa",
//       type: "legendary",
//       sellCount: 1,
//       sellPrice: 400
//   }  
//   let carta2 = {
//     name: "ouster",
//       attack: 20,
//       defense: 20,
//       img: "https://firebasestorage.googleapis.com/v0/b/proyecto-final-47802.appspot.com/o/recurso3.png?alt=media&token=edfd5c70-c7c6-4c03-8925-67d66cde53fa",
//       state: "activa",
//       type: "legendary",
//       sellCount: 1,
//       sellPrice: 350
//   }

var cardGame = (carta1, carta2) => {
    if (carta1.attack > carta2.defense) {
        const difPower2 = carta1.attack - carta2.defense
        carta1.restarVida2 = difPower2
        return { carta1Win: carta1 }
    }
    else if (carta2.attack > carta1.defense) {
        const difPower1 = carta2.attack - carta1.defense
        carta2.restarVida1 = difPower1
        return { carta2Win: carta2 }
    }
    else if(carta1.attack > carta2.attack) {
        const difPower2 = carta1.attack - carta2.defense
        carta1.restarVida2 = difPower2
        return { carta1Win: carta1 }
    }
    else if(carta2.attack > carta1.attack) {
        const difPower1 = carta2.attack - carta1.defense
        carta2.restarVida1 = difPower1
        return { carta2Win: carta2 }
    }

    else {
        return "empate"
    }
}
//console.log(cardGame(carta1, carta2))