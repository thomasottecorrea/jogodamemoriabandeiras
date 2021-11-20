let game = {

    lockMode : false,
    firstCard : null,
    secondCard: null,

    flags : ['brasil','egito','indonesia','iraque','italia','mexico','paisesbaixos','paraguai','polonia','siria'],


    cards : null,

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },
  
    checkMatch: function(){
        if (!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameover: function(){

       return this.cards.filter(card => !card.flipped).length == 0;

    },

    
    createcardsfromflags: function() {

        this.cards = []

        this.flags.forEach(flag => {
            
            this.cards.push(this.createpairfromflag(flag))
        }) ;
        this.cards = this.cards.flatMap(pair => pair)
        this.shufflecards()
        return this.cards
    },



    createpairfromflag : function (flag){

        return[{
            id: this.createidwithflag(flag),
            icon: flag,
            flipped: false

        }, {
            id: this.createidwithflag(flag),
            icon: flag,
            flipped: false

        }]
},

    createidwithflag : function (flag){
        return flag + parseInt(Math.random() * 1000)
},
    shufflecards: function(cards){
    let currentindex = this.cards.length;
    let randomindex = 0;

    while(currentindex !== 0){

        randomindex = Math.floor(Math.random() * currentindex);
        currentindex--;

        [this.cards[randomindex],this.cards[currentindex]] = [this.cards[currentindex],this.cards[randomindex]]
    }


    }
}
