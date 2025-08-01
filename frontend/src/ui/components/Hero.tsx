import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

interface Slide {
    id: number;
    image: string;
    title: string;
    description: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: 'https://plus.unsplash.com/premium_photo-1749747566115-ad1db55754ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwyfHx8MA%3D%3D',
        title: 'Summer Collection',
        description: 'Discover our latest summer collection with exclusive deals'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1749810364373-5e2f18bb842a?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
        title: 'New Arrivals',
        description: 'Fresh arrivals with amazing discounts'
    },
    {
        id: 3,
        image: 'https://plus.unsplash.com/premium_photo-1695575593603-1f42ca27bb6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbnxlbnwwfDB8MHx8fDA%3D',
        title: 'Limited Time Offer',
        description: 'Don\'t miss our special limited time offers'
    }
]

export const Hero = () => {
    const navigate = useNavigate()
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <div className="relative h-[700px] w-full overflow-hidden">
            {/* Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="relative h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"> 
                                   <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
                                     <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to ZGen</h1>
                                     <p className="text-xl md:text-2xl mb-8">Discover Premium Fashion Accessories</p>
                                     <Button 
                                       label="Shop Now" 
                                       onClick={() => navigate('/products')}
                                       variant="primary"
                                       size="lg"
                                     />
                                   </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Previous/Next buttons */}
            
        </div>
    )
}