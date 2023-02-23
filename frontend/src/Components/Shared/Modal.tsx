import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

interface Props {
    children: JSX.Element,
    isOpen: boolean,
}

function Modal({ children, isOpen }: Props) {

    const [open, setOpen] = useState(isOpen);

    useEffect(() => setOpen(isOpen), [isOpen]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => ""}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 transition-opacity bg-baseColor bg-opacity-60 dark:bg-baseColorDark dark:bg-opacity-60" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-4">
                            <Dialog.Panel className="rounded-xl border-2 border-elevatedColor dark:border-elevatedColorDark shadow-xl shadow-baseColor dark:shadow-baseColorDark text-grayPrimary dark:text-grayPrimaryDark bg-baseColor dark:bg-baseColorDark">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
