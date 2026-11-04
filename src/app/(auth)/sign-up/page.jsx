'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passowrd duto mile nai!');
            return;
        }

        setLoading(true);
        try {
            // Ekhane amra amader backend API ba BetterAuth endpoint call korbo
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Account safolvabe toiri hoyeche!');
                router.push('/signin');
            } else {
                toast.error(data.message || 'Kothaw kono bhul hoyeche!');
            }
        } catch (err) {
            toast.error('Server connection error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center py-12 px-4">
            <div className="max-w-md w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">

                {/* Title & Subtitle */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-neutral">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="text-sm text-gray-500 mt-1">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="label text-xs font-semibold">নাম</label>
                        <input
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="input input-bordered w-full text-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label text-xs font-semibold">ইমেইল</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label text-xs font-semibold">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input input-bordered w-full text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label text-xs font-semibold">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            type="password"
                            placeholder="আবার লিখুন"
                            className="input input-bordered w-full text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn bg-[#008236] hover:bg-[#00682b] text-white w-full mt-2 ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                {/* Divider */}
                <div className="divider text-xs text-gray-400 my-6">অথবা</div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="btn btn-outline btn-sm text-xs flex items-center justify-center gap-2 normal-case">
                        <FcGoogle size={18} /> Google দিয়ে চালিয়ে যান
                    </button>
                    <button className="btn btn-outline btn-sm text-xs flex items-center justify-center gap-2 normal-case">
                        <FaGithub size={18} /> GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                {/* Footer Link */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    অ্যাকাউন্ট আছে?{' '}
                    <Link href="/signin" className="text-[#008236] font-semibold hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>

            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
                <Link href="/" className="text-xs text-gray-500 hover:underline">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}