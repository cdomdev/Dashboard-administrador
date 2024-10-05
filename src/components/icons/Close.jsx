
export const Close = ({ toggleDropdown }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 cursor-pointer stroke-red-700" onClick={toggleDropdown} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    )
}
