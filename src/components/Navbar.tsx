import { IoIosStats, IoMdHelp  } from "react-icons/io"

const Logo = ({todaysCounter} : {todaysCounter: number}) => {
  return (
    <div className="">
      <a href="/" className="flex items-center rtl:space-x-reverse px-4 text-3xl sm:text-3xl md:text-4xl lg:text-4x ">
        <div className="self-center  snap-center pt-0.5  font-extrabold  ">
          <span className="text-transparent bg-clip-text whitespace-nowrap text-gray-400 bg-gradient-to-r to-orange-600 from-orange-300">
            warm
          </span>
          <span className="text-transparent bg-clip-text whitespace-nowrap bg-slate-700 hover:text-cyan-600">
            dle
          </span>
          <span className="text-transparent text-xs bg-clip-text whitespace-nowrap bg-slate-700 hover:text-cyan-600">
            #{todaysCounter ? todaysCounter : 'oops'}
          </span>
        </div>
      </a>
    </div>
  )
}

export const Navbar = ({todaysCounter, onClickStats, onClickTutorial} : {todaysCounter: number, onClickStats(): void, onClickTutorial(): void}) => {
  return (
    <nav className="px-2 py-3 sm:py-4 md:py-6 lg:py-6 ">
    <div className="flex flex-wrap items-center justify-between mx-auto">
      <Logo todaysCounter={todaysCounter}/>
      <div className="flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
        <div className="hover:text-cyan-600 text-slate-500 size-6 justify-center items-center" onClick={onClickStats}>
          <IoIosStats/>
        </div>
        <div className="hover:text-cyan-600 text-slate-500 size-6 justify-center items-center" onClick={onClickTutorial}>
          <IoMdHelp/>
        </div>
      </div>
    </div>
  </nav>
  )
}
