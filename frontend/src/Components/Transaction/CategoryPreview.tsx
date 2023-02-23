import { FragmentType, graphql, useFragment } from "../../gql/generated";
import DynamicIcon from "../Shared/DynamicIcon";

const CategoryPreviewFragment = graphql(`
fragment CategoryPreview on Category {
    id
    name
    icon
    description
}
`);

interface Props {
    category: FragmentType<typeof CategoryPreviewFragment>,
    select: (id: string) => void,
}

function CategoryPreview({ category, select }: Props) {

    const { id, name, icon, description } = useFragment(CategoryPreviewFragment, category);

    return (
        <div className="cursor-pointer border-b-2 border-b-baseColor dark:border-b-baseColorDark last:border-b-0 hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark first:hover:rounded-t-xl last:hover:rounded-b-xl p-2" onClick={() => select(id)}>
            <div className="flex p-2">
                <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                    <DynamicIcon name={icon} className="m-auto text-3xl" />
                </div>
                <div className="w-4/12 my-auto">
                    <h4 className="text-xl">{name}</h4>
                </div>
                <div className="w-6/12">
                    <p>{description}</p>
                </div>
            </div>
        </div>

    )
}

export default CategoryPreview
