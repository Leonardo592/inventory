export function Selector({ state, funcion, texto1, texto2 }) {

    return (
        <div className="relative w-full">
            <div
                onClick={funcion}
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-1 flex justify-between items-center cursor-pointer text-sm"
            >
                <div>
                    <span className="block text-gray-600">{texto1}</span>
                    <span className="block text-gray-800 font-medium">{texto2}</span>
                </div>
                <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>

        </div>
    );

}