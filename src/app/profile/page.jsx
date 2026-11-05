'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    // যদি সেশন লোড হতে থাকে
    if (isPending) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-gray-500 text-sm">
                লোড হচ্ছে...
            </div>
        );
    }

    // যদি ইউজার লগইন করা না থাকে, তবে সাইন-ইন পেজে রিডাইরেক্ট করা
    if (!session) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl mb-3">🔒</div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">অনুমোদিত নয় (Unauthorized)</h2>
                <p className="text-xs text-gray-500 mb-4">এই পেজটি দেখতে হলে আপনাকে প্রথমে সাইন ইন করতে হবে।</p>
                <Link
                    href="/signin"
                    className="bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    const user = session.user;

    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে লগআউট করা হয়েছে!");
                    router.push("/signin");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "লগআউট করতে সমস্যা হয়েছে!");
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans py-10 px-4">
            <div className="max-w-xl mx-auto space-y-6">

                {/* Top Header / Back Home */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xs font-semibold text-[#05893E] hover:underline flex items-center gap-1">
                        ← হোম পেজে ফিরে যান
                    </Link>
                    <span className="text-xs bg-emerald-50 text-[#05893E] px-3 py-1 rounded-full font-medium border border-emerald-100">
                        অ্যাক্টিভ অ্যাকাউন্ট
                    </span>
                </div>

                {/* Profile Card */}
                <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-2xs space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#EBF3EC] text-[#05893E] flex items-center justify-center text-2xl font-bold border border-emerald-100 shadow-2xs">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "👤"}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">{user?.name || "নাম পাওয়া যায়নি"}</h1>
                            <p className="text-xs text-gray-400">{user?.email || "ইমেল উপলব্ধ নেই"}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">অ্যাকাউন্ট আইডি:</span>
                            <span className="font-mono text-gray-600">{user?.id}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">ইমেল ভেরিফিকেশন:</span>
                            <span className="text-[#05893E] font-semibold">{user?.emailVerified ? "ভেরিফাই করা" : "ভেরিফাই করা হয়নি"}</span>
                        </div>
                    </div>

                    {/* Action Buttons (C3: Update Info & SignOut) */}
                    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center gap-3">
                        <Link
                            href="/profile/update"
                            className="w-full sm:w-auto text-center bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition shadow-2xs"
                        >
                            Update Information
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-full sm:w-auto text-center bg-gray-50 hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-200 text-xs font-semibold px-5 py-2.5 rounded-lg transition"
                        >
                            সাইন আউট করুন
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}