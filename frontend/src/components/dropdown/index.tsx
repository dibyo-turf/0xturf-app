import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
type Option = {
    name: string;
    value: string;
};

export default function Dropdown({
    options,
    selectedOption,
    setSelectedOption,
}: {
    options: Option[];
    selectedOption: Option | null;
    setSelectedOption: (value: Option | null) => void;
}) {
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? options
            : options.filter((person) =>
                  person.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="w-full">
            <Combobox value={selectedOption} onChange={setSelectedOption}>
                <div className="relative mt-1">
                    <div className="relative w-full  cursor-default rounded-lg bg-[#22163A] text-left focus:outline-none sm:text-sm">
                        <div className="absolute text-sm bottom-[75%] z-10 left-4 bg-[#22163A] text-[#7E768C] tracking-wide">
                            {options.length === 4 ? "Region" : "Server"}
                        </div>
                        <Combobox.Input
                            className="w-full pb-2 pl-3 pr-10 text-sm leading-5 border border-[#413055] focus:border-[#413055] placeholder:text-[#7C7C88] focus:ring-0"
                            displayValue={(option: Option) => option.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-1 flex items-center pr-2">
                            <AiFillCaretDown
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options
                            className="absolute mt-2 max-h-40 z-30 w-full overflow-auto 
                                       rounded-2xl
                                     bg-[#251F30] text-base  focus:outline-none sm:text-sm"
                        >
                            {filteredPeople.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none z-30 p-4 text-white ">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.name}
                                        className={({ active }) =>
                                            `relative cursor-pointer  select-none py-3 z-30 pl-7 pr-4 ${
                                                active &&
                                                "bg-[#16121e] bg-opacity-60"
                                            } text-white`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {/* {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null} */}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
