import React from "react";

import UserAvatar from "@/components/user/UserAvatar";
import { AUTH_KEYS } from "../AuthGaurd";
import { Link } from "react-router-dom";
import Button from "@/components/button";
import SearchCombobox from "@/components/select/SearchCombobox";
import { useAppSelector } from "@/redux/hooks";

const Header = () => {
    const { status, user } = useAppSelector((state) => state.auth);
    const isTurfTokenPresent = localStorage.getItem(
        AUTH_KEYS.TURF_ACCESS_TOKEN
    );

    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="h-[15vh] bg-[#16121e] sticky top-0 z-50 w-full flex items-center justify-between ">
            {window.location.pathname !== "/" && (
                <SearchCombobox setIsOpen={setIsOpen} />
            )}
            <div className="h-[15vh] w-full flex items-center  justify-end ">
                {!isTurfTokenPresent && (
                    <Link to={"/signin"}>
                        <Button size="base" className="px-10">
                            Login
                        </Button>
                    </Link>
                )}
                {status === "registered" && user && <UserAvatar user={user} />}
            </div>
        </div>
    );
};

export default Header;

// const Search = () => {
//     return (
//         <>
//             {window.location.pathname !== "/" && (
//                 <div className="w-4/12 flex relative bg-[#1D1829] rounded-2xl">
//                     <div className="absolute top-3 pl-5">
// <svg
//     width="21"
//     height="21"
//     viewBox="0 0 21 21"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
// >
//     <circle
//         cx="9.76657"
//         cy="9.76657"
//         r="8.98856"
//         stroke="#768192"
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     />
//     <path
//         d="M16.0183 16.4851L19.5423 20"
//         stroke="#768192"
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     />
// </svg>
//                     </div>
//                     <input
//                         className="pl-[56px] text-sm leading-5 rounded-2xl border-none  text-[#7C7C88] placeholder:text-[#7C7C88] focus:outline-none h-[48px] focus:ring-0"
//                         placeholder="Search anything you want..."
//                     />
//                 </div>
//             )}
//         </>
//     );
// };
