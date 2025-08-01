
import { useNavigate } from "react-router-dom"

export const Admin =()=>{
    const navigate = useNavigate()
    return (
        <>
         <div className="h-16 flex items-center justify-between shadow-sm rounded-lg p-2">
                       <div className="flex items-center gap-2 cursor-pointer ml-8">
                           <h1 className="font-bold text-2xl text-gray-800 hover:text-gray-600 transition-all">KAZEE</h1>
                       </div>
       
                       
        
                   </div>
    <div className="flex h-screen w-screen ">
     
        <div className="flex flex-col gap-2 w-[400px] h-screen bg-gray-100 p-4  mx-auto">
            <div className="flex flex-col gap-2 cursor-pointer hover:bg-gray-200 transition-all p-2 rounded-md  border border-gray-200 " onClick={()=>{navigate('/admin/products')}}> 
             <h2 className="text-lg font-semibold">Products</h2>
            </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-screen mx-auto">

        </div>
    </div>
    </>
    )
}