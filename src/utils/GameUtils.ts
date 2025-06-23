// import { TEMPS } from "../constants/game"
import { TEMPS, LOCALSTORE_TABLE, FIRST_WARMDLE_DATE } from "../constants/game"
import { WORD_LEN, WORD_LIST } from "../constants/words"
import { ResultEmojis, StoredState } from "../constants/game"
import toast, {toastConfig} from "react-simple-toasts"

toastConfig({ theme: 'dark-edge' })

export const showToast = (message: string, duration?: number) => toast(message, {
  position: 'center',
  duration: duration ?? 1250
})

const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // to 32bit int
  }
  return Math.abs(hash)
}

export const getTodaysWord = () => {
  const seed = hashString(getTodaysDate())
  const index = seed % WORD_LEN
  return WORD_LIST[index]
}

export const getTempsRow = (guess: string, answer: string): number[] => {
  const temps: number[] = []
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      temps.push(TEMPS.Correct)
    }
    else {
      const guessPos = guess[i].charCodeAt(0) - 96
      const answerPos = answer[i].charCodeAt(0) - 96
      const difference = Math.abs(guessPos - answerPos)
      const distance = Math.min(difference, 26 - difference)

      if (distance <= 2) temps.push(TEMPS.Hot)
      else if (distance <= 3) temps.push(TEMPS.Warm)
      else temps.push(TEMPS.Default)
    }
  }
  return temps
}

export const getResultEmojis = (temps: number[][]): ResultEmojis => {
  const mapping: { [key: number]: string } = {
    [TEMPS.Correct]: '🔴️',
    [TEMPS.Hot]: '🟠',
    [TEMPS.Warm]: '🟡',
    [TEMPS.Default]: '⚫️',
  }

  return { temps: temps.map(row => row.map(temp => mapping[temp])) }
}

export const readStateFromStorage = (): StoredState | null => {
  const lsState: string | null = localStorage.getItem(LOCALSTORE_TABLE)
  if (lsState) { return JSON.parse(lsState) as StoredState }
  return null
}

export const writeStateToStorage = (state: StoredState): void => {
  localStorage.setItem(LOCALSTORE_TABLE, JSON.stringify(state))
}

export const getTodaysDate = (): string => {
  return new Date().toISOString().split('T')[0]
}

export const hasPlayedToday = (lastPlayed: string): boolean => {
  return getTodaysDate() === lastPlayed
}

export const isDateYesterday = (date: string): boolean => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split('T')[0] === date
}

export const getEmojiClipboardString = (emojiBoard: ResultEmojis): string => {
  const counter = getGameCounter()
  const message = `warmdle#${counter}: ${emojiBoard.temps.length}/6\n`
  return message + emojiBoard.temps.map(row => row.join('')).join('\n')
}

export const getGameCounter = (): number => {
  const startDate = new Date(FIRST_WARMDLE_DATE)
  const endDate = new Date(getTodaysDate())
  const timeDiff = endDate.getTime() - startDate.getTime()
  const dayDifference = timeDiff / (1000 * 3600 * 24)
  return Math.round(dayDifference) + 1
}
