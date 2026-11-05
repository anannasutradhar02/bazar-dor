'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function Navbar({ tickerProducts = [] }) {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    // Dropdown toggle state
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sign out handler function (Better Auth ba apnar auth client-er signout method ekhane call hobe)
    const handleSignOut = async () => {
        try {
            // Jodi apnar auth-client e signout function thake, e.g., signOut()
            // await authClient.signOut();
            // window.location.href = "/sign-in";

            // Temporary placeholder for signout action:
            console.log("Signing out...");
        } catch (error) {
            console.error("Sign out failed", error);
        }
    };

    return (
        <div className="w-full">
            {/* 1. Main Header */}
            <header className="bg-white border-b border-gray-100 py-3 px-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#05893E] text-white rounded-lg flex items-center justify-center font-bold text-base">
                            🛒
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-gray-900 leading-none">বাজার দর</h1>
                            <p className="text-[10px] text-gray-400 mt-0.5">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
                        </div>
                    </Link>

                    {/* Dynamic User Profile / Auth Links */}
                    {isPending ? (
                        <div className="text-xs text-gray-400">লোড হচ্ছে...</div>
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Profile Trigger Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 hover:bg-gray-100 p-1.5 px-3 rounded-lg transition border border-gray-200/85 focus:outline-none cursor-pointer"
                            >
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-[#05893E] text-white flex items-center justify-center font-bold text-xs">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                )}
                                <span className="text-xs font-semibold text-gray-800">{user.name || user.email?.split('@')[0]}</span>
                                <span className={`text-[10px] text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                            </button>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* User Info Header inside Dropdown */}
                                    <div className="px-3 pb-2.5 mb-1.5 border-b border-gray-100">
                                        <p className="text-xs font-bold text-gray-900 truncate">{user.name || "Rezwan Ahmed"}</p>
                                        <p className="text-[11px] text-gray-400 truncate">{user.email || "rezwanahmed@gmail.com"}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                                    >
                                        <span className="text-gray-500 text-sm">👤</span> আমার প্রোফাইল
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleSignOut();
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition text-left cursor-pointer mt-0.5"
                                    >
                                        <span className="text-red-500 text-sm">↪</span> সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/sign-in" className="text-xs font-semibold text-gray-700 hover:text-[#05893E] px-3 py-1.5 transition">
                                সাইন ইন
                            </Link>
                            <Link href="/sign-up" className="bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-1.5 rounded-md transition shadow-2xs">
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* 2. Category Filter Bar */}
            <div className="bg-white border-b border-gray-200/60 py-2 px-4 sticky top-[57px] z-40">
                <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 overflow-x-auto text-xs font-medium text-gray-600">
                    <Link href="/?category=chal" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🍚</span> চাল</Link>
                    <Link href="/?category=dal" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥣</span> ডাল</Link>
                    <Link href="/?category=tel" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🍾</span> তেল</Link>
                    <Link href="/?category=sobji" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥦</span> সবজি</Link>
                    <Link href="/?category=mach" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🐟</span> মাছ</Link>
                    <Link href="/?category=mangsho" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥩</span> মাংস</Link>
                    <Link href="/?category=dim-dui" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥛</span> ডিম-দুধ</Link>
                    <Link href="/?category=mosla" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🧄</span> মসলা</Link>
                </div>
            </div>

            {/* 3. Dynamic Ticker Bar */}
            <div className="bg-[#EBF3EC] border-b border-gray-200/50 text-[11px] py-1.5 px-4 overflow-x-auto whitespace-nowrap flex gap-6 justify-center items-center text-gray-700">
                {tickerProducts.length > 0 ? (
                    tickerProducts.slice(0, 6).map((product, index) => {
                        const isUp = product.change?.dir === "up";
                        const isDown = product.change?.dir === "down";
                        return (
                            <span key={index} className="flex items-center gap-1">
                                {isUp ? "🔴" : "⚪"} {product.nameBn}: <strong>৳{product.today}/{product.unit}</strong>{" "}
                                {product.change && (
                                    <span className={`font-semibold ${isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-500"}`}>
                                        {isUp ? "▲" : isDown ? "▼" : "—"} {Math.abs(product.change.pct)}%
                                    </span>
                                )}
                            </span>
                        );
                    })
                ) : (
                    <span className="text-gray-400">বাজারের লাইভ আপডেট লোড হচ্ছে...</span>
                )}
            </div>
        </div>
    );
}