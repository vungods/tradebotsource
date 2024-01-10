import React from "react";

interface ErrorPageProps {
  errorCode: number;
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const handleGoHome = () => {
    window.location.href = "/"; // Navigate to the home page
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400 text-xl">
            {errorCode}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-800 dark:text-white md:text-4xl">
            {errorMessage}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Sorry, the page you are looking for is currently unavailable. Here
            are some helpful links.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <button
              onClick={handleGoHome}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </button>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className="w-full h-[40rem] lg:h-[32rem] md:h-[32rem] rounded-lg object-cover"
            src="/logo.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
