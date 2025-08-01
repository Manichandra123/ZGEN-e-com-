import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/productshook";
import { Card } from "../ui/components/card";
import { Navbar } from "../ui/components/navbar";

export function Products() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  return (
    <> 
    <Navbar/>
      <div className="flex w-full h-[300px] justify-center items-center bg-gray-100 mb-8">
        <img
          className="w-[500px] h-full object-cover rounded-lg shadow-md"
          src="https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8MHwwfHx8MA%3D%3D"
          alt="Banner"
        />
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Products</h2>
        {loading ? (
          <div className="text-center text-2xl py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center">
            {(Array.isArray(products) ? products : []).map((product, idx) => {
              const { name, description, price, images } = product as {
                name: string;
                description: string;
                price: number;
                images: { url: string }[];
              };
              const imageUrl =
                Array.isArray(images) && images.length > 0 && images[0]?.url
                  ? images[0].url
                  : "";
              return (
                <Card
                  key={idx}
                  title={name}
                  description={description}
                  image={imageUrl}
                  price={price}
                  onClick={() => {navigate("/product")}}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}