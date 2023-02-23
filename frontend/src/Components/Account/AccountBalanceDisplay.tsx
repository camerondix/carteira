import { AccountType } from "../../gql/generated/graphql";
import MoneyValue from "../Shared/MoneyValue";


interface Props {
    balance: number,
    type: AccountType,
}

function AccountBalanceDisplay({ balance, type }: Props) {

    let current = (type === AccountType.Credit || type === AccountType.Loan) ? balance * -1 : balance;

    return current ? <MoneyValue value={current} /> : <></>
}

export default AccountBalanceDisplay
