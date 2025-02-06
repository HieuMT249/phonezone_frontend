import { Carousel } from 'primereact/carousel';
import { useEffect, useState } from 'react';
import axios from "axios";
import Card from '../Card';

function CarouselProduct() {
    const [productsShock, setProductsShock] = useState([]);
    const [productsDeal, setProductsDeal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const responseShock = await axios.get("https://localhost:7274/api/v1/Products/shock");
                const responseDeal = await axios.get("https://localhost:7274/api/v1/Products/deal");
                setProductsShock(responseShock.data);
                setProductsDeal(responseDeal.data);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu");
                setLoading(false);
            }
          };
      
          fetchRandomProducts();
    }, [])

    const productTemplate = (product) => {
        return (
            <Card image={product.image} productName={product.productName} name={product.id} newPrice={product.newPrice} oldPrice={product.oldPrice} />
        );
    };

    return ( 
        <div className="min-h-screen p-10">
            <div className="border border-second h-[36rem] rounded-3xl bg-gradient-15 p-10">
                <div className='flex pl-12'>
                    <div
                        className={`text-center w-32 cursor-pointer ${activeTab === 0 ? 'text-primary border-b-2 border-primary text-2xl font-bold' : 'text-lg'}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Giá sốc!
                    </div>
                    <div
                        className={`text-center w-32 cursor-pointer ${activeTab === 1 ? 'text-primary border-b-2 border-primary text-2xl font-bold' : 'text-lg'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Hot Deal
                    </div>
                </div>
                <Carousel value={activeTab === 0 ? productsShock : productsDeal} numVisible={4} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={3000} itemTemplate={productTemplate} />
            </div>
        </div>  
     );
}

export default CarouselProduct;