import Placeholder from "../../Shared/Placeholder"

function TransactionPlaceholder() {
    return (
        <div className="container mx-auto">
            <div className="flex min-h-screen flex-col p-4 md:mx-20 lg:mx-40 xl:mx-80">
                <div className="flex justify-between m-2">
                    <div>
                        <h1 className="text-4xl py-2">
                            <Placeholder length={6} />
                        </h1>
                        <h1 className="text-xl font-bold">
                            <Placeholder length={12} />
                        </h1>
                        <h2 className="text-lg text-graySecondary dark:text-graySecondaryDark">
                            <Placeholder length={10} />
                        </h2>
                        <h3 className="text-md text-grayTertiary dark:text-grayTertiaryDark">
                            <Placeholder length={8} />
                        </h3>
                    </div>
                    <div>
                        <button className="m-auto text-xl p-2 rounded-lg bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark" disabled={true}>
                            <Placeholder empty={true} />
                        </button>
                    </div>
                </div>
                <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark cursor-pointer">
                    <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">
                        <Placeholder length={10} />
                    </h2>
                    <div className="flex p-2">
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
                        <div className="w-5/12">
                            <p><Placeholder length={18} /></p>
                            <p><Placeholder length={18} /></p>
                            <p><Placeholder length={18} /></p>
                        </div>
                        <div className="my-auto w-1/12 text-2xl text-graySecondary dark:text-graySecondaryDark">
                            <Placeholder length={1} />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark cursor-pointer">
                    <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">
                        <Placeholder length={10} />
                    </h2>
                    <div className="flex p-2">
                        <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                            <div className="m-auto text-3xl">
                                <Placeholder length={2} />
                            </div>
                        </div>
                        <div className="pr-2 w-9/12 m-auto text-lg">
                            <h4><Placeholder length={25} /></h4>
                            <h4><Placeholder length={20} /></h4>
                            <h4><Placeholder length={23} /></h4>
                        </div>
                        <div className="my-auto w-1/12 text-2xl text-graySecondary dark:text-graySecondaryDark">
                            <Placeholder length={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionPlaceholder
