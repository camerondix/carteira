import { FragmentType, graphql, useFragment } from "../../gql/generated";

const BalanceUtilizationFragment = graphql(`
fragment BalanceUtilization on Balance {
    limit
    current
}
`);

interface Props {
    balance: FragmentType<typeof BalanceUtilizationFragment>,
    showPercentage: boolean,
    height: number,
}

function CreditUtilization({ balance, showPercentage, height }: Props) {

    const { limit, current } = useFragment(BalanceUtilizationFragment, balance);

    if (limit && current) {

        const warning = 25;
        const danger = 30;
        const utilization = current / limit * 100;
        const gap = danger - utilization;

        return (
            <>
                {
                    <div className="w-full flex flex-row bg-baseColor dark:bg-baseColorDark rounded-full" style={{ "height": height }}>
                        <div className={`h-full rounded-l-full text-baseColor dark:text-baseColorDark ${utilization < warning ? "bg-green dark:bg-greenDark" : utilization > danger ? "bg-red dark:bg-redDark" : "bg-yellow dark:bg-yellowDark"}`} role="progressbar" style={{ "width": `${utilization}%` }}>
                            <span className="font-extrabold">{showPercentage ? `${utilization.toFixed(0)}%` : ""}</span>
                        </div>
                        {
                            gap > 0 && <>
                                <div className="h-full border-r-2 border-grayTertiary dark:border-grayTertiaryDark" role="progressbar" style={{ "width": `${gap}%` }}></div>
                                <div className="progress" role="progressbar" style={{ "width": "1%" }}></div>
                            </>
                        }
                    </div>
                }
            </>
        )
    }
    return <></>
}

export default CreditUtilization
