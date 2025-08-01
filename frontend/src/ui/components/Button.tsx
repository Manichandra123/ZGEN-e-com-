interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

const variantStyles = {
    primary: "text-white bg-blue-600",
    secondary: "bg-blue-200 text-black",
};
const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export const Button =({label, onClick, disabled, variant, startIcon, endIcon, size}: ButtonProps)=>{
    return <div >
    <button onClick={()=>{onClick?.()}} disabled={disabled} className={`${variantStyles[variant || "primary"]} ${sizeStyles[size || "md"]} cursor-pointer flex items-center justify-center gap-2 rounded-md hover:opacity-80 transition-all`}>
        {startIcon}
        {label}
        {endIcon}
    </button>
    </div>
}