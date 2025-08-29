import { handleBuyMeClick } from "@/components/layout/navigation/main-navigation";

export default function Fail() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 px-4">
      <h1 className="text-white text-center text-3xl mb-4">
        😢 Oops! Payment failed
      </h1>
      <p className="text-gray-300 text-center mb-6">
        Something went wrong with your transaction. Don&apos;t worry, you can try again!
      </p>
      <button
        onClick={handleBuyMeClick}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}
