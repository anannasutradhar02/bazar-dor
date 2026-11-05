# BazarDor (বাজার দর)

**BazarDor** is a modern and responsive daily commodity market price tracking application. It allows users to easily view real-time market prices, minimum/maximum price ranges, averages, and daily price fluctuation trends (price increases and decreases) for essentials such as rice, lentils, oil, vegetables, fish, meat, and spices.

---

## 🛠️ Technologies Used

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Authentication:** BetterAuth (Email/Password & Social Login)
* **Icons & UI:** React Icons, Lucide React, DaisyUI
* **Notifications:** React Hot Toast
* **Deployment:** Vercel / Netlify

---

## ⭐ 5 Key Features

1. **Dynamic Price Ticker:** 
   An infinite-scrolling live price ticker located directly under the navigation bar displaying real-time daily price changes.

2. **Category Filtering & Sorting:** 
   Allows users to filter products by specific categories and sort product listings dynamically (Price: Low to High | Price: High to Low).

3. **Protected Product Details Route:** 
   A secure details page for each product showing market-wise price breakdowns, average prices, price ranges, and percentage changes (accessible only to authenticated users).

4. **Authentication System:** 
   Full authentication workflow implemented using BetterAuth, supporting Email/Password Registration, Sign In, and Social Auth (Google/GitHub).

5. **Profile Management & Updates:** 
   Dedicated profile area allowing users to view account status, update user details via `authClient.updateUser`, and securely sign out.

