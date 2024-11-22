import { IoMdArrowBack } from 'react-icons/io'
import { VscLoading } from "react-icons/vsc"

interface SearchingMatchProps {
    onCancelSearch: () => void
}

const SearchingMatch: React.FC<SearchingMatchProps> = ({ onCancelSearch }) => {
  return (
    <div className="flex flex-col h-full gap-3 w-1/3">
      <div className="flex flex-row content-center py-3 gap-3">
        <IoMdArrowBack className="text-white text-3xl place-self-center" />{' '}
        <p className="font-bold text-2xl text-white"> Finding an opponent</p>
      </div>
      <div className="dark:bg-neutral-800 dark:border-white border rounded-xl  py-3 px-4 flex flex-row gap-2">
        <VscLoading className='dark:text-white text-2xl font-semibold place-self-center animate-spin'/>
        <p className="dark:text-white text-xl font-semibold text-center">
          Searching...
        </p>
      </div>
      <div className="bg-red-700 px-4 py-2 rounded-xl flex items-center justify-center font-semibold dark:text-white" onClick={onCancelSearch}>
        Cancel
      </div>
    </div>
  )
}

export default SearchingMatch
