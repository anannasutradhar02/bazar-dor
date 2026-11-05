'use client';
import { authClient } from "@/lib/auth-client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/sign-in/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('সফলভাবে সাইন ইন হয়েছে!');
                router.push('/');
                router.refresh();
            } else {
                toast.error(data.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
            }
        } catch (err) {
            toast.error('সার্ভার কানেকশন ত্রুটি!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans flex flex-col justify-between">

            <div>
                {/* 1. Header Navigation */}
                <header className="bg-white border-b border-gray-100 py-3 px-6 shadow-2xs">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#05893E] text-white rounded-lg flex items-center justify-center font-bold text-base shadow-2xs">
                                🛒
                            </div>
                            <div>
                                <h1 className="font-bold text-base text-gray-900 leading-none">বাজার দর</h1>
                                <p className="text-[10px] text-gray-400 mt-0.5">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Link href="/sign-in" className="text-xs font-semibold text-[#05893E] px-3 py-1.5 transition">
                                সাইন ইন
                            </Link>
                            <Link href="/sign-up" className="bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-1.5 rounded-md transition shadow-2xs">
                                সাইন আপ
                            </Link>
                        </div>
                    </div>
                </header>

                {/* 2. Category Filter Bar (Design Alignment) */}
                <div className="bg-white border-b border-gray-200/60 py-2 px-4">
                    <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 overflow-x-auto text-xs font-medium text-gray-600">
                        <Link href="/?category=chal" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🍚</span> চাল
                        </Link>
                        <Link href="/?category=dal" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🥣</span> ডাল
                        </Link>
                        <Link href="/?category=tel" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🍾</span> তেল
                        </Link>
                        <Link href="/?category=sobji" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🥦</span> সবজি
                        </Link>
                        <Link href="/?category=mach" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🐟</span> মাছ
                        </Link>
                        <Link href="/?category=mansh" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🥩</span> মাংস
                        </Link>
                        <Link href="/?category=dim-dudh" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🥛</span> ডিম-দুধ
                        </Link>
                        <Link href="/?category=mosla" className="hover:text-[#05893E] transition flex items-center gap-1 whitespace-nowrap">
                            <span>🧄</span> মসলা
                        </Link>
                    </div>
                </div>

                {/* 3. Live Price Ticker Bar */}
                <div className="bg-[#EBF3EC] border-b border-gray-200/50 text-[11px] py-1.5 px-4 overflow-x-auto whitespace-nowrap flex gap-6 justify-center items-center text-gray-700">
                    <span className="flex items-center gap-1">⚪ স্বর্ণামাচি চাল: <strong>৳৪৮/কেজি</strong> <span className="text-red-500 font-semibold">▲ ২.১%</span></span>
                    <span className="flex items-center gap-1">⚪ মিনিকেট চাল: <strong>৳৯৯/কেজি</strong> <span className="text-emerald-600 font-semibold">▼ ২.৯%</span></span>
                    <span className="flex items-center gap-1">⚪ বাটারম সাইজ চাল: <strong>৳৬৬/কেজি</strong> <span className="text-red-500 font-semibold">▲ ৩.১%</span></span>
                    <span className="flex items-center gap-1">🔴 মসুর ডাল: <strong>৳১৪২/কেজি</strong> <span className="text-red-500 font-semibold">▲ ২.৯%</span></span>
                    <span className="flex items-center gap-1">🔴 ছোলা: <strong>৳১২০/কেজি</strong> <span className="text-emerald-600 font-semibold">▼ ২.৪%</span></span>
                </div>

                {/* 4. Sign In Form Section */}
                <main className="flex flex-col justify-center items-center px-4 py-12">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-gray-900">সাইন ইন</h2>
                        <p className="text-xs text-gray-500 mt-1">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                    </div>

                    <div className="w-full max-w-sm bg-white rounded-xl shadow-2xs border border-gray-200/80 p-6">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#05893E] bg-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
                                <input
                                    type="password"
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#05893E] bg-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition shadow-2xs mt-2 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                disabled={loading}
                            >
                                {loading ? 'সাইন ইন হচ্ছে...' : 'সাইন ইন'}
                            </button>
                        </form>

                        <div className="relative my-4 text-center">
                            <span className="bg-white px-2 text-[10px] text-gray-400 relative z-10">অথবা</span>
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-[11px] font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition"
                            >
                                <FcGoogle size={16} /> Google দিয়ে চালিয়ে যান
                            </button>
                            <button
                                type="button"
                                className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-[11px] font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition"
                            >
                                <FaGithub size={16} /> GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        <p className="text-[11px] text-center text-gray-500 mt-4">
                            অ্যাকাউন্ট নেই?{' '}
                            <Link href="/sign-up" className="text-[#05893E] font-semibold hover:underline">
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <Link href="/" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                            ← হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </main>
            </div>

            {/* 5. Sub Footer */}
            <footer className="bg-white border-t border-gray-200 py-3 px-6 text-[11px] text-gray-500 mt-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                    <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
                </div>
            </footer>
        </div>
    );
}