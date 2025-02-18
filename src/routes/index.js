//Pages
import Login from "../pages/Login";
import Home from "../pages/Home"
import Register from "../pages/Register";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Order from "../pages/Order";


//dùng cho các trang không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: 'login' },
    { path: '/register', component: Register, layout: 'register' },
    { path: '/dienthoai', component: Product },
    { path: '/dienthoai/*', component: ProductList },
    { path: '/dienthoai/details/*', component: ProductDetail },
];

//dùng cho các trang cần đăng nhập mới sử dụng được
const privateRoutes = [
    { path: '/order', component:  Order},
    { path: '/cart', component:  Cart},
];

export { publicRoutes, privateRoutes };
