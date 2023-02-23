import { useState } from "react";

interface Props {
    name: string,
    date: Date,
    onSave: (name: string, date: Date) => void,
    onCancel: () => void,
}

function UpdateTransaction({ name, date, onSave, onCancel }: Props) {

    const [currentName, setCurrentName]
        = useState(name);
    const [currentDate, setCurrentDate]
        = useState(date);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(currentName, currentDate); }}>
            <div className="p-8 flex items-start">
                <div className="mt-3 text-center">
                    <div className="w-full space-y-4">
                        <div className="text-left">
                            <label className="block mb-2">Name</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentName(e.target.value)} value={currentName} required type="text" maxLength={100}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Date</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentDate(new Date(e.target.valueAsDate?.toISOString() ?? new Date().toISOString()))} value={`${currentDate.toISOString().slice(0, 16)}`} required type="datetime-local"></input>
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

export default UpdateTransaction
