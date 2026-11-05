
'use client';

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
                toast.success('সফলভাবে সাইন ইন হয়েছে!');
                router.push('/');
                router.refresh();
            } else {
                toast.error(data.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!');
            }
        } catch (err) {
            toast.error('সার্ভার কানেকশন ত্রুটি!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAF5] flex flex-col justify-between font-sans">
            <header className="bg-white border-b border-gray-100 py-3 px-6 shadow-xs">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#008236] text-white p-2 rounded-lg text-xl">🛒</div>
                        <div>
                            <h1 className="font-bold text-lg text-gray-800 leading-tight">বাজার দর</h1>
                            <p className="text-[11px] text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-[#008236]">সাইন ইন</Link>
                        <Link href="/sign-up" className="btn btn-sm bg-[#008236] hover:bg-[#00682b] text-white border-none px-4">সাইন আপ</Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-center items-center px-4 py-10">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200/80 p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">সাইন ইন</h2>
                        <p className="text-xs text-gray-500 mt-1">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">ইমেইল</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="input input-bordered w-full text-sm focus:border-[#008236] focus:outline-none bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
                            <input
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="input input-bordered w-full text-sm focus:border-[#008236] focus:outline-none bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn w-full bg-[#008236] hover:bg-[#00682b] text-white border-none mt-2 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            সাইন ইন
                        </button>
                    </form>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs text-gray-400">অথবা</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal normal-case flex items-center gap-2">
                            <FcGoogle size={18} /> Google দিয়ে চালিয়ে যান
                        </button>
                        <button type="button" className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal normal-case flex items-center gap-2">
                            <FaGithub size={18} /> GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link href="/sign-up" className="text-[#008236] font-semibold hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-4 px-6 text-xs text-gray-500">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                    <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
                </div>
            </footer>
        </div>
    );
}
