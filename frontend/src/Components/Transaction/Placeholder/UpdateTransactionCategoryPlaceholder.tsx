import Placeholder from "../../Shared/Placeholder"

function UpdateTransactionCategoryPlaceholder() {
    return (
        <div className="h-[90vh] w-[90vw] flex flex-col">
            <div className="px-4 pt-3 flex flex-col">
                <h3 className="text-xl font-light">
                    <Placeholder length={15} />
                </h3>
                <div className="flex px-4 py-6">
                    <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                        <div className="m-auto text-3xl">
                            <Placeholder length={2} />
                        </div>
                    </div>
                    <div className="w-4/12 my-auto">
                        <h4 className="text-xl">
                            <Placeholder length={10} />
                        </h4>
                    </div>
                    <div className="w-6/12">
                        <p>
                            <Placeholder length={10} />
                            <br />
                            <Placeholder length={10} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="overflow-y-scroll">
                <div className="mt-3 text-center p-2">
                    <div className="w-full space-y-4">
                        {Array(10).fill(0).map((_, i) =>
                            <div key={i} className="p-3 bg-elevatedColor dark:bg-elevatedColorDark rounded-xl open:bg-baseColor dark:open:bg-baseColorDark hover:bg-lightPrimary dark:hover:bg-darkPrimaryDark open:hover:bg-transparent">
                                <div className="flex flex-row px-3 text-xl mb-2 justify-between cursor-pointer text-left">
                                    <Placeholder length={15} />
                                </div>
                                <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 flex flex-col">
                <div className="flex flex-row sm:px-6">
                    <button className="mx-2 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-grayPrimary dark:border-grayPrimaryDark text-grayPrimary dark:text-grayPrimaryDark hover:text-graySecondary dark:hover:text-graySecondaryDark hover:bg-baseColor dark:hover:bg-baseColorDark" type="button" disabled={true}>
                        <Placeholder empty={true} />
                    </button>
                    <button className="mx-2 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-transparent bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark cursor-pointer hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="button" disabled={true}>
                        <Placeholder empty={true} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateTransactionCategoryPlaceholder
