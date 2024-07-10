import React, { useEffect, useState } from 'react'
import {useWinningPatterns} from '../utils/useWinningPatterns'
 
// dropdown menu for grid options.
const Dropdown = ({setSize}) => {
  
    const gridSizes = [3, 4, 5, 6]
    const [showgrid, setShowGrid] = useState(false)
    const handleClick = (ele) =>{
      setSize(ele)
    }
    return (
      <div className='flex flex-col w-20 relative'>
        <button className='bg-cyan-900 text-white rounded-md border-white-2 p-2 ' onClick={()=>setShowGrid(!showgrid)}>Grid</button>
        {showgrid &&
          <div className='bg-cyan-600 rounded-md text-white absolute w-24 top-[45px]'>
            {
              gridSizes.map((ele)=><div 
              className='px-2 flex items-center justify-center hover:bg-cyan-900 cursor-pointer rounded-md'
              onClick={()=>{
                handleClick(ele)
                setShowGrid(false)
              }
              }
              >{ele}X{ele}</div>)
            }
          </div>
        }
      </div>
    )
  }

const Tictac = () => {
    // grid size default 3
    const [size, setSize] = useState(4)
    const initialboard = Array(size*size).fill(null)
    const [board, setBoard] = useState(initialboard)
    const [turnX, setTurnX] = useState(true) // first turn will be of X always
    // winning patterns for 3*3 board game.
    const winningPatterns = useWinningPatterns(size)
    console.log(board)

    useEffect(()=>{
      setBoard(initialboard)
    }, [size])


    // resets the game board back to initial state.
    const resetGame = () => {
        setBoard(initialboard)
        setTurnX(true)
    }

    const checkWinner = (board) => {
        for(let i = 0; i < winningPatterns.length; i++){
            let first = board[winningPatterns[i][0]];
            let isWinningLine = first && winningPatterns[i].every(index => board[index] === first);
            if (isWinningLine) {
                return first
            }
        }
        return null
        }

    const handleClick = (index) =>{
        const winner = checkWinner(board)
        if(winner || board[index]) return // cheking if the box is occupied or winner is there. Prevents any new move on an already occ cell.
        const newBoard = [...board]
        newBoard[index] = turnX ? 'X' : 'O'
        setBoard(newBoard)
        setTurnX(!turnX)
    }
    const statusMessage = () => {
        const winner = checkWinner(board)
        if(winner) return `Player ${winner} wins`
        if(!board.includes(null)) return `It's a draw`
        else return `Player ${turnX ? "X's": "O's"} turn`
    }
    const gridClasses = {
        1: 'grid grid-flow-row grid-cols-1 grid-rows-1 gap-4 mb-10',
        2: 'grid grid-flow-row grid-cols-2 grid-rows-2 gap-4 mb-10',
        3: 'grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 mb-10',
        4: 'grid grid-flow-row grid-cols-4 grid-rows-4 gap-4 mb-10',
        5: 'grid grid-flow-row grid-cols-5 grid-rows-5 gap-4 mb-10',
        6: 'grid grid-flow-row grid-cols-6 grid-rows-6 gap-4 mb-10',
      };

  return (
    <div className='flex flex-col items-center'>
        
        <div className='flex flex-row justify-between items-center w-full'>
            <span className='text-white text-xl mb-10 rounded-md p-2'>
                <Dropdown setSize={setSize}/>
            </span>
            <span className='text-white text-xl mb-10 bg-cyan-900 rounded-md p-2'>
                {statusMessage()}
            </span>
        </div>
        
        <div className={gridClasses[size]}>
            
            {
                board.map((val,index)=><button 
                className='bg-sky-700 bg-opacity-20 rounded-md h-24 w-24 text-2xl text-white  hover:border border-cyan-400'
                key={index}
                onClick={()=>handleClick(index)}
                disabled={val!==null}
                >
                    {val}
                </button>)
            }
        </div>
        <button 
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={resetGame}
            >Reset Game
        </button>

    </div>
  )
}

export default Tictac
