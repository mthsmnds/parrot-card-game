let cardAmount = 0;
let cardImg = [{element:"assets/bobrossparrot.gif", id: 1},
        {element:"assets/explodyparrot.gif", id: 2},
        {element:"assets/fiestaparrot.gif", id: 3},
        {element:"assets/metalparrot.gif", id: 4},
        {element:"assets/tripletsparrot.gif", id: 5},
        {element:"assets/unicornparrot.gif", id: 6},
        {element:"assets/revertitparrot.gif", id: 7},

]


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
                const cardElement = `
                <div class="card">
                        <div class="front-face face"  onclick=cardSelect(this)>
                                <img src="assets/parrot.png" />
                                <div class="back-face face" >
                                <img src ="${cardImg[i].element}" />
                                </div>
                        </div>                      
                </div>
                `;
                cards.innerHTML += cardElement;
        }
}

function cardSelect(face) {
        //função onClick que define se a carta está selecionada
        face.classList.toggle("front-face-flip");

        console.log(face);

}

