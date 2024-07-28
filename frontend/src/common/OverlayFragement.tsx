import React, { Fragment } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";

interface IPropOverlayFragment {
    isOpen: boolean;
    isAlert?: boolean;
    setIsOpen: (value: boolean) => void;
    children: React.ReactNode;
}


export default function OverlayFragment(props: IPropOverlayFragment) {
    const { isOpen, isAlert, setIsOpen, children } = props;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={() => {}}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 dark:bg-dark-light dark:bg-opacity-90 bg-opacity-75 transition-opacity z-30" />
                </TransitionChild>

                <div
                    className={`fixed ${
                        isAlert ? "top-0" : "inset-0"
                    } z-30 w-screen overflow-y-auto`}
                >
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative  transform overflow-hidden rounded-2xl bg-white dark:bg-dark-bg text-left shadow-xl transition-all sm:my-8  w-fit sm:min-w-xl p-5 lg:p-10">
                                {!isAlert && (
                                    <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A75EB1] focus:ring-offset-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <FaXmark
                                                className="w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                )}

                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
