import { useEffect, useState } from "react";
import axios from "axios";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/products")
      .then(res => {
        // If backend returns { products: [...] }
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else if (Array.isArray(res.data)) {
          // If backend returns [...] directly
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}