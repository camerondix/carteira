import { useState } from "react";
import { BsClipboard, BsEye, BsEyeSlash } from "react-icons/bs";
import { FragmentType, graphql, useFragment } from "../../gql/generated";

const DepositoryInfoFragment = graphql(`
fragment DepositoryDetails on DepositoryInfo {
    routingNumber
    accountNumber
}
`);

interface Props {
    info: FragmentType<typeof DepositoryInfoFragment>,
}

function DepositoryInfo({ info }: Props) {

    const { routingNumber, accountNumber } = useFragment(DepositoryInfoFragment, info);
    const [showRoutingNumber, setShowRoutingNumber] = useState(false);
    const [showAccountNumber, setShowAccountNumber] = useState(false);

    return (
        <>
            {(routingNumber || accountNumber) &&
                <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Account Details</h2>
            }
            {routingNumber &&
                <div className="flex py-2 b">
                    <label className="w-20 p-1">Routing</label>
                    <input className="rounded-l w-36 px-3 bg-baseColor dark:bg-baseColorDark" type={showRoutingNumber ? "text" : "password"} value={routingNumber} disabled></input>
                    <button className="p-2 bg-baseColor dark:bg-baseColorDark hover:text-superLightPrimary dark:hover:text-primaryDark" type="button" onClick={() => setShowRoutingNumber(!showRoutingNumber)}>
                        {!showRoutingNumber &&
                            <BsEye />
                        }
                        {showRoutingNumber &&
                            <BsEyeSlash />
                        }
                    </button>
                    <button className="rounded-r p-2 cursor-copy text-superLightPrimary dark:text-superLightPrimaryDark bg-primary dark:bg-primaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="button" onClick={() => { navigator.clipboard.writeText(routingNumber) }}>
                        <BsClipboard />
                    </button>
                </div>
            }
            {accountNumber &&
                <div className="flex py-2">
                    <label className="w-20 p-1">Account</label>
                    <input className="rounded-l w-36 px-3 bg-baseColor dark:bg-baseColorDark" type={showAccountNumber ? "text" : "password"} value={accountNumber} disabled></input>
                    <button className="p-2 bg-baseColor dark:bg-baseColorDark hover:text-superLightPrimary dark:hover:text-primaryDark" type="button" onClick={() => setShowAccountNumber(!showAccountNumber)}>
                        {!showAccountNumber &&
                            <BsEye />
                        }
                        {showAccountNumber &&
                            <BsEyeSlash />
                        }
                    </button>
                    <button className="rounded-r p-2 cursor-copy text-superLightPrimary dark:text-superLightPrimaryDark bg-primary dark:bg-primaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="button" onClick={() => { navigator.clipboard.writeText(accountNumber) }}>
                        <BsClipboard />
                    </button>
                </div>
            }
        </>
    )
}

export default DepositoryInfo
