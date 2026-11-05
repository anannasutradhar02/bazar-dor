'use client';

import { Suspense, useState, useEffect } from "react";
import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home({ searchParams }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-gray-500 text-sm">লোড হচ্ছে...</div>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

function HomeContent({ searchParams }) {
  const [resolvedSearchParams, setResolvedSearchParams] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // User session check
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Home Signup Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function resolveParamsAndFetch() {
      if (searchParams) {
        const resolved = await searchParams;
        setResolvedSearchParams(resolved);
      }
      try {
        const [pData, cData] = await Promise.all([getProducts(), getCategories()]);
        setProductsData(pData);
        setCategoriesData(cData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    resolveParamsAndFetch();
  }, [searchParams]);

  const category = resolvedSearchParams?.category || "";

  const allProducts = Array.isArray(productsData) 
    ? productsData 
    : productsData.data || productsData.products || [];

  // সাইন-আপ হ্যান্ডলার
  const handleHomeSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        toast.success("সফলভাবে একাউন্ট তৈরি হয়েছে!");
        router.push("/sign-in");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে!");
        setSubmitting(false);
      }
    });
  };

  // সোশ্যাল সাইন-আপ (Google)
  const handleSocialSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const getProductDisplayIcon = (product) => {
    const name = String(product.nameBn || "").toLowerCase();
    const cat = String(product.category || "").toLowerCase();

    if (name.includes("চাল") || name.includes("মিনিকেট") || name.includes("নাজিরশাইল") || name.includes("পোলাও")) return "🍚";
    if (name.includes("মসুর") || name.includes("মুগ") || name.includes("ছোলা") || name.includes("খেসারি") || name.includes("মাষকলাই")) return "🥣";
    if (name.includes("তেল") || name.includes("সয়াবিন") || name.includes("সরিষার")) return "🍾";
    if (name.includes("আদা")) return "🫚";
    if (name.includes("রসুন")) return "🧄";
    if (name.includes("পেঁয়াজ") || name.includes("পেয়াজ")) return "🧅";
    if (name.includes("আলু")) return "🥔";
    if (name.includes("মরিচ")) return "🌶️";
    if (name.includes("হলুদ") || name.includes("জিরা") || name.includes("ধনে") || name.includes("মসলা")) return "🧂";
    if (name.includes("রুই") || name.includes("ইলিশ") || name.includes("কাতলা") || name.includes("তেলাপিয়া") || name.includes("পাঙ্গাস") || name.includes("মাছ")) return "🐟";
    if (name.includes("মুরগি") || name.includes("ব্রয়লার") || name.includes("গরু") || name.includes("খাসি") || name.includes("মাংস")) return "🥩";
    if (name.includes("ডিম")) return "🥚";
    if (name.includes("দুধ") || name.includes("দই") || name.includes("মাখন")) return "🥛";
    if (name.includes("টমেটো") || name.includes("বেগুন") || name.includes("পটল") || name.includes("ঢেঁড়স") || name.includes("সবজি")) return "🥦";

    if (cat.includes("chal")) return "🍚";
    if (cat.includes("dal")) return "🥣";
    if (cat.includes("tel")) return "🍾";
    if (cat.includes("sobji")) return "🥦";
    if (cat.includes("mach")) return "🐟";
    if (cat.includes("mangsho")) return "🥩";
    if (cat.includes("dim")) return "🥛";
    if (cat.includes("mosla")) return "🧄";

    return "🛒";
  };

  let products = allProducts;
  if (category) {
    const targetCat = String(category).toLowerCase();
    products = allProducts.filter((p) => {
      const pCat = String(p.category || "").toLowerCase();
      return pCat === targetCat || 
             (targetCat === "mangsho" && (pCat.includes("meat") || pCat.includes("man") || pCat.includes("mangsho"))) ||
             (targetCat === "mach" && (pCat.includes("fish") || pCat.includes("mac"))) ||
             (targetCat === "sobji" && (pCat.includes("vegetable") || pCat.includes("sob"))) ||
             (targetCat === "chal" && (pCat.includes("rice") || pCat.includes("chal"))) ||
             (targetCat === "dal" && (pCat.includes("lentil") || pCat.includes("dal"))) ||
             (targetCat === "tel" && (pCat.includes("oil") || pCat.includes("tel"))) ||
             (targetCat === "dim-dui" && (pCat.includes("egg") || pCat.includes("milk") || pCat.includes("dim"))) ||
             (targetCat === "mosla" && (pCat.includes("spice") || pCat.includes("mosla")));
    });
  }

  const priceIncreased = allProducts.filter((p) => p.change?.dir === "up");
  const priceDecreased = allProducts.filter((p) => p.change?.dir === "down");

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans">
      
      {/* 1. Navbar & Ticker */}
      <Navbar tickerProducts={allProducts} />

      {/* 2. Navbar-এর ঠিক নিচে Signup Form (Shudhumatro user login kora na thakle dekhabe) */}
      {/* {!isPending && !user && !category && (
        <section className="max-w-md mx-auto px-4 mt-6">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1 text-center">নতুন অ্যাকাউন্ট তৈরি করুন</h3>
            <p className="text-[11px] text-gray-400 mb-4 text-center">বাজার দর আপডেট পেতে রেজিস্টার করুন</p>

            <form onSubmit={handleHomeSignUp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">নাম (Name)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="আপনার নাম লিখুন"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#05893E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">ইমেল (Email)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#05893E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">পাসওয়ার্ড (Password)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#05893E]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition mt-2 cursor-pointer"
              >
                {submitting ? "তৈরি হচ্ছে..." : "রেজিস্টার করুন"}
              </button>
            </form>

            <div className="mt-3">
              <button
                onClick={handleSocialSignIn}
                type="button"
                className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🌐</span> Google দিয়ে সাইন ইন
              </button>
            </div>

            <p className="text-center text-[11px] text-gray-500 mt-3">
              অ্যাকাউন্ট আছে?{" "}
              <Link href="/sign-in" className="text-[#05893E] font-semibold hover:underline">
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </section>
      )} */}

      {/* 3. Hero Banner Section */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block bg-[#EBF3EC] text-[#05893E] text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-100">
              বুধবার, ৫ নভেম্বর, ২০২৬
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#all-products"
                className="bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition shadow-2xs text-center"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="w-44 h-36 flex items-center justify-center bg-[#F8FAF8] rounded-xl border border-gray-100 text-6xl shadow-2xs">
            🧺
          </div>
        </div>
      </section>

      {/* Main Content Sections (Gainers, Losers, All Products) */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        
        {!category && (
          <div className="space-y-8">
            {priceIncreased.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <span className="text-red-500">▲</span> আজ দাম বেড়েছে
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {priceIncreased.slice(0, 6).map((product, index) => {
                    const productId = product._id || product.id || index;
                    return (
                      <Link 
                        key={productId} 
                        href={`/products/${productId}`}
                        className="p-4 bg-white border border-gray-200/70 rounded-xl flex items-center justify-between shadow-2xs hover:shadow-md transition block"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getProductDisplayIcon(product)}</span>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                            <p className="text-[10px] text-gray-400">{product.categoryNameBn}</p>
                            <p className="text-xs font-bold text-gray-900 mt-1">৳{product.today}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                          ▲ {product.change?.pct}%
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {priceDecreased.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <span className="text-emerald-600">▼</span> আজ দাম কমেছে
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {priceDecreased.slice(0, 6).map((product, index) => {
                    const productId = product._id || product.id || index;
                    return (
                      <Link 
                        key={productId} 
                        href={`/products/${productId}`}
                        className="p-4 bg-white border border-gray-200/70 rounded-xl flex items-center justify-between shadow-2xs hover:shadow-md transition block"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getProductDisplayIcon(product)}</span>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                            <p className="text-[10px] text-gray-400">{product.categoryNameBn}</p>
                            <p className="text-xs font-bold text-gray-900 mt-1">৳{product.today}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ▼ {product.change?.pct}%
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Products Grid */}
        <div id="all-products" className="scroll-mt-24">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {category ? `ফিল্টার করা পণ্য (${products.length})` : "সব পণ্য"}
            </h3>
            <p className="text-xs text-gray-400">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-200">
              কোনো পণ্য পাওয়া যায়নি!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product, index) => {
                const productId = product._id || product.id || index;
                return (
                  <Link
                    key={productId}
                    href={`/products/${productId}`}
                    className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs transition hover:shadow-md block h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                        {getProductDisplayIcon(product)}
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
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            product.change.dir === "up"
                              ? "bg-red-50 text-red-500"
                              : product.change.dir === "down"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                          {Math.abs(product.change.pct)}%
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500 max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </footer>

    </div>
  );
}