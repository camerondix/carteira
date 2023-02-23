interface Props {
    value: number
}

function MoneyValue({ value }: Props) {
    return (
        <>{value >= 0 ? "" : "-"}${Math.abs(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>
    )
}

export default MoneyValue
