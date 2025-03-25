import React, { createContext, useContext, useState, useEffect } from 'react'
import { API } from '../api/API.js'
import { toast } from "react-hot-toast"


const ProductContext = createContext()

// create provider
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    const currency = "$"

    // fetch product
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/api/product/list')
                const allProducts = response?.data?.data || []

                setProducts(allProducts)
                toast.success(response?.data?.message)
            } catch (error) {
                console.log("error fetching products: ", error)
                toast.error(error.response?.data?.message || "Failed to fetch products");
            } finally {
                setLoading(false); 
            }
        }

        fetchProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ products, loading, currency }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext)