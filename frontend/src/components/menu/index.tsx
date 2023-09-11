import clsxm from "@/lib/clsxm";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export type Option = {
    id: string;
    name: string;
    value: string;
};

export default function Menu({
    triggerButton,
    menuoptions,
    selectedOption,
    enableToggle,
    setSelectedOption,
}: {
    triggerButton: React.ReactNode;
    menuoptions: Option[];
    selectedOption: Option | null;
    enableToggle?: boolean;
    setSelectedOption: (value: Option | null) => void;
}) {
    return (
        <div className="w-56 text-right mr-4">
            <HeadlessMenu as="div" className="relative inline-block text-left">
                <HeadlessMenu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-white  focus:outline-none ">
                    {triggerButton}
                </HeadlessMenu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <HeadlessMenu.Items className="absolute  right-0 mt-2 w-56 origin-top-right rounded-xl bg-[#2b1c47] overflow-hidden focus:outline-none">
                        {menuoptions.map((item, index) => (
                            <HeadlessMenu.Item key={index}>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            if (
                                                enableToggle &&
                                                selectedOption &&
                                                selectedOption.id === item.id
                                            ) {
                                                setSelectedOption(null);
                                            } else {
                                                setSelectedOption(item);
                                            }
                                        }}
                                        className={clsxm(
                                            `group pl-6 text-white relative flex w-full items-center hover:bg-[#1E1432] cursor-pointer py-3 text-sm`,
                                            active ? "bg-[#1E1432]" : ""
                                        )}
                                    >
                                        {selectedOption &&
                                            selectedOption.id === item.id && (
                                                <span className="absolute top-[30%] right-4  ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M4.5 12.75l6 6 9-13.5"
                                                        />
                                                    </svg>
                                                </span>
                                            )}{" "}
                                        {item.name}
                                    </button>
                                )}
                            </HeadlessMenu.Item>
                        ))}
                    </HeadlessMenu.Items>
                </Transition>
            </HeadlessMenu>
        </div>
    );
}
