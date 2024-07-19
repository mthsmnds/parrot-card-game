let cardImg = [{element:"assets/bobrossparrot.gif", id: 1},
        {element:"assets/explodyparrot.gif", id: 2},
        {element:"assets/fiestaparrot.gif", id: 3},
        {element:"assets/metalparrot.gif", id: 4},
        {element:"assets/tripletsparrot.gif", id: 5},
        {element:"assets/unicornparrot.gif", id: 6},
        {element:"assets/revertitparrot.gif", id: 7},
];

let cardAmount = 0;
let cardsToShow = [];    
let selectedCards = [];
let score = 0;
let lockedCards = []


gameStart();


function comparador(){
        return Math.random() - 0.5;
}

function gameStart(){
        
        let isEven = false;

while (isEven == false) {

        cardAmount = Number(prompt("Selecione o número de cartas para jogar"));

        if (cardAmount >= 4 && cardAmount <= 14 && cardAmount % 2 === 0) {
                alert("Vamos começar!");
                isEven = true;
                cardAmount = cardAmount/2;
                defineCards();
        }
        else {
                alert("Número inválido! Selecione um número par entre 4 e 14!");
        }
}
}


function defineCards() {
        //pegar o número de cartas, definir quantas vão ser mostradas e embaralhar as imagens

        const cards = document.querySelector(".cardContainer");
        cardImg.sort(comparador);
     

        for(let i = 0; i < cardAmount; i++){
                cardsToShow.push(cardImg[i]);
                cardsToShow.push(cardImg[i]);
        }

        cardsToShow.sort(comparador);

        for(let i = 0; i < cardsToShow.length; i++){
                const cardElement = `
                 <div class="card" onclick=cardSelect(this)>
                         <div class="front-face face"  >
                                 <img src="assets/parrot.png" />
                                 </div>                      
                        <div class="back-face face" >
                                 <img src ="${cardsToShow[i].element}" />
                        </div>
                 </div>
                 `;
                 cards.innerHTML += cardElement;
        }
        // console.log(cardsToShow);

}

function cardSelect(card) {
        //função onClick que define se a carta está selecionada
        const frontFace = card.querySelector(".front-face");
        const backFace = card.querySelector(".back-face");
        
        frontFace.classList.add("front-face-flip");
        backFace.classList.add("back-face-flip");
        
        const getCardID = card.querySelector(".back-face img");

        selectedCards.push(getCardID.src);

        if(selectedCards.length == 2){
                checkCard();
        }
        
        // console.log(selectedCards);

        function checkCard(){
        //checa se as cartas são par e soma pontos por jogada.
                
                let firstPick = selectedCards[0];
                let secondPick = selectedCards[1];
                let isMatch = false;
                score += 2;


                if(firstPick === secondPick ){
                        isMatch = true;
                        setTimeout(disableCards, 800);
                }
                else{
                        selectedCards = [];
                        setTimeout(unflipCards, 1000);
                }
                
                console.log(firstPick, secondPick);
                
                finishGame();
        }
        
        function disableCards(){
                card.classList.add("locked");
                lockedCards.push(firstPick, secondPick);
                selectedCards = [];
                firstPick =[];
                secondPick =[];
                isMatch = false;
        }

        function unflipCards(){
                frontFace.classList.remove("front-face-flip");
                backFace.classList.remove("back-face-flip");
        }

        
}

function finishGame(){
        if(lockedCards.length == cardsToShow.length){
                alert("Fim de jogo! Você fez " + score + "jogadas");
        }
}
