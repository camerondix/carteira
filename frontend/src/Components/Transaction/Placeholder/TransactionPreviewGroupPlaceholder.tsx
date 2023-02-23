import Placeholder from "../../Shared/Placeholder"

interface Props {
    count: number,
}

function TransactionPreviewGroupPlaceholder({ count }: Props) {
    return (
        <div className="p-3">
            <div className="flex flex-row px-3 text-3xl mb-2 justify-between">
                <h1><Placeholder length={10} /></h1>
            </div>
            <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                {
                    Array(count).fill(0).map((_, i) =>
                        <div key={i} className="border-b-2 border-baseColor dark:border-baseColorDark last:border-0">
                            <div className="flex flex-row p-2">
                                <div className="pr-2 m-auto w-2/12 text-lightPrimary dark:text-lightPrimaryDark">
                                    <div className="text-center text-3xl">
                                        <Placeholder length={3} />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-10/12 pr-2">
                                    <div className="text-left space-y-1 flex-shrink-1 my-auto w-8/12">
                                        <h2 className="text-lg">
                                            <Placeholder length={24} />
                                        </h2>
                                        <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                            <Placeholder length={14} />
                                        </small>
                                    </div>
                                    <div className="text-right space-y-1 w-4/12">
                                        <h2 className="text-xl">
                                            <Placeholder length={9} />
                                        </h2>
                                        <div>
                                            <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                                <Placeholder length={7} />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default TransactionPreviewGroupPlaceholder
