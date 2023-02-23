import { BsArrowRepeat, BsInfoCircle, BsPlus } from "react-icons/bs";
import { RxCaretRight } from "react-icons/rx";
import { FragmentType, graphql, useFragment } from "../../gql/generated";

const TransactionPaymentMetaFragment = graphql(`
fragment TransactionPaymentMeta on PaymentMeta {
    referenceNumber
    ppdId
    payee
    byOrderOf
    payer
    method
    processor
    reason
}
`);

interface Props {
    paymentMeta: FragmentType<typeof TransactionPaymentMetaFragment>,
    loading: boolean,
}

function TransactionPaymentMeta({ paymentMeta, loading }: Props) {

    const { referenceNumber, ppdId, payee, byOrderOf, payer, method, processor, reason } = useFragment(TransactionPaymentMetaFragment, paymentMeta);

    return (
        <>
            {(referenceNumber || ppdId || payee || byOrderOf || payer || method || processor || reason) ?
                <>
                    <h2 className="text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Info</h2>
                    <div className="flex p-2">
                        <div className="pr-2 w-2/12 m-auto text-lightPrimary dark:text-lightPrimaryDark">
                            <BsInfoCircle className="m-auto text-3xl" />
                        </div>
                        <div className="pr-2 w-4/12 m-auto text-lg">
                            {referenceNumber &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Reference Number</h4>
                            }
                            {ppdId &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">ACH PPD ID</h4>
                            }
                            {payee &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Payee</h4>
                            }
                            {byOrderOf &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">By Order Of</h4>
                            }
                            {payer &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Payer</h4>
                            }
                            {method &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Method</h4>
                            }
                            {processor &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Processor</h4>
                            }
                            {reason &&
                                <h4 className="text-grayTertiary dark:text-grayTertiaryDark">Reason</h4>
                            }
                        </div>
                        <div className="pr-2 w-5/12 m-auto text-lg">
                            {referenceNumber &&
                                <h4>{referenceNumber}</h4>
                            }
                            {ppdId &&
                                <h4>{ppdId}</h4>
                            }
                            {payee &&
                                <h4>{payee}</h4>
                            }
                            {byOrderOf &&
                                <h4>{byOrderOf}</h4>
                            }
                            {payer &&
                                <h4>{payer}</h4>
                            }
                            {method &&
                                <h4>{method}</h4>
                            }
                            {processor &&
                                <h4>{processor}</h4>
                            }
                            {reason &&
                                <h4>{reason}</h4>
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
                    <h2 className="w-10/12 text-center text-xl font-light text-graySecondary dark:text-graySecondaryDark">Info</h2>
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

export default TransactionPaymentMeta
