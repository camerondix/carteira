import { BsBug } from "react-icons/bs"

interface Props {
    message: string,
}

function Error({ message }: Props) {
    return (
        <div className="my-5 mx-auto text-center">
            <BsBug className="w-20 h-20 mx-auto animate-pulse text-primary dark:text-primaryDark" />
            <div className="text-xl mt-5">{message}</div>
        </div>
    )
}

export default Error
