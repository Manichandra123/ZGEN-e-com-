import { Button } from "./Button";
import { CartIcon } from "../icons/Cart";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";

export const Navbar = () => {
    const navigate = useNavigate();
    
const { isLoggedIn, logout } = useAuth();
 

    return (
        <>
            <div className="h-16 flex items-center justify-between shadow-sm rounded-lg p-2">
                <div className="flex items-center gap-2 cursor-pointer ml-8">
                    <h1 className="font-bold text-2xl text-gray-800 hover:text-gray-600 transition-all" onClick={()=>navigate("/")}>ZGEN</h1>
                </div>

                <div>
                    <div className="flex items-center gap-8">
                        <div 
                            className="hover:text-blue-600 transition-all rounded-md cursor-pointer" 
                            onClick={() => navigate("/")}
                        >
                            Home
                        </div>
                        <div 
                            className="hover:text-blue-600 transition-all rounded-md cursor-pointer" 
                            onClick={() => navigate("/new-arrivals")}
                        >
                            New Arrivals
                        </div>
                        <div 
                            className="hover:text-blue-600 transition-all rounded-md cursor-pointer" 
                            onClick={() => navigate("/products")}
                        >
                            Products
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 flex-row items-center justify-center">
                    {isLoggedIn() ? (
                        <Button 
                            label="Logout" 
                            onClick={logout}
                            size="md" 
                            variant="primary"
                        />
                    ) : (
                        <Button 
                            label="Login" 
                            onClick={() => navigate("/signin")}
                            size="md" 
                            variant="primary"
                        />
                    )   }
                    
                    <Button 
                        label="Cart" 
                        onClick={() => navigate("/cart")}
                        size="md" 
                        variant="secondary" 
                        endIcon={<CartIcon/>}
                    />
                </div>
            </div>
        </>
    );
}