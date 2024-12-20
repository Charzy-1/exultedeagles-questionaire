import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-2 bg-yellow-500 text-center">
      {/* Exulted logo image */}
      <div className="w-300 h-200 h-[200px]mb-4 w-[300px]">
        <Image
          src="/images/Exultedlogo.jpeg"
          alt="Exulted eagles logo"
          width={30} // Desired width of the image
          height={20} // Desired height of the image
          layout="responsive" // Optional: Makes the image responsive
          // objectFit="cover"
        />
      </div>
      <h2 className="p-3 text-2xl font-bold lg:max-w-4xl lg:text-4xl">
        Welcome to Exulted Eagles's Customer satisfaction survery portal
      </h2>
      <p className="p-3 text-lg text-gray-600">
        Your feedback helps us improve our solar products and services.
      </p>
      <Link href="/questionnaire">
        <button className="mt-4 rounded bg-gradient-to-r from-red-400 to-red-800 px-4 py-3 font-bold text-white shadow-xl hover:bg-black hover:bg-none">
          Start Questionnaire
        </button>
      </Link>
    </section>
  );
};
export default Home;
