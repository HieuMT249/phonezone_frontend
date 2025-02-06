import images from "../../assets/images";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Toast } from 'primereact/toast';
import { Skeleton } from 'primereact/skeleton';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post("https://localhost:7274/api/v1/Auth/login", {
                email,
                password
            });

            // lưu trữ token
            localStorage.setItem("token", response.data);

            navigate("/");
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessage = err.response.data;
                toast.current.show({
                    severity: "error",
                    summary: "Lỗi",
                    detail: errorMessage,
                    life: 3000,
                });
            }
        }
        setLoading(false);
    }

    return (
        <div className="flex justify-between min-h-screen bg-gradient-15 p-40 pt-20">
            {/* Skeleton */}
            {loading && <Skeleton width="100%" height="100%"></Skeleton>}

            {/*Image */}
            <div className="flex items-center pt-10">
                <img className="max-w-full h-auto" src={images.login} alt="Login Devices" />
            </div>

            {/* TOAST */}
            <Toast ref={toast} />

            {/*Form */}
            <form className="flex flex-col items-center border border-primary rounded-lg py-10 px-20 ml-40 bg-white shadow-lg" onSubmit={handleLogin}>
                {/* Title */}
                <div className="text-2xl font-bold mb-6">ĐĂNG NHẬP</div>

                {/* Email */}
                <div className="flex items-center bg-white border border-primary rounded-lg my-4 px-4 py-2 w-full">
                    <HiOutlineMail className="text-gray-400 mr-3 text-xl" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center bg-white border border-primary rounded-lg my-4 px-4 py-2 w-full">
                    <CiLock className="text-gray-400 mr-3 text-xl" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex justify-end items-center w-full my-4">
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Quên mật khẩu?
                    </a>
                </div>

                {/* Login Button */}
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all">
                    ĐĂNG NHẬP
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
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Đăng ký
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Login;
