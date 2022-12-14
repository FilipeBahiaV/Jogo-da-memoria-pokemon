let game = {


    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id){
        let card = this.cards.filter(card =>card.id===id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },
    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },


     pokemons : [
        'bulbasaur',
        'caterpie',
        'charizard',
        'charmander',
        'Eevee',
        'haunter',
        'mew',
        'pikachu',
        'squirtle',
        'totodile',
    ],

    cards: null,


    createCardsFromPokemons: function(){
        this.cards = [];
    
        for(let pokemon of this.pokemons){
            this.cards.push(this.createPairFromPokemon(pokemon));
        }
    
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        
    },

    createPairFromPokemon: function(pokemon){
        return[{
            id: this.createIdWithPokemon(pokemon),
            icon: pokemon,
            flipped: false,
        },{
            id: this.createIdWithPokemon(pokemon),
            icon: pokemon,
            flipped: false,
        }]
    },

    
    createIdWithPokemon: function(pokemon){
        return pokemon + parseInt(Math.random() *1000);
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        
         while(currentIndex !== 0){
             randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
             [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
         }
    },

    checkGameOver(){
       return this.cards.filter(card=>!card.flipped).length == 0;
    },
}

