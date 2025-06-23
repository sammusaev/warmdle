
import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { Keyboard } from "./components/Keyboard"
import { Navbar } from "./components/Navbar"
import { GAME_STATUS, StoredState } from "./constants/game"
import { BoardState } from "./constants/game"
import { TOTAL_COLS, TOTAL_ROWS } from "./constants/game"
import { BACK_CHAR, ENTER_CHAR } from "./constants/game"
import { readStateFromStorage, getTodaysDate, hasPlayedToday, isDateYesterday, writeStateToStorage, showToast, getGameCounter } from "./utils/GameUtils"
import { createBoard, deleteLetter, insertLetter, isValidWord, submitGuess } from "./utils/BoardUtils"
import { EndModal } from "./components/EndModal"
import 'react-simple-toasts/dist/style.css'
import 'react-simple-toasts/dist/theme/dark-edge.css'
import { TOAST_INVALID, TOAST_WIN } from "./constants/game"
import { getTempsRow, getTodaysWord } from "./utils/GameUtils"
import { TutorialModal } from "./components/TutorialModal"

function App() {
  const TODAYS_WORD = getTodaysWord()
  const COUNTER = getGameCounter();
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>("playing")
  const [boardState, setBoardState] = useState<BoardState>(createBoard())
  const [isShowingEndModal, setIsShowingEndModal] = useState(false)
  const [isShowingTutorialModal, setIsShowingTutorialModal] = useState(false)
  const todaysDate = getTodaysDate()
  const [storedState, setStoredState] = useState<StoredState | null>(() => readStateFromStorage())

  useEffect(() => {
    if (storedState) {
      writeStateToStorage(storedState)
    }
  }, [storedState])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') updateBoard('BACKSPACE')
      else if (e.key === 'Enter') updateBoard('ENTER')
      else if (e.key.match(/^[a-zA-Z]$/)) updateBoard(e.key.toUpperCase())
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState, gameStatus])

  useEffect(() => {
    const storedState = readStateFromStorage()
    const isInitialRender = boardState.currRow === 0 && gameStatus === 'playing'

    if (isInitialRender) {
      if (!storedState) {
        // console.log("LOAD: New user")
        setStoredState({
          board: boardState,
          currentStatus: 'playing',
          currentStreak: 0,
          maxStreak: 0,
          lastPlayed: todaysDate,
        })
        return
      }
      if (hasPlayedToday(storedState.lastPlayed)) {
        if (storedState.currentStatus !== 'playing') {
          // console.log("LOAD: Returning to completed game")
          setBoardState(storedState.board)
          setGameStatus(storedState.currentStatus)
          setIsShowingEndModal(true)
        }
        else {
          // console.log("LOAD: Returning to in-progress game")
          setBoardState(storedState.board)
        }
        return
      }
      else {
        console.log("LOAD: Starting new day's game")
        const wasYesterdayWin = isDateYesterday(storedState.lastPlayed) && storedState.currentStatus === 'won'
        const streakToCarryOver = wasYesterdayWin ? storedState.currentStreak : 0

        setStoredState({
          ...storedState,
          board: boardState,
          currentStatus: 'playing',
          currentStreak: streakToCarryOver,
          lastPlayed: todaysDate,
        })
        return
      }
    }
    else {
      if (!storedState) return

      if (storedState.currentStatus === gameStatus) {
        if (gameStatus === 'playing') {
          setStoredState({ ...storedState, board: boardState })
        }
        return
      }

      let updatedState = { ...storedState, board: boardState, currentStatus: gameStatus, lastPlayed: todaysDate }
      if (gameStatus === 'won') {
        // console.log("EVENT: Game Won")
        const newCurrentStreak = storedState.currentStreak + 1
        updatedState = {
          ...updatedState,
          currentStreak: newCurrentStreak,
          maxStreak: Math.max(storedState.maxStreak, newCurrentStreak),
        }
      } else if (gameStatus === 'lost') {
        // console.log("EVENT: Game Lost")
        updatedState = {
          ...updatedState,
          currentStreak: 0,
        }
      }
      setStoredState(updatedState)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState.currRow, gameStatus])

  const updateBoard = (key: string) => {
    // Early exit
    if (gameStatus !== "playing") return

    else if ((key === 'BACKSPACE' || key === BACK_CHAR) && boardState.currCol <= TOTAL_COLS && boardState.currCol >= 0) {
      setBoardState(() => deleteLetter(boardState))
    }

    else if (boardState.currCol === TOTAL_COLS && (key === 'ENTER' || key === ENTER_CHAR)) {
      const guess: string = boardState.letters[boardState.currRow].join('').toLowerCase()
      if (isValidWord(guess)) {
        const newTemps = getTempsRow(guess, TODAYS_WORD)
        setBoardState(() => submitGuess(boardState, newTemps))
        if (guess === TODAYS_WORD) {
          showToast(TOAST_WIN)
          setGameStatus("won")
          setIsShowingEndModal(true)
        }
        else if (boardState.currRow === TOTAL_ROWS-1) {
          showToast(`The word was ${TODAYS_WORD}`, 1500)
          setGameStatus("lost")
          setIsShowingEndModal(true)
        }
      } else {
        showToast(TOAST_INVALID)
      }
    }

    else if (key.match(/^[a-zA-Z]$/) && boardState.currCol < TOTAL_COLS && boardState.currRow <= TOTAL_ROWS) {
      setBoardState(() => insertLetter(boardState, key))
    }
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)]">
      <Navbar todaysCounter={COUNTER} onClickStats={() => setIsShowingEndModal(true)} onClickTutorial={() => setIsShowingTutorialModal(true)} />
      {
        (isShowingEndModal) &&
        <EndModal
          temps={boardState.temps.slice(0, boardState.currRow)}
          gameCounter={COUNTER}
          storedState={storedState}
          onClose={() => setIsShowingEndModal(false)}
        />
      }
      {
        (isShowingTutorialModal) &&
        <TutorialModal onClose={() => setIsShowingTutorialModal(false)} />
      }
      <Board props={boardState} />
      <Keyboard onKeyClick={updateBoard} />
    </div>
  )
}

export default App
