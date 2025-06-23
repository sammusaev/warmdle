
export const APP_TITLE = import.meta.env.VITE_APP_TITLE
export const FIRST_WARMDLE_DATE = "2025-06-23"
export const LOCALSTORE_TABLE = 'state'
export const GAME_URL = "warm.smsv.dev"

export const TOAST_INVALID = "not a valid word 👀"
export const TOAST_WIN = "you got it 🔥🔥🔥"
export const TOAST_CLIP = "copied 💪🏽"

export enum TEMPS {
  "Correct" = 0,
  "Hot" = 2,
  "Warm" = 3,
  "Default" = 4
}

export type GAME_STATUS = "playing" | "won" | "lost"

export interface StoredState {
  lastPlayed: string
  currentStatus: GAME_STATUS
  currentStreak: number
  maxStreak: number
  board: BoardState
}

export interface ResultEmojis {
  temps: string[][]
}

export const TOTAL_ROWS = 6
export const TOTAL_COLS = 5

export interface BoardState {
  letters: string[][]
  temps: number[][]
  currRow: number
  currCol: number
}

export const ENTER_CHAR = "⏎"
export const BACK_CHAR = "⌫"
export const KEYBOARD_TOP_ROW = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
export const KEYBOARD_MID_ROW = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
export const KEYBOARD_BTM_ROW = [ENTER_CHAR, "Z", "X", "C", "V", "B", "N", "M", BACK_CHAR]
