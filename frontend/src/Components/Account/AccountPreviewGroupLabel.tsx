import { FragmentType, graphql, useFragment } from "../../gql/generated";
import EnumDisplay from "../Shared/EnumDisplay";
import AccountBalanceDisplay from "./AccountBalanceDisplay";

const AccountPreviewGroupLabelFragment = graphql(`
fragment AccountPreviewGroupLabel on Account {
    type
    currentBalance {
        current
    }
}
`);

interface Props {
    accounts: FragmentType<typeof AccountPreviewGroupLabelFragment>[],
}

function AccountPreviewGroupLabel({ accounts }: Props) {

    const accountFragments = useFragment(AccountPreviewGroupLabelFragment, accounts);

    const type = accountFragments[0].type;
    const balance = accountFragments.map(a => a.currentBalance?.current ? a.currentBalance.current : 0).reduce((sum, balance) => sum += balance, 0);

    return (
        <div className="flex flex-row px-3 text-3xl mb-2 justify-between">
            <h1><EnumDisplay value={type.toString()} /></h1>
            <h1>{balance && <AccountBalanceDisplay balance={balance} type={type} />}</h1>
        </div>
    )
}

export default AccountPreviewGroupLabel
