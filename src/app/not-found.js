import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-green-700">404</h1>

      <h2 className="mt-4 text-2xl font-bold">
        দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;