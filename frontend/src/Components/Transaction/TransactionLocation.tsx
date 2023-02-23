import { BsArrowRepeat, BsMap, BsPlus } from "react-icons/bs";
import { RxCaretRight } from "react-icons/rx";
import { FragmentType, graphql, useFragment } from "../../gql/generated";

const TransactionLocationFragment = graphql(`
fragment TransactionLocation on Location {
    address
    city
    region
    postalCode
    latitude
    longitude
}
`);

interface Props {
    location: FragmentType<typeof TransactionLocationFragment>,
    merchant: string | null | undefined,
    loading: boolean,
}

function TransactionLocation({ location, merchant, loading }: Props) {

    const { address, city, region, postalCode, latitude, longitude } = useFragment(TransactionLocationFragment, location);

    return (
        <>
            {(address || city || region || postalCode || latitude || longitude || merchant) ?
                <>
                    <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Location</h2>
                    <div className="flex p-2">
                        <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                            <BsMap className="m-auto text-3xl" />
                        </div>
                        <div className="pr-2 w-9/12 m-auto text-lg">
                            {merchant &&
                                <h4>{merchant}</h4>
                            }
                            {address &&
                                <h4>{address}</h4>
                            }
                            {(city || region) &&
                                <h4>{city}{`${city ? ", " : ""}${region}`}</h4>
                            }
                            {postalCode &&
                                <h4>{postalCode}</h4>
                            }
                            {(latitude && longitude) &&
                                <h4>{latitude} , {longitude}</h4>
                            }
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
                :
                <div className="flex px-2">
                    <div className="w-1/12"></div>
                    <h2 className="w-10/12 text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Location</h2>
                    <div className="my-auto text-2xl w-1/12 text-graySecondary dark:text-graySecondaryDark">
                        {loading ?
                            <BsArrowRepeat className="animate-spin" />
                            :
                            <BsPlus />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TransactionLocation
