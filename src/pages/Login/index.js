import images from "../../assets/images";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
    return (
        <div className="flex justify-between min-h-screen bg-gradient-15 p-40 pt-20">
            {/* Left Section - Image */}
            <div className="flex items-center pt-10">
                <img className="max-w-full h-auto" src={images.login} alt="Login Devices" />
            </div>

            {/* Right Section - Form */}
            <form className="flex flex-col items-center border border-primary rounded-lg py-10 px-20 ml-40 bg-white shadow-lg">
                {/* Title */}
                <div className="text-2xl font-bold mb-6">ĐĂNG NHẬP</div>

                {/* Email */}
                <div className="flex items-center bg-white border border-primary rounded-lg my-4 px-4 py-2 w-full">
                    <HiOutlineMail className="text-gray-400 mr-3 text-xl" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Password */}
                <div className="flex items-center bg-white border border-primary rounded-lg my-4 px-4 py-2 w-full">
                    <CiLock className="text-gray-400 mr-3 text-xl" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex justify-between items-center w-full my-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all">
                    LOGIN
                </button>

                {/* OR Divider */}
                <div className="flex items-center w-full my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <div className="px-2 text-sm text-gray-500">or</div>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex justify-between w-full gap-4">
                    <button className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                        <FaFacebook className="mr-2 text-lg" /> Facebook
                    </button>
                    <button className="flex-1 flex items-center justify-center border border-primary text-black py-2 rounded-lg font-medium hover:bg-second transition-all">
                        <FcGoogle className="mr-2 text-lg" /> Google
                    </button>
                </div>

                {/* Sign-up link */}
                <div className="text-sm text-gray-500 mt-6">
                    Not a member?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign up now
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Login;
