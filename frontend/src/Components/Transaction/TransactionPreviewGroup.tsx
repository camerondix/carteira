import { FragmentType, graphql, useFragment } from "../../gql/generated";
import TransactionPreview from "./TransactionPreview";

const TransactionPreviewGroupFragment = graphql(`
fragment TransactionPreviewGroup on Transaction {
    id
    ...TransactionPreview
}
`);

interface Props {
    groupTransactions: FragmentType<typeof TransactionPreviewGroupFragment>[],
    groupName: string,
}


function TransactionPreviewGroup({ groupTransactions, groupName }: Props) {

    const transactions = useFragment(TransactionPreviewGroupFragment, groupTransactions);

    return (
        <div className="p-3">
            <div className="flex flex-row px-3 text-3xl mb-2 justify-between">
                <h1>{groupName}</h1>
            </div>
            <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                {transactions.map((t) =>
                    <TransactionPreview key={t.id} transaction={t} />
                )}
            </div>
        </div>
    )
}

export default TransactionPreviewGroup
