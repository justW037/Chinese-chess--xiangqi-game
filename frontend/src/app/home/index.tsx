import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full">
      <h1 className="text-4xl font-bold dark:text-white">
        Welcome to the Xiangqi Game
      </h1>
      <Link to="/play"><p className="text-xl font-bold py-2 p-4 bg-red-800 rounded-xl dark:text-white ">Play now</p></Link>
    </div>
  )
}

export default Home
