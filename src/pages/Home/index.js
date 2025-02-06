import images from "../../assets/images";
import Branch from "../../components/Branch";
import CarouselProduct from "../../components/Carousel";
import Search from "../../components/Search";

function Home() {

    const branchs = [
        {
            image: images.apple,
            alt: "apple",
            uri: "/dienthoai/iphone"
        },
        {
            image: images.asus,
            alt: "asus",
            uri: "/dienthoai/asus"
        },
        {
            image: images.honor,
            alt: "honor",
            uri: "/dienthoai/honor"
        },
        {
            image: images.huawei,
            alt: "huawei",
            uri: "/dienthoai/huawei"
        },
        {
            image: images.nokia,
            alt: "nokia",
            uri: "/dienthoai/nokia"
        },
        {
            image: images.oppo,
            alt: "oppo",
            uri: "/dienthoai/oppo"
        },
        {
            image: images.realme,
            alt: "realme",
            uri: "/dienthoai/realme"
        },
        {
            image: images.samsung,
            alt: "samsung",
            uri: "/dienthoai/samsung"
        },
        {
            image: images.vivo,
            alt: "vivo",
            uri: "/dienthoai/vivo"
        },
        {
            image: images.xiaomi,
            alt: "xiaomi",
            uri: "/dienthoai/xiaomi"
        },
    ]

    return ( 
        <div className="min-h-screen">
            <div className="relative flex justify-between h-[36rem] bg-gradient-15">
                <Search/>
                <div className="pt-24 pl-24 mt-20">
                    <h1 className="font-bold">Enhance Your Lifestyle With 500+ Powerful Smart Devices</h1>
                    <span className="ml-10">Don't miss out on incredible savings</span>
                    <p>and the chance to embrace the latest in technology</p>
                </div>
                <img className="mr-20 mt-20" src={images.background} alt="background-phonezone"/>
            </div>
            <h1 className="flex justify-center w-full font-bold mt-6 text-2xl">
                <span>Categories</span>
            </h1>
            <div>
            <div className="grid grid-cols-5 gap-6 justify-items-center mb-10">
                {
                    branchs.map((branch, index) => (
                        <Branch key={index} image={branch.image} alt={branch.alt} uri={branch.uri}/>
                    ))
                }
                
            </div>
            <div>
                <CarouselProduct/>  
            </div>
            </div>
        </div>
     );
}

export default Home;