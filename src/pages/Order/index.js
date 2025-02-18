import { useState } from 'react';
import { Tag } from 'primereact/tag';
import { DataScroller } from 'primereact/datascroller';
        

function Order() {
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [showPopUp, setShowPopUp] = useState(false);
    const [cancelReason, setCancelReason] = useState('');


    const orders = [
        {
            id: "#19428392121HADHW",
            status: "success",
            image: "https://cdn2.cellphones.com.vn/insecure/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone11-green-select-2019_2_1_2_2_3.png",
            productName: "Iphone 11 256GB",
            price: "6.990.000đ"
        },
        {
            id: "#Khdh983094JFJE",
            status: "danger",
            image: "https://cdn2.cellphones.com.vn/insecure/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-13-pro-thumb-xanh-la9.jpg",
            productName: "Xiaomi 13T Pro 5G 12GB 512GB",
            price: "10.990.000đ"
        },
        {
            id: "#GJDWJO129984",
            status: "secondary",
            image: "https://cdn2.cellphones.com.vn/insecure/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-itel-9310-4g_1_.png",
            productName: "Itel 9310 4G",
            price: "650.000đ"
        }
    ]

    const tags = {
        success : "Giao hàng thành công",
        secondary : "Đã xác nhận",
        info: "Đang giao hàng",
        danger: "Đã Hủy",
        warning: "Chờ xác nhận"
    }
    const handleButtonClick = (status) => {
        setSelectedStatus(status);
    };

    const getButtonClass = (status) => {
        return selectedStatus === status
            ? "border-primary  bg-gradient-15"
            : "hover:bg-second border-second";
    };

    const itemTemplate = (order) => {
        return (
            <div className='rounded-xl bg-white drop-shadow-xl p-6 mt-6'>
                <div className='w-full flex justify-between border-2 border-transparent border-b-gray-300 h-12'>
                    <span className='text-xl font-bold mr-6'>Đơn hàng: <span className='text-lg font-normal'>{order.id}</span></span>
                    <Tag className='mb-2' severity={order.status}>{tags[order.status]}</Tag>
                </div>
                <div className="flex mt-8 px-10 p-6">
                    <img src={order.image} alt={order.productName} className="w-20 h-20 object-cover mr-4" />
                    <div className='flex justify-between w-full'>
                        <p className="text-xl ml-10 font-bold">{order.productName}</p>
                        <p className="font-bold">Tổng tiền: <span className='font-normal'>{order.price}</span></p>
                    </div>
                </div>
                {
                    order.status === "secondary" &&
                        <div className='text-end'>
                            <button onClick={handleCancelOrder} className='border py-4 px-6 rounded-xl border-red-600 text-red-600 hover:bg-red-600 hover:text-white'> Hủy đơn </button>
                        </div>
                }
            </div>
        )
    }

    const handleCancelOrder = () => {
        setShowPopUp(true);
    };
    
    const handleCancelSubmit = () => {
        setShowPopUp(false);
        setCancelReason('');
    };
    
    const handleCancelChange = (e) => {
        setCancelReason(e.target.value);
    };
    
    const handleClosePopUp = () => {
        setShowPopUp(false);
    };
    

    const popUp = () => {
        return (
            <div className="fixed top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-50 px-64 drop-shadow-xl">
                <div className="relative top-28 left-64 bg-white opacity-100 h-80 rounded-xl p-4 w-96">
                    <button className="absolute right-6 top-4" onClick={handleClosePopUp}>X</button>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold">Lý do hủy đơn</h2>
                        <textarea
                            value={cancelReason}
                            onChange={handleCancelChange}
                            className="border p-4 mt-4 w-full h-32 rounded-md"
                            placeholder="Nhập lý do hủy đơn"
                        />
                        <button
                            onClick={handleCancelSubmit}
                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md"
                        >
                            Gửi lý do hủy
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    

    const renderContent = () => {
        switch (selectedStatus) {
            case "Tất cả":
                return (
                    <DataScroller value={orders} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px"/>
                );
            case "Đã xác nhận":
                return <div><h3 className="text-lg font-semibold">Đơn hàng đã xác nhận</h3></div>;
            case "Đang chuyển hàng":
                return <div><h3 className="text-lg font-semibold">Đơn hàng đang chuyển hàng</h3></div>;
            case "Đã hủy":
                return <div><h3 className="text-lg font-semibold">Đơn hàng đã hủy</h3></div>;
            case "Thành công":
                return <div><h3 className="text-lg font-semibold">Đơn hàng thành công</h3></div>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg px-6 m-4 min-h-screen">
            <div className="my-8 flex justify-around">
                <button onClick={() => handleButtonClick("Tất cả")} className={`border ${getButtonClass("Tất cả")} px-6 py-4 rounded-md text-sm`}>
                    Tất cả
                </button>
                <button onClick={() => handleButtonClick("Đã xác nhận")} className={`border ${getButtonClass("Đã xác nhận")} px-6 py-4 rounded-md text-sm`}>
                    Đã xác nhận
                </button>
                <button onClick={() => handleButtonClick("Đang chuyển hàng")} className={`border ${getButtonClass("Đang chuyển hàng")} px-6 py-4 rounded-md text-sm`}>
                    Đang chuyển hàng
                </button>
                <button onClick={() => handleButtonClick("Đã hủy")} className={`border ${getButtonClass("Đã hủy")} px-6 py-4 rounded-md text-sm`}>
                    Đã hủy
                </button>
                <button onClick={() => handleButtonClick("Thành công")} className={`border ${getButtonClass("Thành công")} px-6 py-4 rounded-md text-sm`}>
                    Thành công
                </button>
            </div>

            <div className="mt-6 min-h-96 border border-second rounded-xl p-10">
                {renderContent()}
            </div>
                {showPopUp && popUp()}
        </div>
    );
}

export default Order;