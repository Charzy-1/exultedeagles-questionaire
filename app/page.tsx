import Link from "next/link";
import Image from "next/image";
const Home = () => {
  return (
    <section className="bg-yellow-500 flex flex-col min-h-screen text-center space-y-4 justify-center items-center">
      {/* Exulted logo image */}
      <div className="w-300 h-200 w-[300px] h-[200px]mb-4">
        <Image
          src="/images/Exultedlogo.jpeg"
          alt="Exulted eagles logo"
          width={30} // Desired width of the image
          height={20} // Desired height of the image
          layout="responsive" // Optional: Makes the image responsive
          // objectFit="cover"
        />
      </div>
      <h1 className="text-4xl font-bold">Welcome to Our Feedback Portal</h1>
      <p className="text-lg text-gray-600">
        Your feedback helps us improve our solar products and services.
      </p>
      <Link href="/questionnaire">
        <button className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 font-bold py-3 rounded hover:bg-black shadow-xl">
          Start Questionnaire
        </button>
      </Link>
    </section>
  );
};
export default Home;
