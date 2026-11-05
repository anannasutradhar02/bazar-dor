import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ১. টোস্ট প্যাকেজটি ইম্পোর্ট করা হলো

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাজারের নিত্যপ্রয়োজনীয় পণ্যের দামের আপডেট",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn" // বাংলা ভাষার জন্য 'bn' করে দেওয়া হলো
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ২. এই Toaster কম্পোনেন্টটি থাকার কারণে এখন সব টোস্ট মেসেজ শো করবে */}
        <Toaster position="top-center" reverseOrder={false} />
        
        {children}
      </body>
    </html>
  );
}