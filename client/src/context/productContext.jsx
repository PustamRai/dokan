import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

// create provider
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([])

    return (
        <ProductContext.Provider value={product}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext)