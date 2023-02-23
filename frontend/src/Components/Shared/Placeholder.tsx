interface Props {
    length?: number,
    empty?: boolean,
}

function Placeholder({ length, empty }: Props) {
    return (
        <span className={`w-ful h-full m-1 cursor-wait rounded-sm text-transparent ${empty ? "" : "animate-pulse bg-grayQuaternary dark:bg-grayQuaternaryDark"}`}>
            {length && length > 0 ? "_".repeat(length) : "_"}
        </span>
    )
}
export default Placeholder