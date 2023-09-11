import { Dialog, Transition } from "@headlessui/react";
import {
    ComponentProps,
    Dispatch,
    Fragment,
    SetStateAction,
    useState,
} from "react";
import Button from "../button";
import { getImage } from "../sections/registration/ChooseAvatar";

const AvatarModal: React.FC<
    ComponentProps<"div"> & {
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        getChoseAvatar: (index: number | null) => void;
    }
> = ({ isOpen, setIsOpen, getChoseAvatar }) => {
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-[350px] h-[70vh] flex flex-col justify-between transform overflow-hidden rounded-xl bg-[#090015] p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white "
                                >
                                    Choose an Avatar
                                </Dialog.Title>
                                <div className="h-[350px] py-4">
                                    <div className="grid grid-cols-3 gap-4 h-full">
                                        {[
                                            ...Array.from({
                                                length: 9,
                                            }).fill(1),
                                        ].map((item, index) => {
                                            return (
                                                <div
                                                    className={`w-[75px] h-[75px] overflow-hidden rounded-full mx-auto cursor-pointer ${
                                                        selectedAvatar ===
                                                            index &&
                                                        "selected-avatar-border "
                                                    }`}
                                                    key={index}
                                                >
                                                    <img
                                                        src={getImage(
                                                            index + 1
                                                        )}
                                                        alt=""
                                                        className="w-full h-full"
                                                        onClick={() =>
                                                            setSelectedAvatar(
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 mt-2 justify-between ">
                                    <Button
                                        variant="outline"
                                        className="w-full focus:outline-none"
                                        onClick={() => {
                                            setSelectedAvatar(null);
                                            getChoseAvatar(null);
                                            closeModal();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={() => {
                                            if (selectedAvatar !== null) {
                                                getChoseAvatar(
                                                    selectedAvatar + 1
                                                );
                                            }
                                            closeModal();
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AvatarModal;
