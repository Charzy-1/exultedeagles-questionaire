import Link from "next/link";

const ThankYou = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Thank You!</h1>
      <p className="text-lg text-gray-600 px-6 lg:max-w-3xl text-center">
        We value your candid feedback and appreciate you taking the time to
        complete the survey. It will be used to improve our services.
      </p>
      <Link href="/">
        <button className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 font-bold py-3 rounded hover:bg-yellow-400 hover:text-black shadow-xl mt-8">
          Back to Home
        </button>
      </Link>
    </section>
  );
};

export default ThankYou;
