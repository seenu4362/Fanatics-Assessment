"use client";

import { usePathname } from "next/navigation";
import { FaGem } from "react-icons/fa";
import {  useDispatch } from "react-redux";
import { increment } from "../store/slices/counterSlice";

interface CommonTopbarProps {
  className?: string;
}

export default function CommonTopbar({ }: CommonTopbarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Extracting title based on path
  const getTitle = (path: string) => {
    switch (path) {
      case "/stores/":
        return "Stores";
      case "/leaderboard/":
        return "Leader Board";
      default:
        return "Games";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <p className="text-lg font-semibold">{getTitle(pathname)}</p>
      <button onClick={() => dispatch(increment())} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
        <FaGem /> Get Diamonds
      </button>
    </div>
  );
}
