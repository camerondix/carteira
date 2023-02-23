import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsBank, BsBarChartFill, BsCashStack, BsFillCreditCardFill, BsPiggyBankFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../../gql/generated";
import { AccountType } from "../../gql/generated/graphql";
import EnumDisplay from "../Shared/EnumDisplay";
import AccountBalanceDisplay from "./AccountBalanceDisplay";
import CreditUtilization from "./CreditUtilization";
dayjs.extend(relativeTime);

const AccountPreviewFragment = graphql(`
fragment AccountPreview on Account {
    id
    name
    type
    subtype
    currentBalance {
      current
      timestamp
      ...BalanceUtilization
    }
}
`);

interface Props {
    account: FragmentType<typeof AccountPreviewFragment>,
}

function AccountPreview({ account }: Props) {

    const accountFragment = useFragment(AccountPreviewFragment, account);
    const { id, name, type, subtype, currentBalance } = accountFragment;

    return (
        <div className="cursor-pointer border-b-2 border-baseColor dark:border-baseColorDark last:border-0 hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark first:hover:rounded-t-xl last:hover:rounded-b-xl">
            <Link to={`/account/${id}`} >
                <div className="flex flex-row p-2">
                    <div className="pr-2 m-auto w-2/12 text-3xl text-lightPrimary dark:text-lightPrimaryDark">
                        {type === AccountType.Brokerage &&
                            <BsBarChartFill className="mx-auto" />
                        }
                        {type === AccountType.Cash &&
                            <BsCashStack className="mx-auto" />
                        }
                        {type === AccountType.Credit &&
                            <BsFillCreditCardFill className="mx-auto" />
                        }
                        {type === AccountType.Investment &&
                            <BsPiggyBankFill className="mx-auto" />
                        }
                        {type === AccountType.Loan &&
                            <BsBank className="mx-auto" />
                        }
                        {(type === AccountType.Other || type === AccountType.EnumUnknown) &&
                            <BsBank className="mx-auto" />
                        }
                    </div>
                    <div className="flex flex-row justify-between w-full pr-4">
                        <div className="my-auto text-left space-y-1">
                            <h2 className="text-xl">{name}</h2>
                            <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                <EnumDisplay value={subtype.toString()} />
                            </small>
                        </div>
                        <div className="my-auto text-right space-y-1">
                            <h2 className="text-xl">
                                {currentBalance && currentBalance.current &&
                                    <AccountBalanceDisplay balance={currentBalance.current} type={type} />
                                }
                            </h2>
                            {currentBalance &&
                                <div className="w-24">
                                    <CreditUtilization balance={currentBalance} height={7} showPercentage={false} />
                                </div>
                            }
                            <small className="text-sm text-graySecondary dark:text-graySecondaryDark">{currentBalance?.timestamp ? dayjs(currentBalance.timestamp).fromNow() : ""}</small>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AccountPreview;
