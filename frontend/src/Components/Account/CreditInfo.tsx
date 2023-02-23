import { FragmentType, graphql, useFragment } from "../../gql/generated";
import MoneyValue from "../Shared/MoneyValue";
import Apr from "./Apr";

const CreditInfoFragment = graphql(`
fragment CreditDetails on CreditInfo {
    isOverdue
    lastPaymentAmount
    lastPaymentDate
    lastStatementDate
    lastStatementBalance
    minimumPayment
    nextPaymentDueDate
    aprs {
        ...AprDetails
    }
}
`);

interface Props {
    info: FragmentType<typeof CreditInfoFragment>,
}

function CreditInfo({ info }: Props) {

    const { isOverdue, lastPaymentAmount, lastPaymentDate, lastStatementBalance, minimumPayment, nextPaymentDueDate, aprs } = useFragment(CreditInfoFragment, info);

    return (
        <>
            {(isOverdue || (lastPaymentAmount !== null && lastPaymentAmount !== undefined) || lastPaymentDate || (lastStatementBalance !== null && lastStatementBalance !== undefined) || (minimumPayment !== null && minimumPayment !== undefined) || nextPaymentDueDate || aprs.length > 0) &&
                <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Credit Details</h2>
            }
            {isOverdue &&
                <p className="px-2 py-1 text-red dark:text-redDark">Payment is overdue!</p>
            }
            {((lastPaymentAmount !== null && lastPaymentAmount !== undefined) || lastPaymentDate) &&
                <p className="px-2 py-1">Last payment
                    {lastPaymentAmount !== null && lastPaymentAmount !== undefined &&
                        <span> of <MoneyValue value={lastPaymentAmount} /></span>
                    }
                    {lastPaymentDate &&
                        <span> made on {new Date(lastPaymentDate).toLocaleDateString()}</span>
                    }
                </p>
            }
            {((minimumPayment !== null && minimumPayment !== undefined) || nextPaymentDueDate) &&
                <p className="px-2 py-1">Minimum payment
                    {minimumPayment !== null && minimumPayment !== undefined &&
                        <span> of <MoneyValue value={minimumPayment} /></span>
                    }
                    {lastPaymentDate &&
                        <span> due on {new Date(nextPaymentDueDate).toLocaleDateString()}</span>
                    }
                </p>
            }
            {aprs.map((a, i) =>
                <p className="px-2 py-1" key={i}>
                    <Apr apr={a} />
                </p>
            )}
        </>
    )
}

export default CreditInfo
