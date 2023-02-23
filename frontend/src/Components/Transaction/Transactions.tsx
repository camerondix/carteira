import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import { TransactionPreviewGroupFragmentDoc } from "../../gql/generated/graphql";
import Error from "../Shared/Error";
import TransactionPreviewGroupPlaceholder from "./Placeholder/TransactionPreviewGroupPlaceholder";
import TransactionPreviewGroup from "./TransactionPreviewGroup";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TransactionsFragment = graphql(`
fragment Transactions on Transaction {
    id
    timestamp
    ...TransactionPreviewGroup
}
`);

interface Props {
    loading: boolean,
    error: ApolloError | undefined,
    data: FragmentType<typeof TransactionsFragment>[],
    onLoadMore: () => void,
    canLoadMore: boolean,
}

function Transactions({ loading, error, data, onLoadMore, canLoadMore }: Props) {

    const transactions = useFragment(TransactionsFragment, data);
    const observer = new IntersectionObserver((entry, _) => {
        if (entry[0].isIntersecting) {
            const loadMoreDiv = document.getElementById("loadMoreTransactions");
            loadMoreDiv && observer.unobserve(loadMoreDiv);
            onLoadMore();
        }
    });
    useEffect(() => {
        const loadMoreDiv = document.getElementById("loadMoreTransactions");
        loadMoreDiv && observer.observe(loadMoreDiv);
    });

    const groups = new Map<string, [FragmentType<typeof TransactionPreviewGroupFragmentDoc>]>();
    transactions.forEach((t) => groups.has(t.timestamp.slice(0, 7)) ? groups.get(t.timestamp.slice(0, 7))?.push(t) : groups.set(t.timestamp.slice(0, 7), [t]));

    return (
        <>
            {error ?
                <Error message={error.message} />
                :
                loading ?
                    <TransactionPreviewGroupPlaceholder count={20} />
                    :
                    <>
                        {Array.from(groups.entries()).map(entry =>
                            <TransactionPreviewGroup key={entry[0]} groupName={`${month[parseInt(entry[0].slice(5, 7)) - 1]} ${entry[0].slice(0, 4)}`} groupTransactions={entry[1]} />
                        )}
                        {canLoadMore &&
                            <div id="loadMoreTransactions" >
                                <TransactionPreviewGroupPlaceholder count={10} />
                            </div>
                        }
                    </>
            }
        </>
    )
}

export default Transactions
