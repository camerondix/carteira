import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { graphql, useFragment } from "../../gql/generated";
import Error from "../Shared/Error";
import Modal from "../Shared/Modal";
import AccountBalance from "./AccountBalance";
import AccountNames from "./AccountNames";
import CreditInfo from "./CreditInfo";
import DepositoryInfo from "./DepositoryInfo";
import AccountPlaceholder from "./Placeholder/AccountPlaceholder";

const AccountsQueryFragment = graphql(`
fragment AccountQuery on Query {
    account(id: $id) {
        id
        name
        type
        ...AccountNames
        error
        ...AccountBalance
        depositoryInfo {
            ...DepositoryDetails
        }
        creditInfo {
            ...CreditDetails
        }
    }
}
`);

const GET_ACCOUNT = graphql(`
    query getAccount($id: ID!) {
        ...AccountQuery
    }
`);


const UPDATE_ACCOUNT = graphql(`
    mutation UpdateAccount($input: AccountInput!) {
        updateAccount(input: $input) {
            id
            name
        }
    }
`);

function Account() {

    const { id } = useParams();

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_ACCOUNT, { variables: { id: id ?? "0" } });
    const query = useFragment(AccountsQueryFragment, queryData);
    const account = query?.account;

    const [accountName, setAccountName] = useState("");
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => setAccountName(account?.name ?? ""), [account]);

    const [updateAccount, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_ACCOUNT);

    return (queryLoading || !account) ?
        <AccountPlaceholder />
        : (
            <>
                <div className="container mx-auto">
                    <div className="flex min-h-screen flex-col p-4 md:mx-20 lg:mx-40 xl:mx-80">
                        {
                            (queryError) ?
                                <Error message={queryError.message} />
                                :
                                (mutationError) ?
                                    <Error message={mutationError.message} />
                                    :
                                    <>
                                        <div className="flex justify-between m-2">
                                            <div>
                                                <AccountNames account={account} />
                                            </div>
                                            <div>
                                                <button className="m-auto text-xl p-2 rounded-lg bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" disabled={mutationLoading} onClick={() => setShowEdit(true)}>
                                                    {mutationLoading ?
                                                        <BsArrowRepeat className="animate-spin" />
                                                        :
                                                        <BsPencil />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                                            <DepositoryInfo info={account.depositoryInfo} />
                                        </div>
                                        <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                                            <CreditInfo info={account.creditInfo} />
                                        </div>
                                        <div className="text-center rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                                            <AccountBalance account={account} />
                                        </div>
                                    </>
                        }
                    </div>
                </div>
                <Modal isOpen={showEdit}>
                    <form onSubmit={(e) => { e.preventDefault(); updateAccount({ variables: { input: { id: id ?? "-1", name: accountName } } }); setShowEdit(false); }}>
                        <div className="p-8 flex items-start">
                            <div className="mt-3 text-center">
                                <h3 className="text-xl font-light">Edit Account</h3>
                                <div className="w-full">
                                    <div className="text-left">
                                        <label className="block mb-2">Name</label>
                                        <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setAccountName(e.target.value)} value={accountName} required type="text" maxLength={100}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                            <button className="mb-3 sm:mb-0 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-grayPrimary dark:border-grayPrimaryDark text-grayPrimary dark:text-grayPrimaryDark hover:text-graySecondary dark:hover:text-graySecondaryDark hover:bg-baseColor dark:hover:bg-baseColorDark" type="button" onClick={() => { setAccountName(account.name); setShowEdit(false); }}>Cancel</button>
                            <input className="sm:ml-3 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-transparent bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark cursor-pointer hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="submit" value="Save"></input>
                        </div>
                    </form>
                </Modal>
            </>
        )
}

export default Account
