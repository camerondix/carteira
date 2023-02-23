/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A Java LocalDate type */
  LocalDate: any;
  /** A Java LocalDateTime type */
  LocalDateTime: any;
};

export type Account = {
  __typename?: 'Account';
  creditInfo: CreditInfo;
  currentBalance?: Maybe<Balance>;
  depositoryInfo: DepositoryInfo;
  error?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mask?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  officialName: Scalars['String'];
  subtype: AccountSubtype;
  type: AccountType;
};

export type AccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum AccountSubtype {
  Auto = 'AUTO',
  Brokerage = 'BROKERAGE',
  Business = 'BUSINESS',
  CashIsa = 'CASH_ISA',
  CashManagement = 'CASH_MANAGEMENT',
  Cd = 'CD',
  Checking = 'CHECKING',
  Commercial = 'COMMERCIAL',
  Construction = 'CONSTRUCTION',
  Consumer = 'CONSUMER',
  CreditCard = 'CREDIT_CARD',
  CryptoExchange = 'CRYPTO_EXCHANGE',
  Ebt = 'EBT',
  EducationSavingsAccount = 'EDUCATION_SAVINGS_ACCOUNT',
  EnumUnknown = 'ENUM_UNKNOWN',
  FixedAnnuity = 'FIXED_ANNUITY',
  Gic = 'GIC',
  HealthReimbursementArrangement = 'HEALTH_REIMBURSEMENT_ARRANGEMENT',
  HomeEquity = 'HOME_EQUITY',
  Hsa = 'HSA',
  Ira = 'IRA',
  Isa = 'ISA',
  Keogh = 'KEOGH',
  Lif = 'LIF',
  LifeInsurance = 'LIFE_INSURANCE',
  LineOfCredit = 'LINE_OF_CREDIT',
  Lira = 'LIRA',
  Loan = 'LOAN',
  Lrif = 'LRIF',
  Lrsp = 'LRSP',
  MoneyMarket = 'MONEY_MARKET',
  Mortgage = 'MORTGAGE',
  MutualFund = 'MUTUAL_FUND',
  NonCustodialWallet = 'NON_CUSTODIAL_WALLET',
  NonTaxableBrokerageAccount = 'NON_TAXABLE_BROKERAGE_ACCOUNT',
  Null = 'NULL',
  Other = 'OTHER',
  OtherAnnuity = 'OTHER_ANNUITY',
  OtherInsurance = 'OTHER_INSURANCE',
  Overdraft = 'OVERDRAFT',
  Paypal = 'PAYPAL',
  Payroll = 'PAYROLL',
  Pension = 'PENSION',
  Prepaid = 'PREPAID',
  Prif = 'PRIF',
  ProfitSharingPlan = 'PROFIT_SHARING_PLAN',
  Rdsp = 'RDSP',
  Recurring = 'RECURRING',
  Resp = 'RESP',
  Retirement = 'RETIREMENT',
  Rewards = 'REWARDS',
  Rlif = 'RLIF',
  Roth = 'ROTH',
  Roth_401K = 'ROTH_401K',
  Rrif = 'RRIF',
  Rrsp = 'RRSP',
  SafeDeposit = 'SAFE_DEPOSIT',
  Sarsep = 'SARSEP',
  Savings = 'SAVINGS',
  SepIra = 'SEP_IRA',
  SimpleIra = 'SIMPLE_IRA',
  Sipp = 'SIPP',
  StockPlan = 'STOCK_PLAN',
  Student = 'STUDENT',
  Tfsa = 'TFSA',
  ThriftSavingsPlan = 'THRIFT_SAVINGS_PLAN',
  Trust = 'TRUST',
  Ugma = 'UGMA',
  Utma = 'UTMA',
  VariableAnnuity = 'VARIABLE_ANNUITY',
  '401A' = '_401A',
  '401K' = '_401K',
  '403B' = '_403B',
  '457B' = '_457B',
  '529Plan' = '_529PLAN'
}

