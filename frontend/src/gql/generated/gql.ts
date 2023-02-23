/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\nfragment AccountQuery on Query {\n    account(id: $id) {\n        id\n        name\n        type\n        ...AccountNames\n        error\n        ...AccountBalance\n        depositoryInfo {\n            ...DepositoryDetails\n        }\n        creditInfo {\n            ...CreditDetails\n        }\n    }\n}\n": types.AccountQueryFragmentDoc,
    "\n    query getAccount($id: ID!) {\n        ...AccountQuery\n    }\n": types.GetAccountDocument,
    "\n    mutation UpdateAccount($input: AccountInput!) {\n        updateAccount(input: $input) {\n            id\n            name\n        }\n    }\n": types.UpdateAccountDocument,
    "\nfragment AccountBalance on Account {\n    type\n    currentBalance {\n        ...BalanceUtilization\n        timestamp\n        current\n        available\n        limit\n    }\n}\n": types.AccountBalanceFragmentDoc,
    "\nfragment AccountNames on Account {\n    officialName\n    name\n    subtype\n    mask\n}\n": types.AccountNamesFragmentDoc,
    "\nfragment AccountPreview on Account {\n    id\n    name\n    type\n    subtype\n    currentBalance {\n      current\n      timestamp\n      ...BalanceUtilization\n    }\n}\n": types.AccountPreviewFragmentDoc,
    "\nfragment AccountPreviewGroup on Account {\n    id\n    type\n    currentBalance {\n        current\n    }\n    ...AccountPreviewGroupLabel\n    ...AccountPreview\n}\n": types.AccountPreviewGroupFragmentDoc,
    "\nfragment AccountPreviewGroupLabel on Account {\n    type\n    currentBalance {\n        current\n    }\n}\n": types.AccountPreviewGroupLabelFragmentDoc,
    "\nfragment AccountsQuery on Query {\n    accounts {\n        id\n        type\n        ...AccountPreviewGroup\n    }\n}\n": types.AccountsQueryFragmentDoc,
    "\n    query getAccounts {\n        ...AccountsQuery\n    }\n": types.GetAccountsDocument,
    "\nfragment AprDetails on Apr {\n    percentage\n    type\n    balanceSubjectToApr\n    interestChargeAmount\n}\n": types.AprDetailsFragmentDoc,
    "\nfragment CreditDetails on CreditInfo {\n    isOverdue\n    lastPaymentAmount\n    lastPaymentDate\n    lastStatementDate\n    lastStatementBalance\n    minimumPayment\n    nextPaymentDueDate\n    aprs {\n        ...AprDetails\n    }\n}\n": types.CreditDetailsFragmentDoc,
    "\nfragment BalanceUtilization on Balance {\n    limit\n    current\n}\n": types.BalanceUtilizationFragmentDoc,
    "\nfragment DepositoryDetails on DepositoryInfo {\n    routingNumber\n    accountNumber\n}\n": types.DepositoryDetailsFragmentDoc,
    "\nfragment TransactionsQuery on Query {\n    transactions (first: $first, after: $cursor) {\n        edges {\n            node {\n                ...Transactions\n            }\n        }\n        pageInfo {\n            endCursor\n            hasNextPage\n        }\n    }\n}\n": types.TransactionsQueryFragmentDoc,
    "\n    query getTransactions($first: Int!, $cursor: String) {\n        ...TransactionsQuery\n    }\n": types.GetTransactionsDocument,
    "\nfragment CategoryPreview on Category {\n    id\n    name\n    icon\n    description\n}\n": types.CategoryPreviewFragmentDoc,
    "\nfragment CategoryPreviewGroup on Category {\n    id\n    ...CategoryPreview\n}\n": types.CategoryPreviewGroupFragmentDoc,
    "\nfragment TransactionQuery on Query {\n    transaction(id: $id) {\n        id\n        account {\n            name\n        }\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n        name\n        amount\n        timestamp\n        isPending\n        merchantName\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n": types.TransactionQueryFragmentDoc,
    "\n    query getTransaction($id: ID!) {\n        ...TransactionQuery\n    }\n": types.GetTransactionDocument,
    "\nmutation UpdateTransaction($input: TransactionInput!) {\n    updateTransaction(input: $input) {\n        id\n        name\n        timestamp\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n": types.UpdateTransactionDocument,
    "\nmutation UpdateLocation($input: LocationInput!) {\n    updateLocation(input: $input) {\n        id\n        merchantName\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n    }\n}\n": types.UpdateLocationDocument,
    "\nmutation UpdatePaymentMeta($input: PaymentMetaInput!) {\n    updatePaymentMeta(input: $input) {\n        id\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n    }\n}\n": types.UpdatePaymentMetaDocument,
    "\nfragment TransactionCategory on Category {\n    id\n    name\n    icon\n    description\n}\n": types.TransactionCategoryFragmentDoc,
    "\nfragment TransactionLocation on Location {\n    address\n    city\n    region\n    postalCode\n    latitude\n    longitude\n}\n": types.TransactionLocationFragmentDoc,
    "\nfragment TransactionPaymentMeta on PaymentMeta {\n    referenceNumber\n    ppdId\n    payee\n    byOrderOf\n    payer\n    method\n    processor\n    reason\n}\n": types.TransactionPaymentMetaFragmentDoc,
    "\nfragment TransactionPreview on Transaction {\n    id\n    name\n    amount\n    timestamp\n    isPending\n    category {\n        name\n        icon\n    }\n}\n": types.TransactionPreviewFragmentDoc,
    "\nfragment TransactionPreviewGroup on Transaction {\n    id\n    ...TransactionPreview\n}\n": types.TransactionPreviewGroupFragmentDoc,
    "\nfragment Transactions on Transaction {\n    id\n    timestamp\n    ...TransactionPreviewGroup\n}\n": types.TransactionsFragmentDoc,
    "\nfragment CategoriesQuery on Query {\n    categories {\n        id\n        name\n        icon\n        description\n        parent {\n            id\n        }\n        ...CategoryPreviewGroup\n    }\n}\n": types.CategoriesQueryFragmentDoc,
    "\n    query getCategories {\n        ...CategoriesQuery\n    }\n": types.GetCategoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountQuery on Query {\n    account(id: $id) {\n        id\n        name\n        type\n        ...AccountNames\n        error\n        ...AccountBalance\n        depositoryInfo {\n            ...DepositoryDetails\n        }\n        creditInfo {\n            ...CreditDetails\n        }\n    }\n}\n"): (typeof documents)["\nfragment AccountQuery on Query {\n    account(id: $id) {\n        id\n        name\n        type\n        ...AccountNames\n        error\n        ...AccountBalance\n        depositoryInfo {\n            ...DepositoryDetails\n        }\n        creditInfo {\n            ...CreditDetails\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAccount($id: ID!) {\n        ...AccountQuery\n    }\n"): (typeof documents)["\n    query getAccount($id: ID!) {\n        ...AccountQuery\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateAccount($input: AccountInput!) {\n        updateAccount(input: $input) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateAccount($input: AccountInput!) {\n        updateAccount(input: $input) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountBalance on Account {\n    type\n    currentBalance {\n        ...BalanceUtilization\n        timestamp\n        current\n        available\n        limit\n    }\n}\n"): (typeof documents)["\nfragment AccountBalance on Account {\n    type\n    currentBalance {\n        ...BalanceUtilization\n        timestamp\n        current\n        available\n        limit\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountNames on Account {\n    officialName\n    name\n    subtype\n    mask\n}\n"): (typeof documents)["\nfragment AccountNames on Account {\n    officialName\n    name\n    subtype\n    mask\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountPreview on Account {\n    id\n    name\n    type\n    subtype\n    currentBalance {\n      current\n      timestamp\n      ...BalanceUtilization\n    }\n}\n"): (typeof documents)["\nfragment AccountPreview on Account {\n    id\n    name\n    type\n    subtype\n    currentBalance {\n      current\n      timestamp\n      ...BalanceUtilization\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountPreviewGroup on Account {\n    id\n    type\n    currentBalance {\n        current\n    }\n    ...AccountPreviewGroupLabel\n    ...AccountPreview\n}\n"): (typeof documents)["\nfragment AccountPreviewGroup on Account {\n    id\n    type\n    currentBalance {\n        current\n    }\n    ...AccountPreviewGroupLabel\n    ...AccountPreview\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountPreviewGroupLabel on Account {\n    type\n    currentBalance {\n        current\n    }\n}\n"): (typeof documents)["\nfragment AccountPreviewGroupLabel on Account {\n    type\n    currentBalance {\n        current\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AccountsQuery on Query {\n    accounts {\n        id\n        type\n        ...AccountPreviewGroup\n    }\n}\n"): (typeof documents)["\nfragment AccountsQuery on Query {\n    accounts {\n        id\n        type\n        ...AccountPreviewGroup\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAccounts {\n        ...AccountsQuery\n    }\n"): (typeof documents)["\n    query getAccounts {\n        ...AccountsQuery\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment AprDetails on Apr {\n    percentage\n    type\n    balanceSubjectToApr\n    interestChargeAmount\n}\n"): (typeof documents)["\nfragment AprDetails on Apr {\n    percentage\n    type\n    balanceSubjectToApr\n    interestChargeAmount\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CreditDetails on CreditInfo {\n    isOverdue\n    lastPaymentAmount\n    lastPaymentDate\n    lastStatementDate\n    lastStatementBalance\n    minimumPayment\n    nextPaymentDueDate\n    aprs {\n        ...AprDetails\n    }\n}\n"): (typeof documents)["\nfragment CreditDetails on CreditInfo {\n    isOverdue\n    lastPaymentAmount\n    lastPaymentDate\n    lastStatementDate\n    lastStatementBalance\n    minimumPayment\n    nextPaymentDueDate\n    aprs {\n        ...AprDetails\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment BalanceUtilization on Balance {\n    limit\n    current\n}\n"): (typeof documents)["\nfragment BalanceUtilization on Balance {\n    limit\n    current\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment DepositoryDetails on DepositoryInfo {\n    routingNumber\n    accountNumber\n}\n"): (typeof documents)["\nfragment DepositoryDetails on DepositoryInfo {\n    routingNumber\n    accountNumber\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionsQuery on Query {\n    transactions (first: $first, after: $cursor) {\n        edges {\n            node {\n                ...Transactions\n            }\n        }\n        pageInfo {\n            endCursor\n            hasNextPage\n        }\n    }\n}\n"): (typeof documents)["\nfragment TransactionsQuery on Query {\n    transactions (first: $first, after: $cursor) {\n        edges {\n            node {\n                ...Transactions\n            }\n        }\n        pageInfo {\n            endCursor\n            hasNextPage\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTransactions($first: Int!, $cursor: String) {\n        ...TransactionsQuery\n    }\n"): (typeof documents)["\n    query getTransactions($first: Int!, $cursor: String) {\n        ...TransactionsQuery\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CategoryPreview on Category {\n    id\n    name\n    icon\n    description\n}\n"): (typeof documents)["\nfragment CategoryPreview on Category {\n    id\n    name\n    icon\n    description\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CategoryPreviewGroup on Category {\n    id\n    ...CategoryPreview\n}\n"): (typeof documents)["\nfragment CategoryPreviewGroup on Category {\n    id\n    ...CategoryPreview\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionQuery on Query {\n    transaction(id: $id) {\n        id\n        account {\n            name\n        }\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n        name\n        amount\n        timestamp\n        isPending\n        merchantName\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n"): (typeof documents)["\nfragment TransactionQuery on Query {\n    transaction(id: $id) {\n        id\n        account {\n            name\n        }\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n        name\n        amount\n        timestamp\n        isPending\n        merchantName\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTransaction($id: ID!) {\n        ...TransactionQuery\n    }\n"): (typeof documents)["\n    query getTransaction($id: ID!) {\n        ...TransactionQuery\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateTransaction($input: TransactionInput!) {\n    updateTransaction(input: $input) {\n        id\n        name\n        timestamp\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n"): (typeof documents)["\nmutation UpdateTransaction($input: TransactionInput!) {\n    updateTransaction(input: $input) {\n        id\n        name\n        timestamp\n        category {\n            id\n            ...TransactionCategory\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateLocation($input: LocationInput!) {\n    updateLocation(input: $input) {\n        id\n        merchantName\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n    }\n}\n"): (typeof documents)["\nmutation UpdateLocation($input: LocationInput!) {\n    updateLocation(input: $input) {\n        id\n        merchantName\n        location {\n            ...TransactionLocation\n            address\n            city\n            region\n            postalCode\n            latitude\n            longitude\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdatePaymentMeta($input: PaymentMetaInput!) {\n    updatePaymentMeta(input: $input) {\n        id\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n    }\n}\n"): (typeof documents)["\nmutation UpdatePaymentMeta($input: PaymentMetaInput!) {\n    updatePaymentMeta(input: $input) {\n        id\n        paymentMeta {\n            ...TransactionPaymentMeta\n            referenceNumber\n            ppdId\n            payee\n            byOrderOf\n            payer\n            method\n            processor\n            reason\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionCategory on Category {\n    id\n    name\n    icon\n    description\n}\n"): (typeof documents)["\nfragment TransactionCategory on Category {\n    id\n    name\n    icon\n    description\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionLocation on Location {\n    address\n    city\n    region\n    postalCode\n    latitude\n    longitude\n}\n"): (typeof documents)["\nfragment TransactionLocation on Location {\n    address\n    city\n    region\n    postalCode\n    latitude\n    longitude\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionPaymentMeta on PaymentMeta {\n    referenceNumber\n    ppdId\n    payee\n    byOrderOf\n    payer\n    method\n    processor\n    reason\n}\n"): (typeof documents)["\nfragment TransactionPaymentMeta on PaymentMeta {\n    referenceNumber\n    ppdId\n    payee\n    byOrderOf\n    payer\n    method\n    processor\n    reason\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionPreview on Transaction {\n    id\n    name\n    amount\n    timestamp\n    isPending\n    category {\n        name\n        icon\n    }\n}\n"): (typeof documents)["\nfragment TransactionPreview on Transaction {\n    id\n    name\n    amount\n    timestamp\n    isPending\n    category {\n        name\n        icon\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment TransactionPreviewGroup on Transaction {\n    id\n    ...TransactionPreview\n}\n"): (typeof documents)["\nfragment TransactionPreviewGroup on Transaction {\n    id\n    ...TransactionPreview\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment Transactions on Transaction {\n    id\n    timestamp\n    ...TransactionPreviewGroup\n}\n"): (typeof documents)["\nfragment Transactions on Transaction {\n    id\n    timestamp\n    ...TransactionPreviewGroup\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nfragment CategoriesQuery on Query {\n    categories {\n        id\n        name\n        icon\n        description\n        parent {\n            id\n        }\n        ...CategoryPreviewGroup\n    }\n}\n"): (typeof documents)["\nfragment CategoriesQuery on Query {\n    categories {\n        id\n        name\n        icon\n        description\n        parent {\n            id\n        }\n        ...CategoryPreviewGroup\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCategories {\n        ...CategoriesQuery\n    }\n"): (typeof documents)["\n    query getCategories {\n        ...CategoriesQuery\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;