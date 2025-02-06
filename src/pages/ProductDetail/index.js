import axios from 'axios';
import { Galleria } from 'primereact/galleria';
import { useEffect, useState } from 'react';

function ProductDetail() {
    const [product, setProduct] = useState(null);


    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const id = localStorage.getItem("name");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response= await axios.get(`https://localhost:7274/api/v1/Products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.log("Không thể tải dữ liệu");
            }
          };
      
          fetchProduct();
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />
    }

    console.log(product);

    return ( 
        <div className="min-h-screen">
            <Galleria value={""} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
     );
}

export default ProductDetail;