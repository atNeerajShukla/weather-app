import { CloudSun } from "lucide-react"


const Header = () => {
    return (
            <header className="shadow-md py-5 primary-gradient">
                <div className="flex justify-center items-center md:space-x-4 mx-auto w-10/12">
                    <CloudSun className="md:block hidden text-blue-500 size-10" />
                    <p className="text-gray-500 text-md">Real-time weather updates. Assignment for <span className="font-semibold">O(Log n) Labs</span>.</p>
                </div>
            </header>
    )
}

export default Header