export enum AccountType {
  Brokerage = 'BROKERAGE',
  Cash = 'CASH',
  Credit = 'CREDIT',
  EnumUnknown = 'ENUM_UNKNOWN',
  Investment = 'INVESTMENT',
  Loan = 'LOAN',
  Other = 'OTHER'
}

export type Apr = {
  __typename?: 'Apr';
  balanceSubjectToApr?: Maybe<Scalars['Float']>;
  interestChargeAmount?: Maybe<Scalars['Float']>;
  percentage: Scalars['Float'];
  type: AprType;
};

export enum AprType {
  BalanceTransferApr = 'BALANCE_TRANSFER_APR',
  CashApr = 'CASH_APR',
  PurchaseApr = 'PURCHASE_APR',
  Special = 'SPECIAL'
}

export type Balance = {
  __typename?: 'Balance';
  account: Account;
  available?: Maybe<Scalars['Float']>;
  current?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  limit?: Maybe<Scalars['Float']>;
  timestamp: Scalars['LocalDateTime'];
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Category>;
};

export type CreditInfo = {
  __typename?: 'CreditInfo';
  aprs: Array<Apr>;
  isOverdue?: Maybe<Scalars['Boolean']>;
  lastPaymentAmount?: Maybe<Scalars['Float']>;
  lastPaymentDate?: Maybe<Scalars['LocalDate']>;
  lastStatementBalance?: Maybe<Scalars['Float']>;
  lastStatementDate?: Maybe<Scalars['LocalDate']>;
  minimumPayment?: Maybe<Scalars['Float']>;
  nextPaymentDueDate?: Maybe<Scalars['LocalDate']>;
};

export type DepositoryInfo = {
  __typename?: 'DepositoryInfo';
  accountNumber?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  merchantName?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  transactionId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateAccount: Account;
  updateLocation: Transaction;
  updatePaymentMeta: Transaction;
  updateTransaction: Transaction;
};


export type MutationUpdateAccountArgs = {
  input: AccountInput;
};


export type MutationUpdateLocationArgs = {
  input: LocationInput;
};


export type MutationUpdatePaymentMetaArgs = {
  input: PaymentMetaInput;
};


export type MutationUpdateTransactionArgs = {
  input: TransactionInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type PaymentMeta = {
  __typename?: 'PaymentMeta';
  byOrderOf?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  payee?: Maybe<Scalars['String']>;
  payer?: Maybe<Scalars['String']>;
  ppdId?: Maybe<Scalars['String']>;
  processor?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  referenceNumber?: Maybe<Scalars['String']>;
};

export type PaymentMetaInput = {
  byOrderOf?: InputMaybe<Scalars['String']>;
  method?: InputMaybe<Scalars['String']>;
  payee?: InputMaybe<Scalars['String']>;
  payer?: InputMaybe<Scalars['String']>;
  ppdId?: InputMaybe<Scalars['String']>;
  processor?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  referenceNumber?: InputMaybe<Scalars['String']>;
  transactionId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  accounts: Array<Account>;
  balance: Balance;
  categories: Array<Category>;
  category: Category;
  transaction: Transaction;
  transactions: TransactionConnection;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryBalanceArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type Transaction = {
  __typename?: 'Transaction';
  account: Account;
  amount: Scalars['Float'];
  category: Category;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isPending?: Maybe<Scalars['Boolean']>;
  location: Location;
  merchantName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  paymentMeta: PaymentMeta;
  timestamp: Scalars['LocalDateTime'];
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor: Scalars['String'];
  node: Transaction;
};

export type TransactionInput = {
  categoryId: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  timestamp: Scalars['LocalDateTime'];
};

export type AccountQueryFragment = { __typename?: 'Query', account: (
    { __typename?: 'Account', id: string, name: string, type: AccountType, error?: string | null, depositoryInfo: (
      { __typename?: 'DepositoryInfo' }
      & { ' $fragmentRefs'?: { 'DepositoryDetailsFragment': DepositoryDetailsFragment } }
    ), creditInfo: (
      { __typename?: 'CreditInfo' }
      & { ' $fragmentRefs'?: { 'CreditDetailsFragment': CreditDetailsFragment } }
    ) }
    & { ' $fragmentRefs'?: { 'AccountNamesFragment': AccountNamesFragment;'AccountBalanceFragment': AccountBalanceFragment } }
  ) } & { ' $fragmentName'?: 'AccountQueryFragment' };

export type GetAccountQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAccountQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'AccountQueryFragment': AccountQueryFragment } }
);

