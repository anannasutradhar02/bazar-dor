import { Suspense } from "react";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/api";
import Navbar from "@/components/navbar";

const getProductIcon = (nameBn, category) => {
  const name = nameBn || "";

  if (name.includes("আলু")) return "🥔";
  if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) return "🧅";
  if (name.includes("রসুন")) return "🧄";
  if (name.includes("আদা")) return "🫚";
  if (name.includes("মরিচ")) return "🌶️";
  if (name.includes("ধনেপাতা") || name.includes("ধনে")) return "🌿";
  if (name.includes("হলুদ") || name.includes("গুঁড়া")) return "🧂";
  if (name.includes("বেগুন")) return "🍆";
  if (name.includes("ঢেঁড়স") || name.includes("ঢেরস")) return "🥒";
  if (name.includes("টমেটো") || name.includes("সবজি")) return "🥦";
  if (name.includes("চাল") || name.includes("বাসমতি") || name.includes("মিনিকেট")) return "🍚";
  if (name.includes("ডাল") || name.includes("মসুর") || name.includes("মুগ") || name.includes("ছোলা")) return "🥣";
  if (name.includes("তেল") || name.includes("সরিষার") || name.includes("পাম")) return "🍾";
  if (name.includes("চিংড়ি")) return "🦐";
  if (name.includes("মাছ") || name.includes("রুই") || name.includes("তেলাপিয়া") || name.includes("ইলিশ") || name.includes("কাতলা")) return "🐟";
  if (name.includes("মুরগির") || name.includes("গরুর") || name.includes("খাসির") || name.includes("হাঁসের") || name.includes("মাংস")) return "🥩";
  if (name.includes("ডিম")) return "🥚";
  if (name.includes("দুধ")) return "🥛";
  if (name.includes("দই")) return "🥣";
  if (name.includes("মাখন")) return "🧀";

  switch (category?.toLowerCase()) {
    case "chal": return "🍚";
    case "dal": return "🥣";
    case "tel": return "🍾";
    case "sobji": return "🥦";
    case "mach": return "🐟";
    case "mansh": return "🥩";
    case "dim-dudh": return "🥚";
    case "mosla": return "🧄";
    default: return "🛒";
  }
};

export default function Home({ searchParams }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center text-gray-500 text-sm">লোড হচ্ছে...</div>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeContent({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || "";

  let productsData = category ? await getProductsByCategory(category) : await getProducts();
  let categoriesData = await getCategories();

  const products = Array.isArray(productsData) 
    ? productsData 
    : productsData.data || productsData.products || [];

  const priceIncreased = products.filter((p) => p.change?.dir === "up");
  const priceDecreased = products.filter((p) => p.change?.dir === "down");

  // এখানে টেস্ট করার জন্য isLoggedIn = true দিতে পারেন, 
  // তবে পরবর্তীতে Better Auth এর session ডেটা অনুযায়ী এই মান পাস করবেন।
  const isLoggedIn = true; 

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-gray-800 font-sans">
      
      {/* Dynamic Navbar Component */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Hero Banner Section */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block bg-[#EBF3EC] text-[#05893E] text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-100">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#all-products"
              className="inline-block bg-[#05893E] hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition shadow-2xs text-center"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="w-44 h-36 flex items-center justify-center bg-[#F8FAF8] rounded-xl border border-gray-100 text-6xl shadow-2xs">
            🧺
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        
        {/* Top Gainers */}
        {priceIncreased.length > 0 && !category && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <span className="text-red-500">▲</span> আজ দাম বেড়েছে
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceIncreased.slice(0, 6).map((product) => (
                <div key={product.id} className="p-4 bg-white border border-gray-200/70 rounded-xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getProductIcon(product.nameBn, product.category)}</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                      <p className="text-[10px] text-gray-400">{product.categoryNameBn}</p>
                      <p className="text-xs font-bold text-gray-900 mt-1">৳{product.today}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                    ▲ {product.change?.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Losers */}
        {priceDecreased.length > 0 && !category && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <span className="text-emerald-600">▼</span> আজ দাম কমেছে
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceDecreased.slice(0, 6).map((product) => (
                <div key={product.id} className="p-4 bg-white border border-gray-200/70 rounded-xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getProductIcon(product.nameBn, product.category)}</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                      <p className="text-[10px] text-gray-400">{product.categoryNameBn}</p>
                      <p className="text-xs font-bold text-gray-900 mt-1">৳{product.today}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    ▼ {product.change?.pct}%
                  </span>
                </div>
              ))}
            </div>
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
              কোনো পণ্য পাওয়া যায়নি!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs transition hover:shadow-xs"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                    {getProductIcon(product.nameBn, product.category)}
                  </div>

                  <h4 className="text-xs font-bold text-gray-900">{product.nameBn}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{product.categoryNameBn}</p>

                  <div className="mt-3 flex items-center justify-between">
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
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 bg-white py-4 px-6 text-xs text-gray-500 max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </footer>

    </div>
  );
}