import { useState } from "react";

interface Props {
    referenceNumber: string | null | undefined,
    ppdId: string | null | undefined,
    payee: string | null | undefined,
    byOrderOf: string | null | undefined,
    payer: string | null | undefined,
    method: string | null | undefined,
    processor: string | null | undefined,
    reason: string | null | undefined,
    onSave: (
        referenceNumber: string | null | undefined,
        ppdId: string | null | undefined,
        payee: string | null | undefined,
        byOrderOf: string | null | undefined,
        payer: string | null | undefined,
        method: string | null | undefined,
        processor: string | null | undefined,
        reason: string | null | undefined,
    ) => void,
    onCancel: () => void,
}

function UpdateTransactionPaymentMeta({ referenceNumber, ppdId, payee, byOrderOf, payer, method, processor, reason, onSave, onCancel }: Props) {

    const [currentReferenceNumber, setCurrentReferenceNumber] = useState(referenceNumber);
    const [currentPpdId, setCurrentPpdId] = useState(ppdId);
    const [currentPayee, setCurrentPayee] = useState(payee);
    const [currentByOrderOf, setCurrentByOrderOf] = useState(byOrderOf);
    const [currentPayer, setCurrentPayer] = useState(payer);
    const [currentMethod, setCurrentMethod] = useState(method);
    const [currentProcessor, setCurrentProcessor] = useState(processor);
    const [currentReason, setCurrentReason] = useState(reason);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(currentReferenceNumber, currentPpdId, currentPayee, currentByOrderOf, currentPayer, currentMethod, currentProcessor, currentReason); }}>
            <div className="p-8 flex items-start">
                <div className="mt-3 text-center">
                    <div className="w-full space-y-4">
                        <div className="text-left">
                            <label className="block mb-2">Reference Number</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentReferenceNumber(e.target.value)} value={currentReferenceNumber ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">ACH PPD ID</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentPpdId(e.target.value)} value={currentPpdId ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Payee</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentPayee(e.target.value)} value={currentPayee ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">By Order Of</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentByOrderOf(e.target.value)} value={currentByOrderOf ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Payer</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentPayer(e.target.value)} value={currentPayer ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Method</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentMethod(e.target.value)} value={currentMethod ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Processor</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentProcessor(e.target.value)} value={currentProcessor ?? ''} type="text" maxLength={20}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Reason</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentReason(e.target.value)} value={currentReason ?? ''} type="text" maxLength={20}></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
                <button className="mb-3 sm:mb-0 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-grayPrimary dark:border-grayPrimaryDark text-grayPrimary dark:text-grayPrimaryDark hover:text-graySecondary dark:hover:text-graySecondaryDark hover:bg-baseColor dark:hover:bg-baseColorDark" type="button" onClick={() => onCancel()}>Cancel</button>
                <input className="sm:ml-3 inline-flex w-full justify-center rounded-lg px-4 py-2 border border-transparent bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark cursor-pointer hover:bg-superLightPrimary dark:hover:bg-darkPrimaryDark" type="submit" value="Save"></input>
            </div>
        </form>
    )
}

export default UpdateTransactionPaymentMeta
