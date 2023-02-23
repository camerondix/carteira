import BsIcons from "react-icons/bs/index";

interface Props {
    name: String,
    className?: string
}

function DynamicIcon({ name, className }: Props) {

    const Icon = BsIcons[name as keyof typeof BsIcons];

    return (
        <Icon className={className} />
    )
}
export default DynamicIcon