export type UpdateAccountMutationVariables = Exact<{
  input: AccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, name: string } };

export type AccountBalanceFragment = { __typename?: 'Account', type: AccountType, currentBalance?: (
    { __typename?: 'Balance', timestamp: any, current?: number | null, available?: number | null, limit?: number | null }
    & { ' $fragmentRefs'?: { 'BalanceUtilizationFragment': BalanceUtilizationFragment } }
  ) | null } & { ' $fragmentName'?: 'AccountBalanceFragment' };

export type AccountNamesFragment = { __typename?: 'Account', officialName: string, name: string, subtype: AccountSubtype, mask?: string | null } & { ' $fragmentName'?: 'AccountNamesFragment' };

export type AccountPreviewFragment = { __typename?: 'Account', id: string, name: string, type: AccountType, subtype: AccountSubtype, currentBalance?: (
    { __typename?: 'Balance', current?: number | null, timestamp: any }
    & { ' $fragmentRefs'?: { 'BalanceUtilizationFragment': BalanceUtilizationFragment } }
  ) | null } & { ' $fragmentName'?: 'AccountPreviewFragment' };

export type AccountPreviewGroupFragment = (
  { __typename?: 'Account', id: string, type: AccountType, currentBalance?: { __typename?: 'Balance', current?: number | null } | null }
  & { ' $fragmentRefs'?: { 'AccountPreviewGroupLabelFragment': AccountPreviewGroupLabelFragment;'AccountPreviewFragment': AccountPreviewFragment } }
) & { ' $fragmentName'?: 'AccountPreviewGroupFragment' };

export type AccountPreviewGroupLabelFragment = { __typename?: 'Account', type: AccountType, currentBalance?: { __typename?: 'Balance', current?: number | null } | null } & { ' $fragmentName'?: 'AccountPreviewGroupLabelFragment' };

export type AccountsQueryFragment = { __typename?: 'Query', accounts: Array<(
    { __typename?: 'Account', id: string, type: AccountType }
    & { ' $fragmentRefs'?: { 'AccountPreviewGroupFragment': AccountPreviewGroupFragment } }
  )> } & { ' $fragmentName'?: 'AccountsQueryFragment' };

export type GetAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'AccountsQueryFragment': AccountsQueryFragment } }
);

export type AprDetailsFragment = { __typename?: 'Apr', percentage: number, type: AprType, balanceSubjectToApr?: number | null, interestChargeAmount?: number | null } & { ' $fragmentName'?: 'AprDetailsFragment' };

export type CreditDetailsFragment = { __typename?: 'CreditInfo', isOverdue?: boolean | null, lastPaymentAmount?: number | null, lastPaymentDate?: any | null, lastStatementDate?: any | null, lastStatementBalance?: number | null, minimumPayment?: number | null, nextPaymentDueDate?: any | null, aprs: Array<(
    { __typename?: 'Apr' }
    & { ' $fragmentRefs'?: { 'AprDetailsFragment': AprDetailsFragment } }
  )> } & { ' $fragmentName'?: 'CreditDetailsFragment' };

export type BalanceUtilizationFragment = { __typename?: 'Balance', limit?: number | null, current?: number | null } & { ' $fragmentName'?: 'BalanceUtilizationFragment' };

export type DepositoryDetailsFragment = { __typename?: 'DepositoryInfo', routingNumber?: string | null, accountNumber?: string | null } & { ' $fragmentName'?: 'DepositoryDetailsFragment' };

