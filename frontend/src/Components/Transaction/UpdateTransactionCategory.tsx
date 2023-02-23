import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import { CategoryPreviewGroupFragmentDoc } from "../../gql/generated/graphql";
import DynamicIcon from "../Shared/DynamicIcon";
import Error from "../Shared/Error";
import CategoryPreviewGroup from "./CategoryPreviewGroup";
import UpdateTransactionCategoryPlaceholder from "./Placeholder/UpdateTransactionCategoryPlaceholder";

const CategoriesQueryFragment = graphql(`
fragment CategoriesQuery on Query {
    categories {
        id
        name
        icon
        description
        parent {
            id
        }
        ...CategoryPreviewGroup
    }
}
`);

const GET_CATEGORIES = graphql(`
    query getCategories {
        ...CategoriesQuery
    }
`);

interface Props {
    id: string,
    onSave: (id: string) => void,
    onCancel: () => void,
}

function UpdateTransactionCategory({ id, onSave, onCancel }: Props) {

    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const query = useFragment(CategoriesQueryFragment, data);
    const categories = useMemo(() => query?.categories ?? [], [query]);

    const groups = new Map<string | undefined, [FragmentType<typeof CategoryPreviewGroupFragmentDoc>]>();
    const titles = new Map<string, string>();
    categories.forEach((c) => {
        if (c.parent?.id) {
            groups.has(c.parent?.id) ? groups.get(c.parent?.id)?.push(c) : groups.set(c.parent?.id, [c]);
        } else {
            titles.set(c.id, c.name);
        }
    });

    const [currentId, setCurrentId] = useState(id);
    const [current, setCurrent] = useState(categories.find(c => c.id === id));

    useEffect(() => setCurrent(categories.find(c => c.id === currentId)), [currentId, categories]);

    return (loading ?
        <UpdateTransactionCategoryPlaceholder />
        :
        error ?
            <Error message={error.message} />
            :
            <form onSubmit={(e) => { e.preventDefault(); onSave(currentId); }} className="h-[90vh] w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col">
                <div className="px-4 pt-3 flex flex-col">
                    {current &&
                        <>
                            <h3 className="text-xl font-light">Selected Category</h3>
                            <div className="flex px-4 py-6">
                                <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                                    <DynamicIcon name={current.icon} className="m-auto text-3xl" />
                                </div>
                                <div className="w-4/12 my-auto">
                                    <h4 className="text-xl">{current.name}</h4>
                                </div>
                                <div className="w-6/12">
                                    <p>{current.description}</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="overflow-y-scroll">
                    <div className="mt-3 text-center p-2">
                        <div className="w-full space-y-4">
                            {Array.from(groups.entries()).map(entry => entry[0] &&
                                <CategoryPreviewGroup key={entry[0]} groupName={titles.get(entry[0]) ?? ""} groupCategories={entry[1]} select={(i) => setCurrentId(i)} open={current?.parent?.id === entry[0]} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 flex flex-col">
                    <div className="flex flex-row sm:px-6">
                        <button className="mx-2 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-grayPrimary dark:border-grayPrimaryDark text-grayPrimary dark:text-grayPrimaryDark hover:text-graySecondary dark:hover:text-graySecondaryDark hover:bg-baseColor dark:hover:bg-baseColorDark" type="button" onClick={onCancel}>Cancel</button>
                        <input className="mx-2 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-transparent bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark cursor-pointer hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="submit" value="Save"></input>
                    </div>
                </div>
            </form>
    )
}
export default UpdateTransactionCategory