"use client";
import Link from "next/link";
import "./style.css";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { resetCount } from "../store/slices/counterSlice";
import { usePathname } from "next/navigation";
import { FaGem, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

interface SidebarProps  {
    className?: string;
  }

export default function Sidebar({}: SidebarProps ) {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const count = useSelector((state: RootState) => state.counter.value);
    const [menuOpen, setMenuOpen] = useState(false);

     /**
     * Handles the user logout process.
     * Resets the counter state in Redux and signs the user out.
     */
    const handleLogout = () => {
        dispatch(resetCount());
        signOut();
    };

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between pr-2">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={40}
                    />
                </div>

           {/* Gem Count - Always Visible */}
           <li className="relative flex items-center list-none lg:hidden">
                    <FaGem className="text-yellow-400 text-3xl" />
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {count}
                    </span>
                </li>

                {/* Hamburger Icon (Mobile) */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="lg:hidden text-white text-3xl"
                >
                    <FaBars />
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex">
                    <ul className="flex space-x-6 items-center">
                        {[
                            { name: "Games", path: "/" },
                            { name: "Stores", path: "/stores/" },
                            { name: "Leaderboard", path: "/leaderboard/" },
                        ].map((item) => (
                            <li key={item.path} className="flex items-center">
                                <Link
                                    href={item.path}
                                    className={`transition hover:text-green-400 ${pathname === item.path ? "text-green-400 border-b-2 border-green-400" : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>

                                {/* Show Gem Icon Only for Leaderboard */}
                            </li>
                        ))}
                           
                                     <li className="relative flex items-center list-none">
                                     <FaGem className="text-yellow-400 text-3xl" />
                                     <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                         {count}
                                     </span>
                                 </li>
                                
                    </ul>
                </nav>

                {/* User Info & Logout Button (Desktop) */}
                <div className="hidden lg:flex items-center">
                    {session ? (
                        <>
                            <p className="flex items-center space-x-2 text-md font-medium capitalize">
                                <Image
                                    src={session?.user?.image as string}
                                    alt="User Avatar"
                                    width={26}
                                    height={26}
                                    className="rounded-full cursor-pointer object-cover mr-1"
                                />
                                <span>{session?.user?.name}</span>
                            </p>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md shadow-md transition-all duration-300 ml-3"
                            >
                                <FiLogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <Image
                            onClick={() => signIn("google")}
                            src="/google-btn.png"
                            alt="Google Sign In"
                            width={150}
                            height={40}
                            className="cursor-pointer"
                        />
                    )}
                </div>
            </div>

            {/* Mobile Hamburger Menu - Slide from Left */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                <div className="flex flex-col w-64 h-full bg-gray-900 shadow-lg p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="self-end text-white text-3xl mb-6"
                    >
                        <FaTimes />
                    </button>

                    {/* Navigation Links */}
                    <nav>
                        <ul className="flex flex-col space-y-6 text-lg">
                            {[
                                { name: "Games", path: "/" },
                                { name: "Stores", path: "/stores/" },
                                { name: "Leaderboard", path: "/leaderboard/" },
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`block transition hover:text-green-400 ${pathname === item.path ? "text-green-400 border-l-4 border-green-400 pl-2" : ""
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Info & Logout (Mobile) */}
                    <div className="mt-auto">
                        {session ? (
                            <>
                                <div className="flex items-center space-x-2 text-md font-medium capitalize mb-4">
                                    <Image
                                        src={session?.user?.image as string}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                    <span>{session?.user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-300"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Image
                                onClick={() => signIn("google")}
                                src="/google-btn.png"
                                alt="Google Sign In"
                                width={150}
                                height={40}
                                className="cursor-pointer mx-auto"
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
