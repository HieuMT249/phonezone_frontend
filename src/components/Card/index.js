import { useNavigate } from "react-router-dom";

function Card({image, productName, name, newPrice, oldPrice}) {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem("name", name);
        navigate(`/dienthoai/details/${productName}`);
    }
    
    return ( 
        <div onClick={handleClick} className="border border-second w-xl mt-8 min-h-96 bg-white rounded-2xl p-6 ml-8 hover:cursor-pointer">
            <div className="">
                <img src={image} alt={productName} className="w-40 shadow-2 ml-6" />
            </div>
            <div className='flex flex-col'>
                <h4 className="my-5 text-center font-bold min-h-12">{productName}</h4>
                <div className='flex justify-between items-center'>
                    <span className="mt-0 mb-3 text-primary font-semibold">{newPrice}</span>
                    {
                        (oldPrice === "Không rõ giá") ? "" 
                        : <span className="mt-0 mb-3 text-gray-300 text-sm line-through">{oldPrice}</span>
                    }
                </div>
                <div className='flex justify-between items-center text-xs'>
                    <button className='bg-second hover:bg-primary mt-4 px-3 py-4 rounded-full'>Thêm giỏ hàng</button>
                    <button className='bg-primary hover:bg-second hover:opacity-90 mt-4 px-3 py-4 rounded-full'>Mua ngay</button>
                </div>
            </div>
        </div>
     );
}

export default Card;