import { MdArrowForwardIos } from "react-icons/md";

function index() {
    return (
        <div className='flex items-center space-x-2'>
            <span className="text-sm font-medium">NSM</span>
            <MdArrowForwardIos size={16} className='text-gray-400' />
            <span className="text-sm font-medium">Folders & Documents</span>
        </div>
    )
}

export default index
