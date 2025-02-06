import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";

function DefaultLayout({children}) {
    return ( 
        <div>
            <Header/>
            <div id="categories">{children}</div>
            <div id="aboutus"><Footer/></div>
        </div>
        
     );
}

export default DefaultLayout;