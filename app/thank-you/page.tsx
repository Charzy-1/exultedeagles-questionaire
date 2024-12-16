import Link from "next/link";

const ThankYou = () => {
  return (
    <section className="py-32 px-10 min-h-screen">
      <div className="text-center md:w-1/2 lg:w-2/3 md:mx-auto">
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="text-lg text-gray-600 px-6  text-center">
          We value your candid feedback and appreciate you taking the time to
          complete the survey. It will be used to improve our services.
        </p>
        <Link href="/">
          <button className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 font-bold py-3 rounded hover:bg-yellow-400 hover:text-black hover:bg-none shadow-xl mt-8">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ThankYou;
