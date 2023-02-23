import Placeholder from "../../Shared/Placeholder"

function AccountPlaceholder() {
    return (
        <div className="container mx-auto">
            <div className="flex min-h-screen flex-col p-4 md:mx-20 lg:mx-40 xl:mx-80">
                <div className="flex justify-between m-2">
                    <div>
                        <h1 className="text-3xl font-bold">
                            <Placeholder length={13} />
                        </h1>
                        <h2 className="text-xl text-graySecondary dark:text-graySecondaryDark">
                            <Placeholder length={13} />
                        </h2>
                        <h3 className="text-md text-grayTertiary dark:text-grayTertiaryDark">
                            <Placeholder length={7} />
                        </h3>
                    </div>
                    <div>
                        <button className="m-auto text-xl p-2 rounded-lg bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark" disabled={true}>
                            <Placeholder empty={true} />
                        </button>
                    </div>
                </div>
                <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                    <h2 className="text-center text-xl font-light">
                        <Placeholder length={12} />
                    </h2>
                    <div className="flex py-2">
                        <label className="w-20 p-1">
                            <Placeholder length={7} />
                        </label>
                        <input className="rounded-l w-36 px-3 bg-grayTertiary dark:bg-grayTertiaryDark" disabled></input>
                        <button className="p-2 bg-grayTertiary dark:bg-grayTertiaryDark" type="button">
                            <Placeholder empty={true} />
                        </button>
                        <button className="rounded-r p-2 cursor-copy text-superLightPrimary dark:text-superLightPrimaryDark bg-primary dark:bg-primaryDark" type="button">
                            <Placeholder empty={true} />
                        </button>
                    </div>
                    <div className="flex py-2">
                        <label className="w-20 p-1">
                            <Placeholder length={8} />
                        </label>
                        <input className="rounded-l w-36 px-3 bg-grayTertiary dark:bg-grayTertiaryDark" disabled></input>
                        <button className="p-2 bg-grayTertiary dark:bg-grayTertiaryDark" type="button">
                            <Placeholder empty={true} />
                        </button>
                        <button className="rounded-r p-2 cursor-copy text-superLightPrimary dark:text-superLightPrimaryDark bg-primary dark:bg-primaryDark" type="button">
                            <Placeholder empty={true} />
                        </button>
                    </div>
                </div>
                <div className="rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                    <>
                        <h2 className="text-center text-xl font-light">
                            <Placeholder length={12} />
                        </h2>
                        <p className="px-2 py-1">
                            <Placeholder length={24} />
                        </p>
                        <p className="px-2 py-1">
                            <Placeholder length={18} />
                        </p>
                        <p className="px-2 py-1">
                            <Placeholder length={20} />
                        </p>
                    </>
                </div>
                <div className="text-center rounded-xl m-2 p-2 empty:hidden bg-elevatedColor dark:bg-elevatedColorDark">
                    <h2 className="text-center text-xl font-light">Current Balance</h2>
                    <div className="text-4xl py-2">
                        <Placeholder length={16} />
                    </div>
                    <p className="px-2 py-1 text-graySecondary dark:text-graySecondaryDark">
                        <Placeholder length={8} />
                    </p>
                    <p className="px-2 py-1 text-graySecondary dark:text-graySecondaryDark">
                        <Placeholder length={15} />
                    </p>
                    <p className="px-2 py-1 text-grayTertiary dark:text-grayTertiaryDark">
                        <Placeholder length={22} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountPlaceholder
