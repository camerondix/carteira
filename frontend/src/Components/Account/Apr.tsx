import { FragmentType, graphql, useFragment } from "../../gql/generated";
import EnumDisplay from "../Shared/EnumDisplay";
import MoneyValue from "../Shared/MoneyValue";

const AprFragment = graphql(`
fragment AprDetails on Apr {
    percentage
    type
    balanceSubjectToApr
    interestChargeAmount
}
`);

interface Props {
    apr: FragmentType<typeof AprFragment>,
}

function Apr({ apr }: Props) {

    const { percentage, type, balanceSubjectToApr, interestChargeAmount } = useFragment(AprFragment, apr);

    return (
        <>
            {percentage && type &&
                <span>{percentage}% <EnumDisplay value={type} /></span>
            }
            {balanceSubjectToApr !== null && balanceSubjectToApr !== undefined && balanceSubjectToApr !== 0 &&
                <span className="text-red dark:text-redDark"> Balance of <MoneyValue value={balanceSubjectToApr} /> is subject to apr!</span>
            }
            {interestChargeAmount !== null && interestChargeAmount !== undefined && interestChargeAmount !== 0 &&
                <span className="text-red dark:text-redDark"> Interest of <MoneyValue value={interestChargeAmount} /> was charged last month!</span>
            }
        </>
    )
}

export default Apr
