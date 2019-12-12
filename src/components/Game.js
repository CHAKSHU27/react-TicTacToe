import React,{Component} from 'react'
import Board from './Board.js'
//import Square from './Square.js'
class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            xIsNext:true,
            stepNumber:0,
            history:[
                {squares:Array(9).fill(null)}
            ]
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext:(step%2)===0
        })
    }
    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current=history[history.length-1];
        const squares=current.squares.slice();
        const win=calculatewinner(squares);
        if(win || squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext?'X':'O';
        this.setState({
            history:history.concat({squares:squares}),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length
        })
    }
    render(){
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=calculatewinner(current.squares);
        const moves=history.map((step,move)=>{
            const des=move?'move number'+move:'Start Now';
            return (
                <li key={move}>
                    <button onClick={()=>{this.jumpTo(move)}}>
                        {des}
                    </button>
                </li>
            )
        });
        let sts;
        if(winner){
            sts='winner is'+winner;
        }
        else{
            sts='Next player is'+ (this.state.xIsNext?'Player 1[X]':'Player 2[O]');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i)=>this.handleClick(i)}
                    squares={current.squares} />
                </div>
                <div className="game-info">
                    <div>{sts}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }
}
export default Game;

function calculatewinner(squares){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0;i<lines.length;i++)
    {
        const [a,b,c]=lines[i];
        if(squares[a] &&squares[a]===squares[b]&&squares[b]===squares[c])
        return squares[a];
    }
    return null;
}