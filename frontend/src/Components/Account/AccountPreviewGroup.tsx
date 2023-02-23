import { FragmentType, graphql, useFragment } from "../../gql/generated";
import { AccountType } from "../../gql/generated/graphql";
import AccountPreview from "./AccountPreview";
import AccountPreviewGroupLabel from "./AccountPreviewGroupLabel";

const AccountPreviewGroupFragment = graphql(`
fragment AccountPreviewGroup on Account {
    id
    type
    currentBalance {
        current
    }
    ...AccountPreviewGroupLabel
    ...AccountPreview
}
`);

interface Props {
    groupAccounts: FragmentType<typeof AccountPreviewGroupFragment>[],
    groupType: AccountType,
}

function AccountPreviewGroup({ groupAccounts, groupType }: Props) {

    const accounts = useFragment(AccountPreviewGroupFragment, groupAccounts);

    return (
        <div className="p-3">
            <AccountPreviewGroupLabel accounts={[...accounts]} />
            <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                {accounts.map((a) =>
                    <AccountPreview
                        key={a.id}
                        account={a} />
                )}
            </div>
        </div>
    )
}

export default AccountPreviewGroup;
