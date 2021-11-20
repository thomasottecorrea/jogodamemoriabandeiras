const front = "card_front"
const back = "card_back"
const CARD = "card"
const ICON = "icon"

let gameover = document.querySelector(".gameover");

startgame()

function startgame() {
        initializecards(game.createcardsfromflags());
    }


function initializecards(cards){

    let gameboard = document.getElementById("gameboard")
    gameboard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;


        createcardcontent(card, cardElement)

        cardElement.addEventListener('click', flipcard)
        gameboard.appendChild(cardElement)
    })

    }


function createcardcontent(card, cardElement){

    createcardface(front, card, cardElement)
    createcardface(back, card, cardElement)

}

function createcardface(face, card, element){

    let cardelementface = document.createElement('div');
    cardelementface.classList.add(face);

    if(face === front){
        let iconelement = document.createElement('img');
        iconelement.classList.add(ICON);
        iconelement.src = "./assets/" + card.icon + ".png";
        cardelementface.appendChild(iconelement);

    }else{
        cardelementface.innerHTML = "&lt/&gt";

    }
    element.appendChild(cardelementface);
}


function flipcard(){
    if (game.setCard(this.id)){ 

    this.classList.add("flip")
  
    if(game.secondCard){
        if(game.checkMatch()){
            game.clearCards();
            if(game.checkGameover()){
                /* let gameoverlayer = document.getElementById("gameover"); */
                gameover.style.display = "flex";
                
    }
    }else{
        setTimeout(()=>{
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();
        
        }, 700);

            };
        }
    }
}
function restart(){
    game.clearCards();
    startgame();
    gameover.style.display = 'none';

}