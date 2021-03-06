class Quiz {
    constructor(){}
    
    getState(){
        var gameStateRef = data.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }

    update(state){
        data.ref("/").update({
            gameState: state
        })
    }

    async start() {
        if(gameState===0) {
            contestant = new Contestant();
            var contestantCountRef = await database.ref("contestantCount").once("value");
            if (contestantCountRef.exists()) {
                contestantCount = contestantCountRef.val();
                contestant.getCount();
            }

            question = new Question();
            question.display();
        }
        
    }

    play() {
        question.hide();
        background("Yellow");
        fill(0);
        textSize(30);
        text("Result of the Quiz",340,50);
        text("--------------------------",320,65);
        Contestant.getPlayerInfo();
        if(allContestant !== undefined) {
            debugger;
            var display_Answers = 230;
            fill("Blue");
            textSize(20);
            text("NOTE: Contestant who answered correct are highlighted in Green!!",130,230);

            for(var plr in allContestant) {
                debugger;
                var correctAns = "2";
                if(correctAns === allContestant[plr].answer) {
                    fill("Green");
                }
                else {
                    fill("Red");
                }

                display_Answers += 30;
                textSize(20);
                text(allContestant[plr].name + ":" + allContestant[plr].answer,250,display_Answers);

                
            }
        }
    }
}