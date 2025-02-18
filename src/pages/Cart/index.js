import { useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUserEdit, FaRegUser, FaPhone } from "react-icons/fa";
import { FaMoneyBill1Wave, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import images from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';
import axios from 'axios';
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline, IoWalletOutline } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { RiBillLine, RiDiscountPercentLine  } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";

function Cart() {
    const [currentStep, setCurrentStep] = useState(0);
    const [cart, setCart] = useState(0);

    // state cho thông tin mua hàng
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [receiveAt, setReceiveAt] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [userData, setUserData] = useState('');
    const [coupon, setCoupon] = useState('');
    const [errors, setErrors] = useState({});
    const [totalAmount, setTotalAmount] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [timer, setTimer] = useState(5);

    const toast = useRef(null);

    const navigate = useNavigate();

    // **********************************************//
    // TẠM THỜI
    const coupons = [
        { code: 'DISCOUNT10', discount: 10 },
        { code: 'DISCOUNT20', discount: 20 },
        { code: 'DISCOUNT30', discount: 30 }
    ];

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const responses = await Promise.all(urls.map(url => axios.get(url)));
    
    //             const products = responses.map(res => res.data);

    //             const cartItems = products.map(product => ({
    //                 ...product,
    //             }));

    //             setCart(cartItems); 
    //         } catch (err) {
    //             console.log("Không thể tải dữ liệu");
    //         }
    //     };
    
    //     fetchProduct();
    // }, []);

    // **********************************************//

    const steps = [  
        "Kiểm tra giỏ hàng",
        "Thông tin mua hàng",
        "Hình thức thanh toán",
        "Đặt hàng thành công",
    ];

    const getIcon = (icon) => {
        switch (icon) {
            case "Kiểm tra giỏ hàng":
                return <div className='flex flex-col items-center w-16'><i className='text-3xl mb-2'><FiShoppingCart /></i><span className='text-xs'>Kiểm tra giỏ hàng</span></div>
            case "Thông tin mua hàng":
                return <div className='flex flex-col items-center w-16'><i className='text-3xl mb-2'><FaUserEdit /></i><span className='text-xs'>Thông tin mua hàng</span></div>
            case "Hình thức thanh toán":
                return <div className='flex flex-col items-center w-16'><i className='text-3xl mb-2'><FaMoneyCheckDollar /></i><span className='text-xs'>Hình thức thanh toán</span></div>
            case "Đặt hàng thành công":
                return <div className='flex flex-col items-center w-16'><i className='text-3xl mb-2'><IoMdCheckmarkCircleOutline /></i><span className='text-xs'>Kiểm tra giỏ hàng</span></div>
            default:
                return <div className='flex flex-col items-center w-16'><i className='text-3xl mb-2'><FiShoppingCart /></i><span className='text-xs'>Đặt hàng thành công</span></div>
        }
    }

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        }
    };

    const handleIncrease = (id) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };
    
    const handleDecrease = (id) => {
        setCart(cart.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleRemoveCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formErrors = {};
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!name) formErrors.name = true;
        if (!email) formErrors.email = true;
        if (!phone) formErrors.phone = true;
        if (!address && receiveAt === 'home') formErrors.address = true;
        if (!receiveAt) formErrors.receiveAt = true;
        if (email && !regex.test(email)) formErrors.emailFormat = true;
    
        if (Object.keys(formErrors).length > 0) {
            toast.current.show({
            severity: 'error',
            summary: 'Thông báo',
            detail: formErrors.emailFormat
                ? 'Địa chỉ email không hợp lệ!'
                : 'Vui lòng điền đầy đủ thông tin bắt buộc!',
            life: 3000,
            });
            setErrors(formErrors);
        } else {
            if(receiveAt === 'store'){
                const formData = { name, email, phone, receiveAt, address:"Cửa hàng 19D Nguyễn Hữu Thọ, Tân Hưng, Quận 7", note };
                setUserData(formData);
            }else{
                const formData = { name, email, phone, receiveAt, address, note };
                setUserData(formData);
            }
            nextStep();
        }
    };
    
    const itemTemplate = (data) => {
        return (
            <div className="flex items-center justify-start my-4 drop-shadow-xl bg-white border border-second rounded-xl py-4 mx-24">
                <div className="flex text-2xl text-black font-seminbold w-full">
                    <img className="w-32 mx-10 drop-shadow-xl rounded-xl" src={data.image} alt={data.productName} />
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col items-start">
                            <div className="">{data.productName}</div>
                            <div className="text-xl text-primary mt-6">{data.newPrice}</div>
                        </div>
                        <div className='flex flex-col items-end pt-2 pb-4 pr-6 text-lg font-normal'>
                            <button onClick={()=>handleRemoveCart(data.id)} className='hover:bg-red-500 hover:text-white border border-second drop-shadow-lg p-2 rounded-xl bg-white'><FaRegTrashAlt/></button>
                            <div className='flex bg-[#F5F5F5] p-2 rounded-full justify-around w-24 text-xs mt-12'>
                                <button onClick={()=>handleDecrease(data.id)}><FaMinus/></button>
                                <span className='text-lg'>{data.quantity}</span>
                                <button onClick={()=>handleIncrease(data.id)}><FaPlus/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const totalPrice = (products) => {
        return products.reduce((total, product) => {
            const price = product.newPrice.replace('đ', '').replace(/\./g, '');
            const priceNumber = parseFloat(price);

            return total + (priceNumber * product.quantity); 
        }, 0);
    }

    const finalPrice = (totalprice, coupon) => {
        if(coupon){
            const couponCode = coupons.find(c => c.code === coupon);
            if (couponCode) {
                return totalprice * (1 - couponCode.discount / 100);
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Thông báo',
                    detail: "Coupon không hợp lệ!",
                    life: 3000,
                    });
            }
        }
        
        return totalprice;
    }

    useEffect(() => {
        if (currentStep === 3 && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(countdown);
        }

        if (timer === 0) {
            navigate("/");
        }
    }, [currentStep, timer, navigate]);

    return (
        <>
            <Toast ref={toast} />
            {
            (!cart || cart.length === 0) ? 
                (
                    <div className='min-h-screen flex flex-col items-center font-semibold'>
                        <img className='w-96 mb-6' src={images.empty} alt="cart-empty"/>
                        <span>Giỏ hàng của bạn đang trống</span>
                        <span>Hãy chọn thêm sản phẩm để mua sắm nhé</span>
                        <button onClick={()=>navigate("/")} className='mt-10 font-normal border border-primary py-4 px-6 rounded-lg hover:bg-primary hover:text-white hover:scale-125 transition-transform duration-200 ease-in-out'>Quay lại trang chủ</button>
                    </div>
                )
                : 
                (
                    <div className="container mx-auto p-4 min-h-screen bg-white">
                        <div className="flex justify-between items-center mb-4">
                            {steps.map((step, index) => (
                            <div key={index} className="relative text-center">
                                <div className={`p-10 ${index === currentStep ? "text-primary" : "border-second text-second"}`}>
                                    {getIcon(step)}
                                </div>
                                {index < steps.length - 1 && 
                                (
                                    <div className={`absolute top-1/2 left-24 w-96 border-dashed border-t-2 ${index < currentStep ? "border-primary" : "border-second"}`}></div>
                                )}
                            </div>
                            ))}
                        </div>
            
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <div className="mb-6">
                                {/* Bước 1 - Kiểm tra giỏ hàng*/}
                                {currentStep === 0 && 
                                    <div className='text-center font-semibold text-xl'>
                                        <span>Đơn hàng của bạn</span>
                                        <DataScroller emptyMessage={"Không có mặt hàng khả dụng"} className='drop-shadow-xl' value={cart} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px"/>
                                    </div>
                                }
            
                                {/* Bước 2 - Điền thông tin thanh toán*/}
                                {currentStep === 1 && 
                                        <div>
                                            <form onSubmit={handleSubmit} className='border border-second text-center min-h-96 py-12 text-black px-60 drop-shadow-xl bg-white rounded-xl'>
                                                <span className='text-3xl font-semibold'>Thông tin nhận hàng</span>
                                                {/* Họ và tên */}
                                                <FloatLabel className='my-10'>
                                                    <InputText className='border border-second w-full p-2' id="username" value={name} onChange={(e) => setName(e.target.value)} />
                                                    <label htmlFor="username">Họ và tên</label>
                                                </FloatLabel>

                                                {/* Địa chỉ email */}
                                                <FloatLabel className='mb-10'>
                                                    <InputText className='border  border-second w-full p-2' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="email">Địa chỉ Email</label>
                                                </FloatLabel>

                                                {/* Số điện thoại */}
                                                <FloatLabel className='mb-10'>
                                                    <InputText keyfilter={"pnum"} className='border border-second w-full p-2' id="alphanum" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                    <label htmlFor="phone">Số điện thoại</label>
                                                </FloatLabel>

                                                {/* Địa chỉ + phương thức nhận */}
                                                <div className='flex items-center mb-10'>
                                                    <label className='flex items-center'>
                                                        <input type="radio" value="store" checked={receiveAt === 'store'} onChange={() => setReceiveAt('store')} className="text-primary"/>
                                                        <span className="ml-2">Nhận tại cửa hàng</span>
                                                    </label>
                                                    <label className='flex items-center mt-1 ml-20'>
                                                        <input type="radio" value="home" checked={receiveAt === 'home'}  onChange={() => setReceiveAt('home')} className="text-primary"/>
                                                        <span className="ml-2">Giao hàng tận nơi</span>
                                                    </label>
                                                </div>

                                                {receiveAt === 'store' ? 
                                                (
                                                    <FloatLabel className="relative mb-10">
                                                        <InputText
                                                            disabled 
                                                            id="address"
                                                            className="border border-second w-full py-2 px-3 rounded-md mt-2 placeholder:text-black"
                                                            placeholder="Cửa hàng 19D Nguyễn Hữu Thọ, Tân Hưng, Quận 7"
                                                            value={address}
                                                            onChange={(e) => setAddress("Cửa hàng 19D Nguyễn Hữu Thọ, Tân Hưng, Quận 7")}
                                                        />
                                                        <label htmlFor="address" className="absolute left-3 top-2 text-gray-500">Địa chỉ nhận hàng</label>
                                                    </FloatLabel>
                                                )
                                                : 
                                                (
                                                    <FloatLabel className="relative mb-10">
                                                        <InputText
                                                            type="text"
                                                            id="address"
                                                            className="border border-second w-full py-2 px-3 rounded-md mt-2"
                                                            placeholder="Vui lòng nhập địa chỉ giao hàng"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                        />
                                                        <label htmlFor="address" className="absolute left-3 top-2 text-gray-500"> Địa chỉ nhận hàng</label>
                                                    </FloatLabel>
                                                )}

                                                {/* Ghi chú */}
                                                <FloatLabel className='mb-10'>
                                                    <InputTextarea className='border border-second w-full p-2' id="description" value={note} onChange={(e) => setNote(e.target.value)} rows={5} cols={30} />
                                                    <label htmlFor="description">Ghi chú</label>
                                                </FloatLabel>
                                                {/* button */}
                                                <div className="flex justify-around text-center">
                                                    <button
                                                        onClick={prevStep}
                                                        className="bg-gray-300 text-gray-700 px-40 py-6 rounded-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                                                    >
                                                        Quay lại
                                                    </button>
                                                    <button
                                                        type='submit'
                                                        className="bg-primary text-white px-40 py-6 rounded-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                                                    >
                                                        Tiếp theo
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                }
            
                                {/* Bước 3 - Thanh toán*/}
                                {currentStep === 2 && userData && cart && 
                                        <div className='min-h-96 border border-second bg-white drop-shadow-xl rounded-xl py-12 text-black px-60 text-center'>
                                            <span className='text-3xl font-semibold'>Thông tin hóa đơn</span>
                                            <div className='text-xl mb-10 font-normal'>
                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><FaRegUser /></span>
                                                        <span>Họ và tên khách hàng: </span>
                                                    </div>
                                                    <i className='text-start'>{userData.name}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><HiOutlineMail /></span>
                                                        <span>Email: </span>
                                                    </div>
                                                    <i className='text-start'>{userData.email}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><IoLocationOutline /></span>
                                                        <span>Địa chỉ: </span>
                                                    </div>
                                                    <i className='text-start'>{userData.address}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><FaPhone /></span>
                                                        <span>Số điện thoại: </span>
                                                    </div>
                                                    <i className='text-start'>{userData.phone}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><MdOutlineEventNote /></span>
                                                        <span>Ghi chú: </span>
                                                    </div>
                                                    <i className='text-start max-h-20 text-ellipsis'>{userData.note}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><AiOutlineProduct /></span>
                                                        <span>Sản phẩm: </span>
                                                    </div>
                                                    <i className='text-start'>{
                                                        cart.map((item) => (
                                                            <ul>
                                                                <li className='my-2'><i className='font-semibold mr-6'>{item.productName}</i> x {item.quantity}</li>
                                                            </ul>

                                                        ))
                                                    }</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><RiBillLine /></span>
                                                        <span>Tạm tính: </span>
                                                    </div>
                                                    <i className='text-start'>{Intl.NumberFormat('vi-VN').format(totalPrice(cart)) + 'đ'}</i>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><RiDiscountPercentLine /></span>
                                                        <span>Giảm giá: </span>
                                                    </div>
                                                    <FloatLabel className='my-10'>
                                                        <InputText className='border border-second w-full p-2' id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                                        <label htmlFor="coupon">Nhập mã giảm giá</label>
                                                    </FloatLabel>
                                                </div>

                                                <div className='flex items-center grid grid-cols-2 gap-2'>
                                                    <div className='flex items-center my-2'>
                                                        <span className='mr-3'><FaMoneyBill1Wave /></span>
                                                        <span>Tổng tiền: </span>
                                                    </div>
                                                    <i className='text-start font-bold text-primary'>{Intl.NumberFormat('vi-VN').format(finalPrice(totalPrice(cart), coupon)) + 'đ'}</i>
                                                </div>
                                            </div>
                                            <span className='font-bold text-3xl mt-10'>Phương thức thanh toán</span>
                                            <div className='flex justify-around mt-10'>
                                                    <button className='flex items-center bg-gradient-15 border border-primary text-xl rounded-xl px-48 py-10 drop-shadow-xl'>
                                                        <i className='mr-2'><IoWalletOutline/></i>VNPay
                                                    </button>
                                                    <button disabled className='text-xl rounded-xl px-48 py-10 bg-gray-300'>Momo</button>
                                            </div>
                                        </div>
                                }
            
                                {/* Bước 4 - Trả kết quả*/}
                                {currentStep === 3 && 
                                        <div className='flex flex-col items-center justify-center w-full'>
                                            <img className='' src={images.payment_success} alt="success"/>
                                            <div className='font-bold text-5xl text-primary mb-4'>Thanh toán thành công</div>
                                            <div className='font-semibold italic '>Xin cảm ơn bạn đã tin tưởng lựa chọn PhoneZone để mua hàng</div>
                                            <div className='mt-4 text-xl'>Chuyển về trang chủ sau {timer} giây...</div>
                                        </div>
                                }
                            </div>
            
                            {/* các nút */}
                            <div className="flex justify-around text-center">
                                {currentStep > 0 && currentStep !== 1 && currentStep !== 3  && (
                                    <button
                                        onClick={prevStep}
                                        className="bg-gray-300 text-gray-700 px-60 py-6 rounded-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                                    >
                                        Quay lại
                                    </button>
                                )}
                                {currentStep === 0 ? (
                                    <button
                                        onClick={nextStep}
                                        className="bg-primary hover:scale-125 transition-transform duration-200 ease-in-out text-white text-xl px-60 py-6 rounded-xl mx-auto">
                                        Đặt hàng
                                    </button>
                                ) :  currentStep === 2 ? (
                                    <button
                                        onClick={nextStep}
                                        className="bg-primary hover:scale-125 transition-transform duration-200 ease-in-out text-white px-60 py-6 rounded-xl"
                                    >
                                        Thanh toán
                                    </button>
                                ) : (currentStep < steps.length - 1) && (currentStep !== 1) && (
                                    <button

                                        onClick={nextStep}
                                        className="bg-primary text-white px-60 py-6 rounded-xl hover:scale-125 transition-transform duration-200 ease-in-out"
                                    >
                                        Tiếp theo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Cart;