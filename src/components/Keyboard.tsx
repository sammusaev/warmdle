import {
  BACK_CHAR,
  ENTER_CHAR,
  KEYBOARD_BTM_ROW,
  KEYBOARD_MID_ROW,
  KEYBOARD_TOP_ROW
} from "../constants/game"

interface KeyboardButtonProps {
  value: string,
  handler: (key: string) => void
  className?: string
}

const KeyboardButton = ({value, handler} : KeyboardButtonProps): JSX.Element => {
  return (
    <button
      onClick={() => handler(value)}
      className={`flex justify-center place-items-center
      text-gray-400 bg-gray-800  border-gray-700 active:bg-gray-900
        font-bold rounded-lg text-md sm:text-xl md:text-2xl lg:text-2xl h-10 sm:h-14 md:h-16 lg:h-16
        touch-manipulation select-none outline-none focus:outline-none
        ${value === ENTER_CHAR || value === BACK_CHAR
          ? 'w-12 sm:w-12 md:w-14 lg:w-22'
          : 'w-8 sm:w-10 md:w-12 lg:w-22'
        }
      `}>
        {value}
    </button>
  )
}

interface KeyboardProps {
  onKeyClick: (key: string) => void
}

export const Keyboard = ({ onKeyClick }: KeyboardProps): JSX.Element => {
  const keys = [KEYBOARD_TOP_ROW, KEYBOARD_MID_ROW, KEYBOARD_BTM_ROW]

  return (
    <div className="px-1 pb-2 min-w-[344px]">
      {keys.map((keyRow, rowIndex) => (
        <div
          key={rowIndex}
          className="self-center flex justify-center"
        >
          {keyRow.map(key => (
            <div key={key} className="px-0.5 py-1">
              <KeyboardButton value={key} handler={onKeyClick} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
