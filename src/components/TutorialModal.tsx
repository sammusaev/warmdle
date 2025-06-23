import { Button } from "./Button"

const MiniCell = ({colourName, colourCode, explanation} : {colourName: string, colourCode: string, explanation: string}) => {
  return (
    <div className="inline-flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`bg-${colourCode} text-slate-300 px-3 py-1.5 rounded-md font-bold shadow-lg`}>{colourName}</div>
      <div className="text-slate-300">{explanation}</div>
    </div>
  )
}

export const TutorialModal = ({onClose}: {onClose(): void}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center min-w-[344px]">
      <div className="w-[90%] max-w-md rounded-2xl bg-slate-900/80 p-4 sm:p-4 md:p-8 shadow-2xl backdrop-blur-md border border-slate-700">
        <h1 className="mb-4 sm:mb-5 md:mb-6 text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-extrabold leading-none tracking-tight text-slate-300 animate-in fade-in slide-in-from-top-4 duration-700">
          How to play
        </h1>

        <div className="my-6 sm:my-8 md:my-10 space-y-6 text-md">
          <div className="text-center space-y-3">
            <p className="text-lg sm:text-xl font-semibold text-slate-200">Guess today's 5-letter word within 6 attempts</p>
            <p className="text-md text-slate-300">With each guess come hints as to how <span className="text-transparent bg-clip-text whitespace-nowrap text-gray-400 bg-gradient-to-r to-orange-600 from-orange-300">warm</span> each letter is to the correct one</p>
          </div>

          <div className="space-y-5 flex flex-col">
            <MiniCell colourCode="game-correct" colourName="Correct" explanation="the letter is correct" />
            <MiniCell colourCode="game-hot" colourName="Hot" explanation="± 2 letters away" />
            <MiniCell colourCode="game-warm" colourName="Warm" explanation="± 3 letters away" />
          </div>

        </div>

        <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 text-gray-300">
          <Button text="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}
