"use client"; // 👈 Important to ensure this is a Client Component

import { ReactNode } from "react";
import { Provider } from "react-redux";
import CommonTopbar from "../common-components/CommonTopbar";
import Sidebar from "./sidebar";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

export default function Providers({ children }: { children: ReactNode }) {
    return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
        <Sidebar className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white" />
        <CommonTopbar className="w-full h-16 fixed top-0 left-64 bg-gray-800 text-white" />
        <main className="overflow-auto  h-screen">
            {children}
        </main>
        </PersistGate>
    </Provider>
    );
}
