import images from "../../assets/images";

//prime-react
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Menu } from 'primereact/menu';
import { useEffect, useRef, useState } from "react";

//react-icon
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Header() {
    const menuRight = useRef(null);
    const navigate = useNavigate();

    const items = [
        {
        label: "Profile",
        icon: "pi pi-user",
        items: [
            {
            label: "Settings",
            icon: "pi pi-cog",
            },
            {
            label: "Privacy",
            icon: "pi pi-shield",
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                localStorage.removeItem("token");
                window.location.reload();
              }
          }
        ],
        },
    ];

    

    const parseJwt = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = atob(base64);

        return JSON.parse(decodedPayload);
      } catch (e) {
        return null;
      }
    };

    const [user, setUser] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();

          if (expirationTime > currentTime) {
            setUser(decodedToken);
          } else {
            localStorage.removeItem("token");
            navigate("/");
          }
        }
      }
    }, []); 

    return (
      <div className="flex items-center justify-between h-20 mb-10 shadow-xl">
        <img className="w-1/6 ml-10 cursor-pointer" onClick={() => {navigate("/")}} src={images.logo} alt="PZ-logo" />
        <div className="flex font-semibold">
          <div className="mr-8 hover:text-primary text-primary">Home</div>
          <a href="#categories" className="mr-8 hover:text-primary">Categories</a>
          <a href="#aboutus" className="mr-8 hover:text-primary">About Us</a>
        </div>
        <div className="flex items-center mr-10">
            <Avatar className="mr-6 p-overlay-badge bg-transparent">
              <GiShoppingCart size={"60px"} />
              {/* <Badge value="2"></Badge> */}
            </Avatar>
            {
              user 
              ?
              <div className="flex">
                <Avatar className="bg-second" icon="pi pi-user" shape="circle" />
                <Menu className="mt-4" model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                <span className="flex items-center cursor-pointer font-semibold ml-2 hover:text-primary" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup>{user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}</span>
              </div>
              :
              <div className="flex items-center text-sm italic">
                <a className="hover:text-primary ml-2" href="/login">Đăng nhập</a>
              </div>
          }
          </div>
      </div>
    );
}

export default Header;
