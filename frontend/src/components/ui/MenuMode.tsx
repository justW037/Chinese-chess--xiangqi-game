import { IoMdArrowBack } from 'react-icons/io'
import { FaClock } from 'react-icons/fa'

interface MenuModeProps {
  onSearchMatch: () => void
}

const MenuMode: React.FC<MenuModeProps> = ({ onSearchMatch }) => {
  return (
    <div className="flex flex-col h-full gap-3 w-1/3">
      <div className="flex flex-row content-center py-3 gap-3">
        <IoMdArrowBack className="dark:text-white text-3xl place-self-center" />{' '}
        <p className="font-bold text-2xl dark:text-white"> Game mode</p>
      </div>
      <div className="dark:bg-neutral-800 dark:border-white border border-black rounded-xl  py-3 px-4 flex flex-row gap-2">
        <FaClock className="dark:text-white text-2xl font-semibold place-self-center" />
        <p className="dark:text-white text-xl font-semibold ">Quick game 5 min</p>
      </div>
      <div className='bg-red-700 px-4 py-2 rounded-xl flex items-center justify-center font-semibold dark:text-white' onClick={onSearchMatch}>Play</div>
    </div>
  )
}

export default MenuMode
