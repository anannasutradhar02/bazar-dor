'use client';

import { useState, useEffect, use } from "react";
import { getCategories, getProducts } from "@/lib/api";
import Link from "next/link";

export default function CategoryPage({ params }) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        async function loadData() {
            try {
                const [cats, prods] = await Promise.all([getCategories(), getProducts()]);

                const allCats = Array.isArray(cats) ? cats : cats.data || cats.categories || [];
                const allProds = Array.isArray(prods) ? prods : prods.data || prods.products || [];

                const foundCat = allCats.find(c => c.slug === slug);
                setCategory(foundCat || null);

                const filtered = allProds.filter(p => String(p.category || "").toLowerCase() === String(slug).toLowerCase());
                setProducts(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-gray-500 text-sm">
                লোড হচ্ছে... (Skeleton Loading)
            </div>
        );
    }

    // Invalid Category / 404 State
    if (!category || products.length === 0) {
        return (
            <div className="min-h-screen bg-[#F4F6F4] flex flex-col items-center justify-center text-center px-4">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">কোনো পণ্য পাওয়া যায়নি বা ক্যাটাগরি ভুল!</h2>
                <p className="text-xs text-gray-500 mb-6">আপনি যে ক্যাটাগরি খুঁজছেন তা বিদ্যমান নয়।</p>
                <Link href="/" className="bg-[#05893E] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow transition hover:bg-emerald-700">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // Sorting Logic (Bengali Numeric/Value Sort)
    const sortedProducts = [...products].sort((a, b) => {
        const priceA = Number(a.today) || 0;
        const priceB = Number(b.today) || 0;
        if (sortOrder === "low-to-high") return priceA - priceB;
        if (sortOrder === "high-to-low") return priceB - priceA;
        return 0; // default
    });

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans p-6">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header & Sort Control */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon || "🛒"}</span>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{category.nameBn}</h1>
                            <p className="text-xs text-gray-400">মোট {products.length}টি পণ্য উপলব্ধ</p>
                        </div>
                    </div>

                    {/* C1: Sort Control */}
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 font-medium">সাজান:</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#05893E]"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-to-high">দাম: কম থেকে বেশি</option>
                            <option value="high-to-low">দাম: বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedProducts.map((product, index) => {
                        const productId = product._id || product.id || index;
                        return (
                            <Link
                                key={productId}
                                href={`/products/${productId}`}
                                className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs transition hover:shadow-md block h-full flex flex-col justify-between"
                            >
                                <div>
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                                        {product.image || category.icon || "🛒"}
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{product.categoryNameBn}</p>
                                </div>

                                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50">
                                    <div>
                                        <span className="text-[10px] text-gray-400 block">আজকের দাম</span>
                                        <p className="text-xs font-bold text-gray-900">
                                            ৳{product.today}
                                            <span className="text-[10px] font-normal text-gray-400">/{product.unit}</span>
                                        </p>
                                    </div>
                                    {product.change && (
                                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${product.change.dir === "up" ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"
                                            }`}>
                                            {product.change.dir === "up" ? "▲" : "▼"} {Math.abs(product.change.pct)}%
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}