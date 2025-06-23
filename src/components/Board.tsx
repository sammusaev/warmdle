import { BoardState } from "../constants/game"
import { TOTAL_COLS } from "../constants/game"
import { TEMPS } from "../constants/game"

const BoardCell = ({letter, temp, isCurrent} : {letter: string, temp: number, isCurrent: boolean}) => {
  return (
    <button className={`
      ${isCurrent && 'animate-in zoom-in duration-300 repeat-1'}
      text-center content-center w-full h-full
      text-gray-200  hover:bg-gray-900 hover:text-gray-400 border-gray-700 border-2
      font-bold rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl
      ${temp === TEMPS.Correct && 'bg-game-correct'}
      ${temp === TEMPS.Hot && 'bg-game-hot'}
      ${temp === TEMPS.Warm && 'bg-game-warm'}
      ${(temp === TEMPS.Default) && 'bg-game-default'}
      `}
  > {letter}
    </button>
  )
}

export const Board = ({props}: {props: BoardState}) => {
  const { letters: keys, temps, currCol, currRow } = props
  return (
    <div className="flex-grow self-center content-center items-center justify-center p-2">
      <div className="grid grid-rows-6 place-items-center gap-1.5">
        {keys.map((row, rowIdx) => (
          <div key={rowIdx} className={`grid grid-cols-5 gap-1 sm:gap-2 md:gap-2 lg:gap-2 ${currCol === TOTAL_COLS && 'border-yellow-50'}`}>
            {row.map((letter, colIdx) => (
              <div
                key={colIdx}
                className={`border-pink-200'
                  ${rowIdx === props.currRow
                    ? 'size-12 sm:size-16 md:size-24'
                    : 'size-11 sm:size-14 md:size-20'
                  }}
                `}
              >
                <BoardCell
                  letter={letter}
                  temp={temps[rowIdx][colIdx]}
                  isCurrent={rowIdx === currRow && colIdx === currCol}
                />
              </div>
            ))}
          </div>
        )
        )}
      </div>
    </div>
  )
}
