import Slime from "./slime";
import Player from "./player";
import FuzzyDesicions from "../fuzzy_decisions/main.js";
import Rules from "./rules"
import BaseFuzzyFunction from "./fuzzy_decisions/FuzzyLogicFunctions/BaseFuzzyFunction";

export class DecisionController{

    constructor(rules, player, slimes){
        this.rules = rules;
        this.player = player;
        this.slimes = slimes;
        this.funcs = [];
    };

    setScales(){     
        
        this.rules.fuzzyDecider.addScale(
            this.rules.params[0],
            [
                {
                    func: this.funcs[0],
                    outcome: "rotate"
                },
                {
                    func: this.funcs[1],
                    outcome: "middle range"
                },
                {
                    func: this.funcs[2],
                    outcome: "rocket"
                }
            ]
        )
        this.rules.fuzzyDecider.addScale(
            this.rules.params[1],
            [
                {
                    func: this.funcs[3],
                    outcome: "short range"
                },
                {
                    func: this.funcs[4],
                    outcome: "rocket"
                },
                {
                    func: this.funcs[5],
                    outcome: "middle range"
                },
                {
                    func: this.funcs[6],
                    outcome: "get close"
                }
            ]
        )
        this.rules.fuzzyDecider.addScale(
            this.rules.params[2],
            [
                {
                    func: this.funcs[7],
                    outcome: "rocket"
                },
                {
                    func: this.funcs[8],
                    outcome: "middle range"
                }
            ]
        )
    }

    setState(){        
        this.rules.fuzzyDecider.setScaleResultsReducer("max");
        this.slimes.forEach(slime => {
            this.rules.input = [
            {
                scaleName: this.params[0],
                value: slime.hp//hp for slime
            },
            {
                scaleName: this.params[1],
                value: this.findDistance(slime)//distance between slime and aurora
            },
            {
                scaleName: this.params[2],
                value: this.findDensity()//density of slimes near aurora
            }
        ];
        slime.state = this.rules.getDecision();
        });
        
    }

    findDistance(slime){
        return slime.body.position.distance(this.player.body.position)
    }

    findDensity(){
        return 0;
    }
}