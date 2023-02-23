import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { BsArrowRepeat, BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { graphql, useFragment } from "../../gql/generated";
import Error from "../Shared/Error";
import Modal from "../Shared/Modal";
import MoneyValue from "../Shared/MoneyValue";
import TransactionPlaceholder from "./Placeholder/TransactionPlaceholder";
import TransactionCategory from "./TransactionCategory";
import TransactionLocation from "./TransactionLocation";
import TransactionPaymentMeta from "./TransactionPaymentMeta";
import UpdateTransaction from "./UpdateTransaction";
import UpdateTransactionCategory from "./UpdateTransactionCategory";
import UpdateTransactionLocation from "./UpdateTransactionLocation";
import UpdateTransactionPaymentMeta from "./UpdateTransactionPaymentMeta";

const TransactionQueryFragment = graphql(`
fragment TransactionQuery on Query {
    transaction(id: $id) {
        id
        account {
            name
        }
        location {
            ...TransactionLocation
            address
            city
            region
            postalCode
            latitude
            longitude
        }
        paymentMeta {
            ...TransactionPaymentMeta
            referenceNumber
            ppdId
            payee
            byOrderOf
            payer
            method
            processor
            reason
        }
        name
        amount
        timestamp
        isPending
        merchantName
        category {
            id
            ...TransactionCategory
        }
    }
}
`);

const GET_TRANSACTION = graphql(`
    query getTransaction($id: ID!) {
        ...TransactionQuery
    }
`);

const UPDATE_TRANSACTION = graphql(`
mutation UpdateTransaction($input: TransactionInput!) {
    updateTransaction(input: $input) {
        id
        name
        timestamp
        category {
            id
            ...TransactionCategory
        }
    }
}
`);

const UPDATE_LOCATION = graphql(`
mutation UpdateLocation($input: LocationInput!) {
    updateLocation(input: $input) {
        id
        merchantName
        location {
            ...TransactionLocation
            address
            city
            region
            postalCode
            latitude
            longitude
        }
    }
}
`);

const UPDATE_PAYMENT_META = graphql(`
mutation UpdatePaymentMeta($input: PaymentMetaInput!) {
    updatePaymentMeta(input: $input) {
        id
        paymentMeta {
            ...TransactionPaymentMeta
            referenceNumber
            ppdId
            payee
            byOrderOf
            payer
            method
            processor
            reason
        }
    }
}
`);

function Transaction() {

    const { id } = useParams();

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_TRANSACTION, { variables: { id: id ?? "0" } });
    const query = useFragment(TransactionQueryFragment, queryData);
    const transaction = query?.transaction;

    const [showEdit, setShowEdit] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showEditLocation, setShowEditLocation] = useState(false);
    const [showEditMeta, setShowEditMeta] = useState(false);

    const [updateTransaction, { loading: transactionMutationLoading, error: transactionMutationError }] = useMutation(UPDATE_TRANSACTION);

    const [updateLocation, { loading: locationMutationLoading, error: locationMutationError }] = useMutation(UPDATE_LOCATION);

    const [updatePaymentMeta, { loading: paymentMetaMutationLoading, error: paymentMetaMutationError }] = useMutation(UPDATE_PAYMENT_META);

    const mutationLoading = transactionMutationLoading || locationMutationLoading || paymentMetaMutationLoading;
    const mutationError = transactionMutationError || locationMutationError || paymentMetaMutationError;

    return ((queryLoading || !transaction) ?
        <TransactionPlaceholder />
        :
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
                                            <h1 className="text-4xl py-2">
                                                <MoneyValue value={-transaction.amount} />
                                            </h1>
                                            <h1 className="text-xl font-bold">{transaction.name}</h1>
                                            <h2 className="text-lg text-graySecondary dark:text-graySecondaryDark">{transaction.account.name}</h2>
                                            <h3 className="text-md text-grayTertiary dark:text-grayTertiaryDark">{new Date(transaction.timestamp).toUTCString().slice(0, 22)}</h3>
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
                                    <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark cursor-pointer" onClick={() => setShowEditCategory(true)}>
                                        <TransactionCategory category={transaction.category} loading={mutationLoading} />
                                    </div>
                                    <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark cursor-pointer" onClick={() => setShowEditLocation(true)}>
                                        <TransactionLocation location={transaction.location} merchant={transaction.merchantName} loading={mutationLoading} />
                                    </div>
                                    <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark cursor-pointer" onClick={() => setShowEditMeta(true)}>
                                        <TransactionPaymentMeta paymentMeta={transaction.paymentMeta} loading={mutationLoading} />
                                    </div>
                                </>
                    }
                </div>
            </div>
            <Modal isOpen={showEdit}>
                <UpdateTransaction name={transaction.name} date={new Date(transaction.timestamp)} onCancel={() => setShowEdit(false)} onSave={(name, timestamp) => { updateTransaction({ variables: { input: { id: transaction.id, name, timestamp, categoryId: transaction.category.id } } }); setShowEdit(false); }} />
            </Modal>
            <Modal isOpen={showEditCategory}>
                <UpdateTransactionCategory id={transaction.category.id} onCancel={() => setShowEditCategory(false)} onSave={(categoryId) => { updateTransaction({ variables: { input: { id: transaction.id, name: transaction.name, timestamp: transaction.timestamp, categoryId } } }); setShowEditCategory(false); }} />
            </Modal>
            <Modal isOpen={showEditLocation}>
                <UpdateTransactionLocation merchant={transaction.merchantName} address={transaction.location.address} city={transaction.location.city} region={transaction.location.region} postalCode={transaction.location.postalCode} latitude={transaction.location.latitude} longitude={transaction.location.longitude} onCancel={() => setShowEditLocation(false)} onSave={(merchantName, address, city, region, postalCode, latitude, longitude) => { updateLocation({ variables: { input: { transactionId: transaction.id, merchantName, address, city, region, postalCode, latitude, longitude } } }); setShowEditLocation(false); }} />
            </Modal>
            <Modal isOpen={showEditMeta}>
                <UpdateTransactionPaymentMeta referenceNumber={transaction.paymentMeta.referenceNumber} ppdId={transaction.paymentMeta.ppdId} payee={transaction.paymentMeta.payee} byOrderOf={transaction.paymentMeta.byOrderOf} payer={transaction.paymentMeta.payer} method={transaction.paymentMeta.method} processor={transaction.paymentMeta.processor} reason={transaction.paymentMeta.reason} onCancel={() => setShowEditMeta(false)} onSave={(referenceNumber, ppdId, payee, byOrderOf, payer, method, processor, reason) => { updatePaymentMeta({ variables: { input: { transactionId: transaction.id, referenceNumber, ppdId, payee, byOrderOf, payer, method, processor, reason } } }); setShowEditMeta(false); }} />
            </Modal>
        </>
    )
}

export default Transaction
