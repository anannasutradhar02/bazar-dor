'use client';

import Navbar from "@/components/navbar";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const user = session?.user;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
        }
    }, [user]);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // এখানে নাম আপডেট করার লজিক বা API কল হবে
            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
        } catch (err) {
            toast.error('প্রোফাইল আপডেট করতে সমস্যা হয়েছে!');
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-xs text-gray-500">
                প্রোফাইল লোড হচ্ছে...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans flex flex-col justify-between">
            <div>
                <Navbar />

                <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h2>
                        <p className="text-xs text-gray-500 mt-0.5">আপনার অ্যাকাউন্টের তথ্য দেখুন।</p>
                    </div>

                    {/* User Info Card */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200/80 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-4">
                            {user?.image ? (
                                <img src={user.image} alt={user?.name || "User"} className="w-12 h-12 rounded-full object-cover border border-emerald-100" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                            )}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{user?.name || "ব্যবহারকারী"}</h3>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                            <span>↩</span> সাইন আউট
                        </button>
                    </div>

                    {/* Account Edit Form (Only Name & Update Button as per your design) */}
                    <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-2xs space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">তথ্য</h3>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#05893E] bg-white text-gray-800"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition shadow-2xs cursor-pointer ${loading ? 'opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
                        </button>
                    </form>
                </main>
            </div>

            <footer className="border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500 max-w-7xl mx-auto w-full mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </footer>
        </div>
    );
}