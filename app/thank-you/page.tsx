import Link from "next/link";

export default function ThankYou() {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Thank You!</h1>
      <p className="text-lg text-gray-600">
        We appreciate your feedback and will use it to improve our services.
      </p>
      <Link href="/">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back to Home
        </button>
      </Link>
    </section>
  );
}