export type TransactionsQueryFragment = { __typename?: 'Query', transactions: { __typename?: 'TransactionConnection', edges: Array<{ __typename?: 'TransactionEdge', node: (
        { __typename?: 'Transaction' }
        & { ' $fragmentRefs'?: { 'TransactionsFragment': TransactionsFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } } & { ' $fragmentName'?: 'TransactionsQueryFragment' };

export type GetTransactionsQueryVariables = Exact<{
  first: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'TransactionsQueryFragment': TransactionsQueryFragment } }
);

export type CategoryPreviewFragment = { __typename?: 'Category', id: string, name: string, icon: string, description?: string | null } & { ' $fragmentName'?: 'CategoryPreviewFragment' };

export type CategoryPreviewGroupFragment = (
  { __typename?: 'Category', id: string }
  & { ' $fragmentRefs'?: { 'CategoryPreviewFragment': CategoryPreviewFragment } }
) & { ' $fragmentName'?: 'CategoryPreviewGroupFragment' };

export type TransactionQueryFragment = { __typename?: 'Query', transaction: { __typename?: 'Transaction', id: string, name: string, amount: number, timestamp: any, isPending?: boolean | null, merchantName?: string | null, account: { __typename?: 'Account', name: string }, location: (
      { __typename?: 'Location', address?: string | null, city?: string | null, region?: string | null, postalCode?: string | null, latitude?: number | null, longitude?: number | null }
      & { ' $fragmentRefs'?: { 'TransactionLocationFragment': TransactionLocationFragment } }
    ), paymentMeta: (
      { __typename?: 'PaymentMeta', referenceNumber?: string | null, ppdId?: string | null, payee?: string | null, byOrderOf?: string | null, payer?: string | null, method?: string | null, processor?: string | null, reason?: string | null }
      & { ' $fragmentRefs'?: { 'TransactionPaymentMetaFragment': TransactionPaymentMetaFragment } }
    ), category: (
      { __typename?: 'Category', id: string }
      & { ' $fragmentRefs'?: { 'TransactionCategoryFragment': TransactionCategoryFragment } }
    ) } } & { ' $fragmentName'?: 'TransactionQueryFragment' };

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTransactionQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'TransactionQueryFragment': TransactionQueryFragment } }
);

export type UpdateTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction: { __typename?: 'Transaction', id: string, name: string, timestamp: any, category: (
      { __typename?: 'Category', id: string }
      & { ' $fragmentRefs'?: { 'TransactionCategoryFragment': TransactionCategoryFragment } }
    ) } };

export type UpdateLocationMutationVariables = Exact<{
  input: LocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'Transaction', id: string, merchantName?: string | null, location: (
      { __typename?: 'Location', address?: string | null, city?: string | null, region?: string | null, postalCode?: string | null, latitude?: number | null, longitude?: number | null }
      & { ' $fragmentRefs'?: { 'TransactionLocationFragment': TransactionLocationFragment } }
    ) } };

export type UpdatePaymentMetaMutationVariables = Exact<{
  input: PaymentMetaInput;
}>;


export type UpdatePaymentMetaMutation = { __typename?: 'Mutation', updatePaymentMeta: { __typename?: 'Transaction', id: string, paymentMeta: (
      { __typename?: 'PaymentMeta', referenceNumber?: string | null, ppdId?: string | null, payee?: string | null, byOrderOf?: string | null, payer?: string | null, method?: string | null, processor?: string | null, reason?: string | null }
      & { ' $fragmentRefs'?: { 'TransactionPaymentMetaFragment': TransactionPaymentMetaFragment } }
    ) } };

export type TransactionCategoryFragment = { __typename?: 'Category', id: string, name: string, icon: string, description?: string | null } & { ' $fragmentName'?: 'TransactionCategoryFragment' };

export type TransactionLocationFragment = { __typename?: 'Location', address?: string | null, city?: string | null, region?: string | null, postalCode?: string | null, latitude?: number | null, longitude?: number | null } & { ' $fragmentName'?: 'TransactionLocationFragment' };

