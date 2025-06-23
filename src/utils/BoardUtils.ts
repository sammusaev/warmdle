import { TOTAL_ROWS, TOTAL_COLS } from "../constants/game"
import { TEMPS } from "../constants/game"
import { ValidWord, WORD_SET } from "../constants/words"
import { BoardState } from "../constants/game"

export const createBoard = (): BoardState => {
  const keys: string[][] = []
  const temps: number[][] = []

  // Make Array.fill() work
  for (let i = 0; i < TOTAL_ROWS; i++) {
    const keyRow: string[] = []
    const tempRow: number[] = []
    for (let j = 0; j < TOTAL_COLS; j++) {
      keyRow.push('')
      tempRow.push(TEMPS.Default)
    }
    keys.push(keyRow)
    temps.push(tempRow)
  }

  return {
    letters: keys,
    temps,
    currRow: 0,
    currCol: 0
  }
}

export interface updateBoardProps {
  board: BoardState
  letter?: string
}

export const insertLetter = (boardState: BoardState, letter: string): BoardState => {
  const newLetters = [...boardState.letters]
  newLetters[boardState.currRow] = [...newLetters[boardState.currRow]]
  newLetters[boardState.currRow][boardState.currCol] = letter
  return {
    ...boardState,
    letters: newLetters,
    currCol: boardState.currCol + 1
  }
}

export const deleteLetter = ( boardState: BoardState): BoardState => {
  const newLetters = [...boardState.letters]
  const newCol = boardState.currCol > 0 ? boardState.currCol-1 : 0
  newLetters[boardState.currRow] = [...newLetters[boardState.currRow]]
  newLetters[boardState.currRow][newCol] = ""

  return {
    ...boardState,
    letters: newLetters,
    currCol: newCol
  }
}

export const submitGuess = (board: BoardState, rowTemps: number[]): BoardState => {
  const newTemps = [...board.temps]
  newTemps[board.currRow] = [...rowTemps]

  return { ...board, temps: newTemps, currCol: 0, currRow: board.currRow + 1 }
}

export function isValidWord(word: string): word is ValidWord {
  return WORD_SET.has(word as ValidWord)
}
