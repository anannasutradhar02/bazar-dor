const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

// ১. সব পণ্য পাওয়ার API
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

// ২. সব ক্যাটাগরি পাওয়ার API
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

// ৩. ক্যাটাগরি অনুযায়ী পণ্য পাওয়ার API (সঠিক কুয়েরি প্যারামিটার সহ)
export const getProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products?category=${category}`);

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }
  return res.json();
};