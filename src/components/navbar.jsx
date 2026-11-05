'use client';

import Link from "next/link";
import { useSession } from "@/lib/auth-client"; // Apnar auth-client file-er path

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const user = session?.user;

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
                        <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 p-1.5 px-3 rounded-lg transition border border-gray-200/80">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                            ) : (
                                <div className="w-7 h-7 rounded-full bg-[#05893E] text-white flex items-center justify-center font-bold text-xs">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                            )}
                            <span className="text-xs font-semibold text-gray-800">{user.name || user.email.split('@')[0]}</span>
                            <span className="text-[10px] text-gray-400">▾</span>
                        </Link>
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
                    <Link href="/?category=mansh" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥩</span> মাংস</Link>
                    <Link href="/?category=dim-dudh" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🥛</span> ডিম-দুধ</Link>
                    <Link href="/?category=mosla" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap"><span>🧄</span> মসলা</Link>
                </div>
            </div>

            {/* 3. Ticker Bar */}
            <div className="bg-[#EBF3EC] border-b border-gray-200/50 text-[11px] py-1.5 px-4 overflow-x-auto whitespace-nowrap flex gap-6 justify-center items-center text-gray-700">
                <span className="flex items-center gap-1">⚪ স্বর্ণামাচি চাল: <strong>৳৪৮/কেজি</strong> <span className="text-red-500 font-semibold">▲ ২.১%</span></span>
                <span className="flex items-center gap-1">⚪ মিনিকেট চাল: <strong>৳৯৯/কেজি</strong> <span className="text-emerald-600 font-semibold">▼ ২.৯%</span></span>
                <span className="flex items-center gap-1">⚪ বাটারম সাইজ চাল: <strong>৳৬৬/কেজি</strong> <span className="text-red-500 font-semibold">▲ ৩.১%</span></span>
                <span className="flex items-center gap-1">🔴 মসুর ডাল: <strong>৳১৪২/কেজি</strong> <span className="text-red-500 font-semibold">▲ ২.৯%</span></span>
                <span className="flex items-center gap-1">🔴 ছোলা: <strong>৳১২০/কেজি</strong> <span className="text-emerald-600 font-semibold">▼ ২.৪%</span></span>
            </div>
        </div>
    );
}