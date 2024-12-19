"use client";

export const DraggableTopBar = () => {
    return (
        <>
            <header className='absolute inset-0 h-8 bg-transparent flex justify-end'>
                <button
                    className="w-10 h-6 px2 flex justify-center items-center hover:bg-white/10 group"
                    onClick={() => {
                        // window.context.frameAction("MINIMIZE");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 1" className="fill-[#b9bbbe] group-hover:fill-white w-3 h-3">
                        <rect width="10" height="1" />
                    </svg>
                </button>
                <button
                    className="w-10 h-6 flex justify-center items-center hover:bg-white/10 group"
                    onClick={() => {
                        // window.context.frameAction("MAXIMIZE");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" className="stroke-[#b9bbbe] group-hover:stroke-white w-3 h-3 fill-none">
                        <rect width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </button>
                <button
                    className="w-10 h-6 flex justify-center items-center hover:bg-red-500 group"
                    onClick={() => {
                        // window.context.frameAction("CLOSE");
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" className="stroke-[#b9bbbe] group-hover:stroke-white w-3 h-3">
                        <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                        <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </button>
            </header>
        </>
    )
}