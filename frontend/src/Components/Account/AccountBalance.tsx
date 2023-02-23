import { FragmentType, graphql, useFragment } from "../../gql/generated";
import MoneyValue from "../Shared/MoneyValue";
import AccountBalanceDisplay from "./AccountBalanceDisplay";
import CreditUtilization from "./CreditUtilization";

const AccountBalanceFragment = graphql(`
fragment AccountBalance on Account {
    type
    currentBalance {
        ...BalanceUtilization
        timestamp
        current
        available
        limit
    }
}
`);

interface Props {
    account: FragmentType<typeof AccountBalanceFragment>
}

function AccountBalance({ account }: Props) {

    const { type, currentBalance } = useFragment(AccountBalanceFragment, account);

    return (
        <>{currentBalance &&
            <>
                <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Current Balance</h2>
                {currentBalance.current &&
                    <div className="text-4xl py-2">
                        <AccountBalanceDisplay balance={currentBalance.current} type={type} />
                    </div>
                }
                {currentBalance &&
                    <div className="w-6/12 mx-auto text-xs">
                        <CreditUtilization balance={currentBalance} height={15} showPercentage={true} />
                    </div>
                }
                {currentBalance.available &&
                    <p className="px-2 py-1 text-graySecondary dark:text-graySecondaryDark"><MoneyValue value={currentBalance.available} /> available</p>
                }
                {currentBalance.limit &&
                    <p className="px-2 py-1 text-graySecondary dark:text-graySecondaryDark"><MoneyValue value={currentBalance.limit} /> limit</p>
                }
                {currentBalance.timestamp &&
                    <p className="px-2 py-1 text-grayTertiary dark:text-grayTertiaryDark">updated {new Date(currentBalance.timestamp).toLocaleString()}</p>
                }
            </>
        }
        </>
    )
}

export default AccountBalance
