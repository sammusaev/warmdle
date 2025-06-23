import { APP_TITLE, TOAST_CLIP, ResultEmojis, StoredState } from "../constants/game"
import { getEmojiClipboardString, getResultEmojis, showToast } from "../utils/GameUtils"
import { Button } from "./Button"

interface EndModalProps {
  temps: number[][]
  gameCounter: number
  storedState: StoredState | null
  onClose: () => void
}

export const EndModal = ({ temps, gameCounter, storedState, onClose }: EndModalProps) => {
  const emojiBoard: ResultEmojis | null = storedState?.currentStatus !== "playing" ? getResultEmojis(temps) : null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center min-w-[344px]">
      <div className="w-[90%] max-w-md rounded-2xl bg-slate-900/80 p-4 sm:p-4 md:p-8 shadow-2xl backdrop-blur-md border border-slate-700">
        <h1 className="mb-2 sm:mb-3 md:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-extrabold leading-none tracking-tight text-slate-300 animate-in fade-in slide-in-from-top-4 duration-700">
          {APP_TITLE}#{gameCounter}
        </h1>

        {emojiBoard && (
          <div className="my-4 sm:my-5 md:my-6 space-y-0.5 sm:space-y-1 text-center font-mono text-2xl sm:text-2xl md:text-3xl lg:text-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {emojiBoard.temps.map((row, i) => (
              <div key={i}>{row}</div>
            ))}
          </div>
        )}

        {storedState && (
          <div className="mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-5 md:mb-6 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300">{storedState.currentStreak}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-400">Current Streak</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300">{storedState.maxStreak}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-400">Max Streak</div>
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 text-gray-300">
          {emojiBoard && (
            <Button
              text="Copy results"
              onClick={() => {
                navigator.clipboard.writeText(getEmojiClipboardString(emojiBoard))
                showToast(TOAST_CLIP)
              }}
            />
          )}
          <Button text="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}
