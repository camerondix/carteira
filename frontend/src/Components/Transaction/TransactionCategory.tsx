import { BsArrowRepeat } from "react-icons/bs";
import { RxCaretRight } from "react-icons/rx";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import DynamicIcon from "../Shared/DynamicIcon";

const TransactionCategoryFragment = graphql(`
fragment TransactionCategory on Category {
    id
    name
    icon
    description
}
`);

interface Props {
    category: FragmentType<typeof TransactionCategoryFragment>,
    loading: boolean,
}

function TransactionCategory({ category, loading }: Props) {

    const { name, icon, description } = useFragment(TransactionCategoryFragment, category);

    return (
        <>
            <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Category</h2>
            <div className="flex p-2">
                <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                    <DynamicIcon name={icon} className="m-auto text-3xl" />
                </div>
                <div className="w-4/12 my-auto">
                    <h4 className="text-xl">{name}</h4>
                </div>
                <div className="w-5/12">
                    <p>{description}</p>
                </div>
                <div className="my-auto w-1/12 text-2xl text-graySecondary dark:text-graySecondaryDark">
                    {loading ?
                        <BsArrowRepeat className="animate-spin" />
                        :
                        <RxCaretRight />
                    }
                </div>
            </div>
        </>
    )
}

export default TransactionCategory
