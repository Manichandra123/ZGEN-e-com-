import { Button } from "../ui/components/Button";
import { Navbar } from "../ui/components/navbar";

export default function Product() {
  const images = [
    "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D", // Main front
    "https://images.unsplash.com/photo-1714070700737-24acfe6b957c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D", // Side view
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHNoaXJ0fGVufDB8fDB8fHww", // Back view
    "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D", // Close-up
  ];

  return (
    <>
    <div> 
      <Navbar />
      </div>

      <div className="flex flex-col md:flex-row min-h-screen p-6 bg-gray-50">
        {/* LEFT: Product Image Gallery */}
        <div className="flex-1 grid grid-cols-2 gap-4 max-w-[800px]">
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-xl transition-all h-64 flex items-center justify-center"
            >
              <img
                src={`${src}?auto=format&fit=crop&w=400&q=80`}
                alt={`product-image-${index + 1}`}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Crew Neck Men's Regular T-Shirt
            </h2>

            <p className="text-gray-600 mb-4">
              A high-quality cotton t-shirt with a regular fit and breathable fabric. Perfect for everyday use and comes in multiple colors and sizes.
            </p>

            <div className="mb-4">
              <span className="text-xl font-bold text-green-700">₹799</span>
              <span className="text-sm text-gray-500 ml-2 line-through">₹999</span>
              <span className="ml-2 text-sm text-red-500">20% OFF</span>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Select Size</label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="border px-3 py-1 rounded hover:bg-gray-100 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="w-20 border px-2 py-1 rounded"
              />
            </div>

            {/* Pincode Checker */}
            <div className="flex mb-4 gap-2">
              <input
                type="text"
                placeholder="Enter PinCode"
                className="flex-1 border rounded px-3 py-2"
              />
              <Button variant="primary" size="md" label="Check" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <Button variant="primary" size="lg" label="Add to Cart" />
              <Button variant="secondary" size="lg" label="Buy Now" />
            </div>

            {/* Size Chart */}
            <div className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer">
              View Size Chart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
