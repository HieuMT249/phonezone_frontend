import images from "../../assets/images";
import { HiOutlineMail } from "react-icons/hi";

function Login() {
    return ( 
        <div className="flex justify-between min-h-screen bg-gradient-15 p-40 pt-20">
            <div className="flex items-center pt-10"><img className="" src={images.login} /></div>
            <form className="border border-primary rounded-lg p-10 mr-40">
                <div>Đăng nhập</div>
                <div className="flex items-center bg-white border border-sencond">
                    <i className="text-slate-400"><HiOutlineMail /></i>
                    <input placeholder="Email" />
                </div>
            </form>
        </div>
     );
}

export default Login;