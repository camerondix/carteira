import { FragmentType, graphql, useFragment } from "../../gql/generated";
import CategoryPreview from "./CategoryPreview";

const CategoryPreviewGroupFragment = graphql(`
fragment CategoryPreviewGroup on Category {
    id
    ...CategoryPreview
}
`);

interface Props {
    groupCategories: FragmentType<typeof CategoryPreviewGroupFragment>[],
    groupName: string,
    open: boolean,
    select: (id: string) => void,
}

function CategoryPreviewGroup({ groupCategories, groupName, open, select }: Props) {

    const categories = useFragment(CategoryPreviewGroupFragment, groupCategories);

    return (
        <details className="p-3 bg-elevatedColor dark:bg-elevatedColorDark rounded-xl open:bg-baseColor dark:open:bg-baseColorDark hover:bg-lightPrimary dark:hover:bg-darkPrimaryDark open:hover:bg-transparent" open={open}>
            <summary className="flex flex-row px-3 text-xl mb-2 justify-between cursor-pointer text-left">
                <summary>{groupName}</summary>
            </summary>
            <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                {categories.map((c) =>
                    <CategoryPreview key={c.id} category={c} select={select} />
                )}
            </div>
        </details>
    )
}
export default CategoryPreviewGroup