export type TransactionPaymentMetaFragment = { __typename?: 'PaymentMeta', referenceNumber?: string | null, ppdId?: string | null, payee?: string | null, byOrderOf?: string | null, payer?: string | null, method?: string | null, processor?: string | null, reason?: string | null } & { ' $fragmentName'?: 'TransactionPaymentMetaFragment' };

export type TransactionPreviewFragment = { __typename?: 'Transaction', id: string, name: string, amount: number, timestamp: any, isPending?: boolean | null, category: { __typename?: 'Category', name: string, icon: string } } & { ' $fragmentName'?: 'TransactionPreviewFragment' };

export type TransactionPreviewGroupFragment = (
  { __typename?: 'Transaction', id: string }
  & { ' $fragmentRefs'?: { 'TransactionPreviewFragment': TransactionPreviewFragment } }
) & { ' $fragmentName'?: 'TransactionPreviewGroupFragment' };

export type TransactionsFragment = (
  { __typename?: 'Transaction', id: string, timestamp: any }
  & { ' $fragmentRefs'?: { 'TransactionPreviewGroupFragment': TransactionPreviewGroupFragment } }
) & { ' $fragmentName'?: 'TransactionsFragment' };

export type CategoriesQueryFragment = { __typename?: 'Query', categories: Array<(
    { __typename?: 'Category', id: string, name: string, icon: string, description?: string | null, parent?: { __typename?: 'Category', id: string } | null }
    & { ' $fragmentRefs'?: { 'CategoryPreviewGroupFragment': CategoryPreviewGroupFragment } }
  )> } & { ' $fragmentName'?: 'CategoriesQueryFragment' };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'CategoriesQueryFragment': CategoriesQueryFragment } }
);

