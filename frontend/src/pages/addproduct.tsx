import {Button} from "../ui/components/Button"
import { useRef , useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export const AddProduct =()=>{
    
    const navigate = useNavigate()
    const productName = useRef<HTMLInputElement>(null)
    const productPrice = useRef<HTMLInputElement>(null)
    const productDescription = useRef<HTMLInputElement>(null)
    const productImage = useRef<HTMLInputElement>(null)
    const productCategory = useRef<HTMLInputElement>(null)
    const productStock = useRef<HTMLInputElement>(null)
    const [response, setResponse] = useState<string | null>(null)
    async function AddProduct(){
        const name = productName.current?.value
        const price = productPrice.current?.value
        const description = productDescription.current?.value
     
        const category = productCategory.current?.value
        const stock = productStock.current?.value
const images = [
      {
        url: productImage.current?.value || "",
        alt: name || "image"
      }
    ]
        const response = await axios.post('http://localhost:3000/api/v1/products',    {
            name,
            price,
            description,
            images,
            category,
            stock,
        } );
        setResponse(response.data)
        navigate('/admin/products')
    }
    
    
    return (
        <> 
        {response ? (
            <div>
                <p>Product added successfully</p>
            </div>
        ) : (
        <div className="flex h-screen w-screen mt-10">
             <div className="flex flex-col gap-2 p-4 w-[600px] h-[600px] bg-gray-100 rounded-md mx-auto">
        <div className="flex flex-col gap-2">
        <label htmlFor="">Product Name</label>
       <input type="text" ref={productName} placeholder="Product Name" className="border border-gray-300 rounded-md p-2" />
       </div>
           <div className="flex flex-col gap-2">
       <label htmlFor="">Product Price</label>
       <input type="text" ref={productPrice} placeholder="Product Price" className="border border-gray-300 rounded-md p-2" />
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="">Product Description</label>
       <input type="text" ref={productDescription} placeholder="Product Description" className="border border-gray-300 rounded-md p-2" />
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="">Product Image link</label>
       <input type="text" ref={productImage} placeholder="Product Image link" className="border border-gray-300 rounded-md p-2" />
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="">Product Category</label>
       <input type="text" ref={productCategory} placeholder="Product Category" className="border border-gray-300 rounded-md p-2" />
       </div >
       <div className="flex flex-col gap-2">
       <label htmlFor="">Product Stock</label>
       <input type="text" ref={productStock} placeholder="Product Stock" className="border border-gray-300 rounded-md p-2" />
       </div >
       <div className="flex justify-end mt-4">
       <Button label="Add Product" onClick={AddProduct} variant="primary" size="lg" />
       </div>
           
    </div>
        </div>
        )}
        </>
    )
}