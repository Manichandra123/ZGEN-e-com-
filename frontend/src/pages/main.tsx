import { Button } from "../ui/components/Button"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../ui/components/navbar"
import { Hero } from "../ui/components/Hero"
import{ useProducts } from "../hooks/productshook"
import { Card } from "../ui/components/card"
 
 

export const Main = () => {
  const navigate = useNavigate()
  const {products} = useProducts();
 
  

  return (
    <>
 
     <Navbar />
      
    
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
     <Hero/>

    

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <Button 
            label="View All Products" 
            onClick={() => navigate('/products')}
            variant="secondary"
            size="md"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {(products ?? []).slice(0, 8).map((product, idx) => {
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
                onClick={() => {}}
              />
            );
          })}
        </div>
      </div>
 
       
    </div>
    </>
  )
}