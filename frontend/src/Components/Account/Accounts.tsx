import { useQuery } from "@apollo/client";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import { AccountPreviewGroupFragmentDoc, AccountType } from "../../gql/generated/graphql";
import Error from "../Shared/Error";
import AccountPreviewGroup from "./AccountPreviewGroup";
import AccountPreviewGroupPlaceholder from "./Placeholder/AccountPreviewGroupPlaceholder";

const AccountsQueryFragment = graphql(`
fragment AccountsQuery on Query {
    accounts {
        id
        type
        ...AccountPreviewGroup
    }
}
`);

const GET_ACCOUNTS = graphql(`
    query getAccounts {
        ...AccountsQuery
    }
`);

function Accounts() {

    const { loading, error, data } = useQuery(GET_ACCOUNTS);
    const query = useFragment(AccountsQueryFragment, data);
    const accounts = query?.accounts || [];
    const groups = new Map<AccountType, [FragmentType<typeof AccountPreviewGroupFragmentDoc>]>();
    accounts.forEach((a) => groups.has(a.type) ? groups.get(a.type)?.push(a) : groups.set(a.type, [a]));

    return (
        <div className="container mx-auto">
            <div className="flex min-h-screen flex-col p-4 md:mx-20 lg:mx-40 xl:mx-80">
                {
                    (error) ?
                        <Error message={error.message} />
                        :
                        loading ?
                            <AccountPreviewGroupPlaceholder />
                            :
                            Array.from(groups.entries()).map(entry =>
                                <AccountPreviewGroup key={entry[0]} groupAccounts={entry[1]} groupType={entry[0]} />
                            )
                }
            </div>
        </div>
    )
}

export default Accounts;
