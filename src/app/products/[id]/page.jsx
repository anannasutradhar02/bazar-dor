'use client';

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getProducts } from "@/lib/api";
import toast from "react-hot-toast";

function ProductDetailsContent() {
    const params = useParams();
    const id = params?.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getProducts();
                const productsList = data.products || data;

                // ID, _id বা Index—যেকোনো একটা ম্যাচ করলেই পণ্য পেয়ে যাবে
                const foundProduct = productsList.find(
                    (p, index) =>
                        String(p.id) === String(id) ||
                        String(p._id) === String(id) ||
                        String(index) === String(id)
                );

                setProduct(foundProduct || null);
            } catch (error) {
                console.error("Error fetching product details:", error);
                toast.error("পণ্যের ডিটেইলস লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-xs text-gray-500">
                লোডিং হচ্ছে...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex flex-col justify-between">
                <div>
                    <Navbar />
                    <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">পণ্যটি পাওয়া যায়নি!</h2>
                        <Link href="/" className="inline-block px-4 py-2 bg-[#05893E] text-white text-xs rounded-xl">
                            হোমে ফিরে যান
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const markets = product?.markets || [
        { name: "Town Bazar", division: "Mymensingh", min: "৫৯ টাকা", max: "৬২ টাকা", avg: "৬২ টাকা" },
        { name: "Sadar Bazar", division: "Rajshahi", min: "৬০ টাকা", max: "৬৬ টাকা", avg: "৬৩ টাকা" },
        { name: "Bazarhat", division: "Khulna", min: "৬০ টাকা", max: "৬৭ টাকা", avg: "৬৩.৫০ টাকা" },
        { name: "Bus Terminal Bazar", division: "Rajshahi", min: "৬০ টাকা", max: "৬৮ টাকা", avg: "৬৪ টাকা" },
        { name: "Pourashava Bazar", division: "Mymensingh", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৪.২০ টাকা" },
        { name: "Amtoli Bazar", division: "Chittagong", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৫ টাকা" },
        { name: "Karwan Bazar", division: "Dhaka", min: "৬৩ টাকা", max: "৭৩ টাকা", avg: "৬৯ টাকা" },
    ];

    const productName = product?.name || product?.nameBn;
    const productPrice = product?.price || product?.today;
    const productUnit = product?.unit || "প্রতি কেজি";

    // Safe check for change object to prevent React object render error
    let changeText = "";
    let isUp = false;
    if (product?.change) {
        if (typeof product.change === "object") {
            isUp = product.change.dir === "up";
            changeText = `${isUp ? "▲" : product.change.dir === "down" ? "▼" : "—"} ${Math.abs(product.change.pct || 0)}%`;
        } else {
            changeText = String(product.change);
            isUp = changeText.includes("▲") || changeText.includes("up");
        }
    } else {
        changeText = "— 0.0%";
    }

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans flex flex-col justify-between">
            <div>
                <Navbar />

                <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Link href="/" className="hover:text-[#05893E]">Home</Link>
                        <span>›</span>
                        <span className="text-gray-900 font-bold">{productName}</span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100 flex-shrink-0">
                                🍚
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-900">{productName}</h1>
                                <p className="text-xs text-gray-500 mt-0.5">{productUnit}</p>
                                <p className="text-xs text-gray-600 mt-2 font-medium bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">
                                    {product?.note || "আজকের বাজারদর আপডেট করা হয়েছে"}
                                </p>
                            </div>
                        </div>

                        <div className="bg-emerald-50/60 border border-emerald-100 px-6 py-4 rounded-xl text-center md:text-right w-full md:w-auto">
                            <p className="text-[11px] text-emerald-800 font-medium">আজকের দাম</p>
                            <div className="flex items-baseline justify-center md:justify-end gap-1 mt-0.5">
                                <span className="text-2xl font-black text-gray-900">{productPrice}</span>
                                <span className="text-xs text-gray-600">টাকা</span>
                            </div>
                            <span className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded ${isUp ? "text-red-500 bg-red-50" : "text-emerald-600 bg-emerald-50"
                                }`}>
                                {changeText}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
                        <h2 className="text-sm font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-medium">সবচেয়ে কম দাম</p>
                                <p className="text-xl font-bold text-emerald-600 mt-1">{product?.minPrice || `${Number(productPrice) - 3} টাকা`}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">সবচেয়ে কম দামের বাজার</p>
                            </div>

                            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-medium">সবচেয়ে বেশি দাম</p>
                                <p className="text-xl font-bold text-red-500 mt-1">{product?.maxPrice || `${Number(productPrice) + 5} টাকা`}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">সবচেয়ে বেশি দামের বাজার</p>
                            </div>

                            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
                                <p className="text-xl font-bold text-gray-900 mt-1">{product?.avgPrice || `${productPrice} টাকা`}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">প্রতি কেজির হিসাব</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-sm font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-200/60 text-gray-500 font-semibold">
                                        <th className="py-3 px-6">বাজার</th>
                                        <th className="py-3 px-6">বিভাগ</th>
                                        <th className="py-3 px-6">সর্বনিম্ন</th>
                                        <th className="py-3 px-6">সর্বাধিক</th>
                                        <th className="py-3 px-6">গড়</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {markets.map((m, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition">
                                            <td className="py-3.5 px-6 font-medium text-gray-900">{m.name}</td>
                                            <td className="py-3.5 px-6 text-gray-500">{m.division}</td>
                                            <td className="py-3.5 px-6 font-semibold text-emerald-600">{m.min}</td>
                                            <td className="py-3.5 px-6 font-semibold text-red-500">{m.max}</td>
                                            <td className="py-3.5 px-6 font-bold text-gray-900">{m.avg}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>

            <footer className="border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500 max-w-7xl mx-auto w-full mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </footer>
        </div>
    );
}

export default function ProductDetailsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-xs text-gray-500">লোড হচ্ছে...</div>}>
            <ProductDetailsContent />
        </Suspense>
    );
}