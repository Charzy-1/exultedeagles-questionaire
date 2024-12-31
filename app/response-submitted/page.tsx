/* eslint-disable tailwindcss/classnames-order */
import Image from "next/image";

const ThankYou = () => {
  return (
    <section className="flex justify-center items-center min-h-screen p-4">
      <div className="text-center bg-white md:w-1/2 lg:w-2/3 md:mx-auto flex flex-col items-center space-y-2">
        <Image
          src="/images/emoji.png"
          alt="thankyou-emoji"
          width={80}
          height={80}
        />
        <h1 className="text-2xl font-bold">Thank you for your time!</h1>
        <p className="text-lg text-gray-600 px-6">
          You have already submitted a response!
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
