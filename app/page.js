
export default function HomePage() {
  return (
    <div className="bg-blue-400 h-screen flex flex-col justify-center items-center ">
      <div className=" p-20 text-center bg-blue-200 rounded-3xl shadow-2xl ">
        <h1 className="text-4xl text-blue-900 mb-4 font-serif">Welcome Back!</h1>
        <p className="text-gray-800 text-lg mb-6">
          
         Sign up or log in to continue.
        </p>
        <div className="">
          <p className="text-gray-600 text-lg">Create an Account</p>
          <a
            href="/signup"
            className="border-1  bg-white px-6 py-2 rounded-lg flex flex-row "
          >
            Sign Up
          </a>
         </div>
  
    </div>
    </div>
  );
}
