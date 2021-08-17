import React, { Fragment } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { Dialog, Transition } from '@headlessui/react'

import { modalActions } from 'state/slices/modalSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'

type ModalProps = {
    children: React.ReactNode
    handleModalClose?: () => void
}

const Modal: React.FC<ModalProps> = ({
    children,
    handleModalClose,
}): React.ReactElement => {
    const openState = useAppSelector((state) => state.modal.open)
    const dispatch = useAppDispatch()
    const { closeModal } = bindActionCreators(modalActions, dispatch)

    return (
        <Transition.Root show={openState} as={Fragment}>
            <Dialog
                as="div"
                auto-reopen="true"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={() =>
                    !handleModalClose ? closeModal() : handleModalClose()
                }
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        {children}
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
