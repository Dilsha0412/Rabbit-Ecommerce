import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts =[
  {
  _id:1,
  name:"Product 1",
  price :100,
  images:[{url:"https://picsum.photos/500/500?random=3"}]
},
  {
  _id:2,
  name:"Product 2",
  price :100,
  images:[{url:"https://picsum.photos/500/500?random=4"}]
},
  {
  _id:3,
  name:"Product 3",
  price :100,
  images:[{url:"https://picsum.photos/500/500?random=5"}]
},
  {
  _id:4,
  name:"Product 4",
  price :100,
  images:[{url:"https://picsum.photos/500/500?random=6"}]
}
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () =>{
    if(!selectedSize || !selectedColor){
        toast.error("Please select a size and color before adding to Cart.",{
            duration:1000,
        });
        return;
    }
    setIsButtonDisabled(true);

    setTimeout(() => {
        toast.success("product add to cart!",{
            duration:1000,
        });
        setIsButtonDisabled(false);
    },500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          
          {/* Left */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === image.url ? "border-black" : "border-gray-200"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/*  Middle*/}
          <div className="md:w-1/2">
            <div className="mb-4">
              {mainImage && (
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg shadow-sm"
              />
              )}

            </div>
            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg border-2 ${
                    mainImage === image.url ? "border-black" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Right*/}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            <div className="mb-4">
              <p className="text-lg text-gray-400 line-through">
                ${selectedProduct.originalPrice}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${selectedProduct.price}
              </p>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-3 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-gray-100 rounded-md text-xl hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="text-lg font-medium w-4 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-gray-100 rounded-md text-xl hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
          
   <button 
     onClick={handleAddToCart} 
     disabled={isButtonDisabled} 
     className={`bg-black text-white py-2 px-6 rounded-lg w-full mb-8 font-semibold transition shadow-md ${
     isButtonDisabled 
      ? "cursor-not-allowed opacity-50" 
      : "hover:bg-gray-800"
    }`}
   >
  
      {isButtonDisabled ? "Adding..." : "ADD TO CART"}
   </button>

            {/* Characteristics Table */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Characteristics
              </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-semibold text-gray-800">Brand</td>
                    <td className="py-2 text-gray-600">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-800">Material</td>
                    <td className="py-2 text-gray-600">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>            
          </div>       
        </div>
        <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid products = {similarProducts}/>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;