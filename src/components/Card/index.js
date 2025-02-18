import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart  } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Tag } from 'primereact/tag';

function Card({image, productName, name, newPrice, oldPrice, user, toggleCartPopup, discount}) {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    

    const handleClick = () => {
        localStorage.setItem("name", name);
        navigate(`/dienthoai/details/${productName}`);
    }

    const handleWishlist = () => {
        if (!user) {
            toggleCartPopup();
        } else {
            setWishlist(!wishlist);
        }
    }   
    
    return ( 
        <div className="border border-second min-h-96 bg-white rounded-2xl p-6 ml-6 hover:cursor-pointer drop-shadow-xl">
            <div onClick={handleClick} className="">
                <img src={image} alt={productName} className="w-40 shadow-2 mx-auto" />
            </div>
            <div className='flex flex-col'>
                <h4 onClick={handleClick} className="my-5 text-center font-bold min-h-16">{productName}</h4>
                <div onClick={handleClick} className='flex justify-between items-center px-6'>
                    <span className="mt-0 mb-3 text-primary font-semibold">{newPrice}</span>
                    {
                        (oldPrice === "Không rõ giá") ? "" 
                        : <span className="mt-0 mb-3 text-gray-300 text-sm line-through">{oldPrice}</span>
                    }
                </div>
                <div className='flex justify-end items-center text-xl mt-4'>
                    {
                        discount &&
                            <div className="text-lg flex-1 pl-6">
                                <Tag severity="danger" className="p-2" value={`Giảm ${discount}%`}></Tag>
                            </div>
                    }
                    <div className="flex items-center">
                        <span className="text-xs mr-2 text-gray-400">Yêu thích</span>
                        <button className="text-primary " onClick={handleWishlist} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
                            {
                                (isHover || wishlist) ? <FaHeart /> : <FaRegHeart/>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Card;