export const AccountNamesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountNames"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"mask"}}]}}]} as unknown as DocumentNode<AccountNamesFragment, unknown>;
export const BalanceUtilizationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BalanceUtilization"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Balance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]} as unknown as DocumentNode<BalanceUtilizationFragment, unknown>;
export const AccountBalanceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountBalance"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"currentBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BalanceUtilization"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}},...BalanceUtilizationFragmentDoc.definitions]} as unknown as DocumentNode<AccountBalanceFragment, unknown>;
export const DepositoryDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DepositoryDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DepositoryInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}}]}}]} as unknown as DocumentNode<DepositoryDetailsFragment, unknown>;
export const AprDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AprDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Apr"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"balanceSubjectToApr"}},{"kind":"Field","name":{"kind":"Name","value":"interestChargeAmount"}}]}}]} as unknown as DocumentNode<AprDetailsFragment, unknown>;
export const CreditDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CreditDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreditInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isOverdue"}},{"kind":"Field","name":{"kind":"Name","value":"lastPaymentAmount"}},{"kind":"Field","name":{"kind":"Name","value":"lastPaymentDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastStatementDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastStatementBalance"}},{"kind":"Field","name":{"kind":"Name","value":"minimumPayment"}},{"kind":"Field","name":{"kind":"Name","value":"nextPaymentDueDate"}},{"kind":"Field","name":{"kind":"Name","value":"aprs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AprDetails"}}]}}]}},...AprDetailsFragmentDoc.definitions]} as unknown as DocumentNode<CreditDetailsFragment, unknown>;
export const AccountQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountNames"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountBalance"}},{"kind":"Field","name":{"kind":"Name","value":"depositoryInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DepositoryDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CreditDetails"}}]}}]}}]}},...AccountNamesFragmentDoc.definitions,...AccountBalanceFragmentDoc.definitions,...DepositoryDetailsFragmentDoc.definitions,...CreditDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AccountQueryFragment, unknown>;
export const AccountPreviewGroupLabelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPreviewGroupLabel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"currentBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]}}]} as unknown as DocumentNode<AccountPreviewGroupLabelFragment, unknown>;
export const AccountPreviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"currentBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BalanceUtilization"}}]}}]}},...BalanceUtilizationFragmentDoc.definitions]} as unknown as DocumentNode<AccountPreviewFragment, unknown>;
export const AccountPreviewGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPreviewGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Account"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"currentBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPreviewGroupLabel"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPreview"}}]}},...AccountPreviewGroupLabelFragmentDoc.definitions,...AccountPreviewFragmentDoc.definitions]} as unknown as DocumentNode<AccountPreviewGroupFragment, unknown>;
export const AccountsQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountsQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPreviewGroup"}}]}}]}},...AccountPreviewGroupFragmentDoc.definitions]} as unknown as DocumentNode<AccountsQueryFragment, unknown>;
export const TransactionPreviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"isPending"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<TransactionPreviewFragment, unknown>;
export const TransactionPreviewGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPreviewGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPreview"}}]}},...TransactionPreviewFragmentDoc.definitions]} as unknown as DocumentNode<TransactionPreviewGroupFragment, unknown>;
export const TransactionsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Transactions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPreviewGroup"}}]}},...TransactionPreviewGroupFragmentDoc.definitions]} as unknown as DocumentNode<TransactionsFragment, unknown>;
export const TransactionsQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionsQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Transactions"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...TransactionsFragmentDoc.definitions]} as unknown as DocumentNode<TransactionsQueryFragment, unknown>;
export const TransactionLocationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionLocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]} as unknown as DocumentNode<TransactionLocationFragment, unknown>;
export const TransactionPaymentMetaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionPaymentMeta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMeta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"ppdId"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"byOrderOf"}},{"kind":"Field","name":{"kind":"Name","value":"payer"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"processor"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]} as unknown as DocumentNode<TransactionPaymentMetaFragment, unknown>;
export const TransactionCategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<TransactionCategoryFragment, unknown>;
export const TransactionQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionLocation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPaymentMeta"}},{"kind":"Field","name":{"kind":"Name","value":"referenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"ppdId"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"byOrderOf"}},{"kind":"Field","name":{"kind":"Name","value":"payer"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"processor"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"isPending"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategory"}}]}}]}}]}},...TransactionLocationFragmentDoc.definitions,...TransactionPaymentMetaFragmentDoc.definitions,...TransactionCategoryFragmentDoc.definitions]} as unknown as DocumentNode<TransactionQueryFragment, unknown>;
export const CategoryPreviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryPreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CategoryPreviewFragment, unknown>;
export const CategoryPreviewGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryPreviewGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryPreview"}}]}},...CategoryPreviewFragmentDoc.definitions]} as unknown as DocumentNode<CategoryPreviewGroupFragment, unknown>;
export const CategoriesQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoriesQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryPreviewGroup"}}]}}]}},...CategoryPreviewGroupFragmentDoc.definitions]} as unknown as DocumentNode<CategoriesQueryFragment, unknown>;
export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountQuery"}}]}},...AccountQueryFragmentDoc.definitions]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const UpdateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const GetAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountsQuery"}}]}},...AccountsQueryFragmentDoc.definitions]} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionsQuery"}}]}},...TransactionsQueryFragmentDoc.definitions]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionQuery"}}]}},...TransactionQueryFragmentDoc.definitions]} as unknown as DocumentNode<GetTransactionQuery, GetTransactionQueryVariables>;
export const UpdateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionCategory"}}]}}]}}]}},...TransactionCategoryFragmentDoc.definitions]} as unknown as DocumentNode<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const UpdateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionLocation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}},...TransactionLocationFragmentDoc.definitions]} as unknown as DocumentNode<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const UpdatePaymentMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePaymentMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMetaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePaymentMeta"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionPaymentMeta"}},{"kind":"Field","name":{"kind":"Name","value":"referenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"ppdId"}},{"kind":"Field","name":{"kind":"Name","value":"payee"}},{"kind":"Field","name":{"kind":"Name","value":"byOrderOf"}},{"kind":"Field","name":{"kind":"Name","value":"payer"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"processor"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}},...TransactionPaymentMetaFragmentDoc.definitions]} as unknown as DocumentNode<UpdatePaymentMetaMutation, UpdatePaymentMetaMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoriesQuery"}}]}},...CategoriesQueryFragmentDoc.definitions]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;