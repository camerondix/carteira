import { FragmentType, graphql, useFragment } from "../../gql/generated";
import EnumDisplay from "../Shared/EnumDisplay";

const AccountNamesFragment = graphql(`
fragment AccountNames on Account {
    officialName
    name
    subtype
    mask
}
`);

interface Props {
    account: FragmentType<typeof AccountNamesFragment>,
}

function AccountNames({ account }: Props) {

    const { officialName, name, subtype, mask } = useFragment(AccountNamesFragment, account);

    return (
        <>
            <h1 className="text-3xl font-bold">{name}</h1>
            <h2 className="text-xl text-graySecondary dark:text-graySecondaryDark">{`${officialName} ${mask ? `(${mask})` : ""}`}</h2>
            <h3 className="text-md text-grayTertiary dark:text-grayTertiaryDark"><EnumDisplay value={subtype} /></h3>
        </>
    )
}

export default AccountNames
