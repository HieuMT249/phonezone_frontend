import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const brand = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const response= await axios.get(`https://localhost:7274/api/v1/Products/dienthoai/${brand}`);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu");
                setLoading(false);
            }
          };
      
        fetchRandomProducts();
    }, []);

    return ( 
        <div className="p-6 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {products.map((product, index) => (
                    <Card key={index} image={product.image} productName={product.productName} name={product.id} newPrice={product.newPrice} oldPrice={product.oldPrice} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;