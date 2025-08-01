import { Button } from "./Button"

interface CardProps {
    title: string,
    description: string,
    image?: string,
    price: number,
    onClick: () => void
}

export const Card = ({ title, description, image, price, onClick }: CardProps) => {
    return (
        <div className="flex flex-col rounded-md shadow-md p-4 w-[300px] h-[400px] cursor-pointer hover:scale-105 transition-all">
<div className="h-[60%] w-full relative group overflow-hidden">
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover rounded-t-md transition-transform duration-300 group-hover:scale-110 z-10"
  />
</div>

            <div className="flex flex-col gap-2 flex-1 p-2 justify-center">
                <div className="flex flex-col gap-1 flex-1">
                    <h1 className="font-semibold text-lg">{title}</h1>
                    <p className="text-gray-600 line-clamp-2">{description}</p>
                    <p className="font-semibold">₹{price}</p>
                </div>
                <div className="mt-auto">
                    <Button label="Add to Cart" onClick={onClick} size="md" variant="secondary"/>
                </div>
            </div>
        </div>
    )
}
