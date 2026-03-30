import React, { useRef, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                { _id: 1, name: "Product 1", price: 100, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
                { _id: 2, name: "Product 2", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
                { _id: 3, name: "Product 3", price: 150, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
                { _id: 4, name: "Product 4", price: 90, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
            ];
            setProducts(fetchedProducts);
        }, 1000);
    }, []);

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Mobile Filter Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center m-4"
            >
                <FaFilter className='mr-2' /> Filters
            </button>

            {/* Filters Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 lg:static lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <FilterSidebar />
            </div>

            {/* Product Display Area */}
            <div className="flex-grow p-4">
                <h2 className="text-2xl font-bold mb-6 uppercase">All Collection</h2>
               {/* Sort Options*/}
               <SortOptions />

               {/* Product Grid */}
               <ProductGrid products={products} />
              
            </div>
        </div>
    );
};

export default CollectionPage;