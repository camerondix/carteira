import { useState } from "react";

interface Props {
    merchant: string | null | undefined,
    address: string | null | undefined,
    city: string | null | undefined,
    region: string | null | undefined,
    postalCode: string | null | undefined,
    latitude: number | null | undefined,
    longitude: number | null | undefined,
    onSave: (
        merchant: string | null | undefined,
        address: string | null | undefined,
        city: string | null | undefined,
        region: string | null | undefined,
        postalCode: string | null | undefined,
        latitude: number | null | undefined,
        longitude: number | null | undefined,
    ) => void,
    onCancel: () => void,
}

function UpdateTransactionLocation({ merchant, address, city, region, postalCode, latitude, longitude, onSave, onCancel }: Props) {

    const [currentMerchant, setCurrentMerchant] = useState(merchant);
    const [currentAddress, setCurrentAddress] = useState(address);
    const [currentCity, setCurrentCity] = useState(city);
    const [currentRegion, setCurrentRegion] = useState(region);
    const [currentPostalCode, setCurrentPostalCode] = useState(postalCode);
    const [currentLatitude, setCurrentLatitude] = useState(latitude);
    const [currentLongitude, setCurrentLongitude] = useState(longitude);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(currentMerchant, currentAddress, currentCity, currentRegion, currentPostalCode, currentLatitude, currentLongitude); }}>
            <div className="p-8 flex items-start">
                <div className="mt-3 text-center">
                    <div className="w-full space-y-4">
                        <div className="text-left">
                            <label className="block mb-2">Merchant</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentMerchant(e.target.value)} value={currentMerchant ?? ''} type="text" maxLength={100}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Address</label>
                            <input id="address" className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentAddress(e.target.value)} value={currentAddress ?? ''} type="text" maxLength={40}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">City</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentCity(e.target.value)} value={currentCity ?? ''} type="text" maxLength={30}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Region</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentRegion(e.target.value)} value={currentRegion ?? ''} type="text" maxLength={2}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Postal Code</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentPostalCode(e.target.value)} value={currentPostalCode ?? ''} type="text" maxLength={5}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Latitude</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentLatitude(isNaN(Number.parseFloat(e.target.value)) ? undefined : Number.parseFloat(e.target.value))} value={currentLatitude ?? ''} type="number" step={0.00001}></input>
                        </div>
                        <div className="text-left">
                            <label className="block mb-2">Latitude</label>
                            <input className="shadow appearance-none border-2 rounded px-3 w-full py-2 leading-tight bg-elevatedColor dark:bg-elevatedColorDark invalid:border-2 invalid:border-red dark:invalid:border-redDark" onChange={(e) => setCurrentLongitude(isNaN(Number.parseFloat(e.target.value)) ? undefined : Number.parseFloat(e.target.value))} value={currentLongitude ?? ''} type="number" step={0.00001}></input>
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

export default UpdateTransactionLocation
