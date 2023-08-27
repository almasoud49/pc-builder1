import Head from "next/head";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const callbackUrl = "http://localhost:3000/";
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <Head>
        <title>PC Builder Login</title>
      </Head>
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Welcome to PC Builder
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Please log in to access the ultimate PC building experience!
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <FcGoogle
            className="cursor-pointer text-5xl text-red-600 hover:text-red-800 transition-colors"
            onClick={() =>
              signIn("google", {
                callbackUrl: { callbackUrl },
              })
            }
          />
          <FaGithub
            className="cursor-pointer text-5xl text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() =>
              signIn("github", {
                callbackUrl: { callbackUrl },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
