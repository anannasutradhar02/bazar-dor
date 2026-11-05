'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getCategories, getProducts } from "@/lib/api";
import toast from "react-hot-toast";

export default function CategoryDynamicPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug || "chal";

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const catData = await getCategories();
                const categoriesList = catData.categories || catData || [];
                setCategories(categoriesList);

                const matchedCat = categoriesList.find(
                    (c) => String(c.slug || c.id) === String(slug)
                );
                setCurrentCategory(matchedCat || { name: slug, icon: "🌾" });

                const prodData = await getProducts();
                const allProducts = prodData.products || prodData || [];

                const filteredProducts = allProducts.filter((p) => {
                    if (!p.category) return true;
                    return String(p.category).toLowerCase() === String(slug).toLowerCase();
                });

                setProducts(filteredProducts.length > 0 ? filteredProducts : allProducts);

            } catch (error) {
                console.error("Data fetch error:", error);
                toast.error("ডাটা লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "low-high") return Number(a.price) - Number(b.price);
        if (sortOption === "high-low") return Number(b.price) - Number(a.price);
        return 0;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-xs text-gray-500">
                লোডিং হচ্ছে...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans flex flex-col justify-between">
            <div>
                <Navbar />

                {/* Category Navigation Bar */}
                <div className="bg-white border-b border-gray-200/80 px-4 py-2.5">
                    <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id || cat.slug || cat._id}
                                href={`/categories/${cat.slug || cat.id}`}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer ${slug === (cat.slug || cat.id)
                                        ? "bg-[#05893E] text-white shadow-2xs"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <span>{cat.icon || "📦"}</span>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

                    {/* Active Category Header Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100">
                            {currentCategory?.icon || "🌾"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{currentCategory?.name || slug}</h1>
                            <p className="text-xs text-gray-500 mt-1">{sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                        </div>
                    </div>

                    {/* Filter & Sort Row */}
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-gray-500 font-medium">
                            মোট <span className="font-bold text-gray-800">{sortedProducts.length}টি</span> পণ্য দেখানো হচ্ছে
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">সাজান:</span>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#05893E] text-gray-700 font-medium cursor-pointer shadow-2xs"
                            >
                                <option value="default">ডিফল্ট</option>
                                <option value="low-high">দাম: কম থেকে বেশি</option>
                                <option value="high-low">দাম: বেশি থেকে কম</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Cards Grid with Click Test */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedProducts.map((product, index) => {
                            const productId = product._id || product.id || index;
                            return (
                                <div
                                    key={productId}
                                    onClick={() => {
                                        alert("ক্লিক কাজ করেছে! ID: " + productId);
                                        router.push(`/products/${productId}`);
                                    }}
                                    className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between cursor-pointer h-full relative z-10"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl border border-gray-100 flex-shrink-0">
                                            {currentCategory?.icon || "🌾"}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-[11px] text-gray-400 mt-0.5">{product.unit || "প্রতি কেজি"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between pt-2 border-t border-gray-50">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-medium">আজকের দাম</p>
                                            <p className="text-lg font-extrabold text-gray-900 mt-0.5">
                                                {product.price} <span className="text-xs font-normal text-gray-600">টাকা</span>
                                            </p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${product.isUp || product.change?.includes('▲')
                                                ? "bg-red-50 text-red-500"
                                                : "bg-emerald-50 text-emerald-600"
                                            }`}>
                                            {product.change || "— 0.0%"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </main>
            </div>

            <footer className="border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500 max-w-7xl mx-auto w-full mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </footer>
        </div>
    );
}