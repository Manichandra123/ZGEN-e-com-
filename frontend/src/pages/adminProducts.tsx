import { Button } from "../ui/components/Button"
 
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
interface Product {
  id: number
  name: string
  price: number
  description: string
  // Add other product fields as needed
}

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/products') // Adjust this URL based on your backend API
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else if (Array.isArray(res.data)) {
          // If backend returns [...] directly
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <div className="h-16 flex items-center justify-between shadow-sm rounded-lg p-2">
        <div className="flex items-center gap-2 cursor-pointer ml-8">
          <h1 className="font-bold text-2xl text-gray-800 hover:text-gray-600 transition-all">KAZEE</h1>
        </div>
      </div>

      <div className="flex flex-col h-screen w-screen">
        <div className="flex gap-2 w-full h-[200px] bg-gray-100 p-4 rounded-md justify-end items-center">
          <Button label="Add Product" onClick={() => {navigate('/admin/addproduct')}} variant="primary" size="lg" />
        </div>
        <div className="h-[calc(100vh-200px)] w-full bg-gray-200 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product , idx) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex flex-col gap-2 md:flex-row md:gap-4"> 
                        <Button 
                          label="Edit" 
                          onClick={() => {}} 
                          variant="secondary" 
                          size="sm"
                        />
                        <Button 
                          label="Delete" 
                          onClick={() => {}} 
                          variant="primary" 
                          size="sm"
                        />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}