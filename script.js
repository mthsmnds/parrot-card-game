let cardImg = [
        {element: "assets/bobrossparrot.gif", id: 1},
        {element: "assets/explodyparrot.gif", id: 2},
        {element: "assets/fiestaparrot.gif", id: 3},
        {element: "assets/metalparrot.gif", id: 4},
        {element: "assets/tripletsparrot.gif", id: 5},
        {element: "assets/unicornparrot.gif", id: 6},
        {element: "assets/revertitparrot.gif", id: 7},
    ];
    
    let cardAmount = 0;
    let cardsToShow = [];    
    let selectedCards = [];
    let selectedCardElements = [];
    let plays = 0;
    let lockedCards = [];
    let score = 0;
    let scoreToBeat = 0;
    
    gameStart();
    
    function comparador(){
        return Math.random() - 0.5;
    }
    
    function gameStart(){
        let isEven = false;
    
        while (isEven === false) {
            cardAmount = Number(prompt("Selecione o número de cartas para jogar"));
    
            if (cardAmount >= 4 && cardAmount <= 14 && cardAmount % 2 === 0) {
                alert("Vamos começar!");
                isEven = true;
                cardAmount = cardAmount / 2;
                defineCards();
            } else {
                alert("Número inválido! Selecione um número par entre 4 e 14!");
            }
        }
    }
    
    function defineCards() {
        // Pegar o número de cartas, definir quantas vão ser mostradas e embaralhar as imagens
        const cards = document.querySelector(".cardContainer");
        cardImg.sort(comparador);
    
        for (let i = 0; i < cardAmount; i++) {
            cardsToShow.push(cardImg[i]);
            cardsToShow.push(cardImg[i]);
        }
    
        cardsToShow.sort(comparador);
    
        for (let i = 0; i < cardsToShow.length; i++) {
            const cardElement = `
                <div class="card" onclick="cardSelect(this)">
                    <div class="front-face face">
                        <img src="assets/parrot.png" />
                    </div>                      
                    <div class="back-face face">
                        <img src="${cardsToShow[i].element}" />
                    </div>
                </div>
            `;
            cards.innerHTML += cardElement;
        }
        
        scoreToBeat = cardsToShow.length;
    }
    
    function cardSelect(card) {
        // Função onClick que define se a carta está selecionada
        if (card.classList.contains("locked") || selectedCardElements.includes(card)) {
            return;
        }
    
        const frontFace = card.querySelector(".front-face");
        const backFace = card.querySelector(".back-face");
        
        frontFace.classList.add("front-face-flip");
        backFace.classList.add("back-face-flip");
        card.classList.add("locked");
    
        const getCardID = card.querySelector(".back-face img");
        
        selectedCards.push(getCardID.src);
        selectedCardElements.push(card);
    
        if (selectedCards.length === 2) {
            checkCard();
        }
    }
    
    function checkCard() {
        // Checa se as cartas são par e soma pontos por jogada.
        let firstPick = selectedCards[0];
        let secondPick = selectedCards[1];
        let isMatch = false;
        plays += 2;
    
        if (firstPick === secondPick) {
            isMatch = true;
            setTimeout(disableCards, 800);
        } else {
            setTimeout(unflipCards, 1000);
        }
    
        console.log(firstPick, secondPick);

    }
    
    function disableCards() {
        selectedCardElements[0].classList.add("locked");
        selectedCardElements[1].classList.add("locked");
        score += 2;
        
        finishGame();
        resetSelection();
    }
    
    function unflipCards() {
        selectedCardElements[0].querySelector(".front-face").classList.remove("front-face-flip");
        selectedCardElements[0].querySelector(".back-face").classList.remove("back-face-flip");
        selectedCardElements[0].classList.remove("locked");
        
        selectedCardElements[1].querySelector(".front-face").classList.remove("front-face-flip");
        selectedCardElements[1].querySelector(".back-face").classList.remove("back-face-flip");
        selectedCardElements[1].classList.remove("locked");
        
        finishGame();
        resetSelection();
        
    }
    
    function resetSelection() {
        selectedCards = [];
        selectedCardElements = [];
    }
    
    function finishGame() {
        if (score === scoreToBeat) {
            alert("Fim de jogo! Você fez " + plays + " jogadas");
        }
    }
    