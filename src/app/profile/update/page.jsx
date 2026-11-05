'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
    const { data: session } = authClient.useSession();
    const [name, setName] = useState(session?.user?.name || "");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        await authClient.updateUser({
            name: name,
        }, {
            onSuccess: () => {
                toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
                router.push("/profile");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে!");
                setLoading(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">প্রোফাইল তথ্য আপডেট করুন</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">নাম (Name)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#05893E]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                    </button>
                </form>
            </div>
        </div>
    );
}