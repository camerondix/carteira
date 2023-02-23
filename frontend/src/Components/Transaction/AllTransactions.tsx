import { useQuery } from "@apollo/client";
import { graphql, useFragment } from "../../gql/generated";
import Transactions from "./Transactions";

const TransactionsQueryFragment = graphql(`
fragment TransactionsQuery on Query {
    transactions (first: $first, after: $cursor) {
        edges {
            node {
                ...Transactions
            }
        }
        pageInfo {
            endCursor
            hasNextPage
        }
    }
}
`);

const GET_TRANSACTIONS = graphql(`
    query getTransactions($first: Int!, $cursor: String) {
        ...TransactionsQuery
    }
`);

function AllTransactions() {

    const batchSize = 10;

    const { loading, error, data, fetchMore } = useQuery(GET_TRANSACTIONS, { variables: { first: batchSize } });

    const query = useFragment(TransactionsQueryFragment, data);
    const transactions = query?.transactions?.edges.map(e => e.node) || [];
    const pageInfo = query?.transactions?.pageInfo;
    const loadMore = () => pageInfo?.hasNextPage && fetchMore({ variables: { first: batchSize, cursor: pageInfo.endCursor } });

    return (
        <div className="container mx-auto">
            <div className="flex min-h-screen flex-col sm:p-4 md:mx-20 lg:mx-40 xl:mx-80">
                <Transactions loading={loading} error={error} data={transactions} onLoadMore={loadMore} canLoadMore={pageInfo?.hasNextPage ?? false} />
            </div>
        </div>
    )
}

export default AllTransactions
