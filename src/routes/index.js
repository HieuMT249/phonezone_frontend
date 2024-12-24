//Pages
import Login from "../pages/Login";
import Home from "../pages/Home"
import Register from "../pages/Register";


//dùng cho các trang không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: 'login' },
    { path: '/register', component: Register, layout: 'register' },
];

//dùng cho các trang cần đăng nhập mới sử dụng được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
