interface Props {
    value: string
}

function EnumDisplay({ value }: Props) {
    return (
        <>{value.length > 3 ? value.split("_").map(w => w[0]?.toUpperCase() + w.substring(1).toLowerCase()).join(" ") : value}</>
    )
}

export default EnumDisplay