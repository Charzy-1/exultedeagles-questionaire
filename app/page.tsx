import Link from "next/link";

const Home = () => {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Our Feedback Portal</h1>
      <p className="text-lg text-gray-600">
        Your feedback helps us improve our solar products and services.
      </p>
      <Link href="/questionnaire">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Questionnaire
        </button>
      </Link>
    </section>
  );
};
export default Home;
