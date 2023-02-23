import Placeholder from "../../Shared/Placeholder";

function AccountPreviewGroupPlaceholder() {

    return (
        <>
            {Array(2).fill(0).map((_, i) =>
                <div key={i} className="p-3" >
                    <div className="flex flex-row px-3 text-3xl mb-2 justify-between">
                        <h1><Placeholder length={6} /></h1>
                        <h1><Placeholder length={7} /></h1>
                    </div>
                    <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                        {Array(5).fill(0).map((_, j) =>
                            <div key={j} className="cursor-pointer border-b-2 border-baseColor dark:border-baseColorDark last:border-0 hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark first:hover:rounded-t-xl last:hover:rounded-b-xl">
                                <div className="flex flex-row p-4">
                                    <div className="pr-2 m-auto w-2/12 text-3xl text-lightPrimary dark:text-lightPrimaryDark">
                                        <Placeholder length={3} />
                                    </div>
                                    <div className="flex flex-row justify-between w-full pr-4">
                                        <div className="my-auto text-left space-y-1">
                                            <h2 className="text-xl">
                                                <Placeholder length={12} />
                                            </h2>
                                            <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                                <Placeholder length={8} />
                                            </small>
                                        </div>
                                        <div className="my-auto text-right space-y-1">
                                            <h2 className="text-xl">
                                                <Placeholder length={9} />
                                            </h2>
                                            <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                                <Placeholder length={7} />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            )}
        </>
    )
}

export default AccountPreviewGroupPlaceholder;
