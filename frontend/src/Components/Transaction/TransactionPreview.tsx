import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import DynamicIcon from "../Shared/DynamicIcon";
import MoneyValue from "../Shared/MoneyValue";

const TransactionPreviewFragment = graphql(`
fragment TransactionPreview on Transaction {
    id
    name
    amount
    timestamp
    isPending
    category {
        name
        icon
    }
}
`);

interface Props {
    transaction: FragmentType<typeof TransactionPreviewFragment>,
}

function TransactionPreview({ transaction }: Props) {

    const transactionFragment = useFragment(TransactionPreviewFragment, transaction);
    const { id, name, amount, timestamp, isPending, category } = transactionFragment;

    return (
        <>
            <div className="cursor-pointer border-b-2 border-b-baseColor dark:border-b-baseColorDark last:border-b-0 hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark first:hover:rounded-t-xl last:hover:rounded-b-xl ">
                <Link to={`/transaction/${id}`} className={`${isPending ? "opacity-50" : ""}`} >
                    <div className="flex flex-row p-2">
                        <div className="pr-2 m-auto w-2/12 text-lightPrimary dark:text-lightPrimaryDark">
                            <DynamicIcon name={category.icon} className="mx-auto text-3xl" />
                        </div>
                        <div className="flex flex-row justify-between w-10/12 pr-2">
                            <div className="text-left space-y-1 flex-shrink my-auto w-8/12">
                                <h2 className="text-lg truncate">{name}</h2>
                                <small className="text-sm text-graySecondary dark:text-graySecondaryDark">{category.name}</small>
                            </div>
                            <div className="text-right space-y-1 w-4/12">
                                <h2 className="flex justify-end text-xl">
                                    <MoneyValue value={-amount} />
                                    <div className={`pl-1 my-2 ml-1 rounded-lg ${amount > 0 ? "bg-red dark:bg-redDark" : "bg-green dark:bg-greenDark"}`}></div>
                                </h2>
                                <div>
                                    <small className="text-sm text-graySecondary dark:text-graySecondaryDark">{new Date(timestamp).toUTCString().slice(0, 16)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default TransactionPreview
