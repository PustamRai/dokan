import React, { useEffect } from "react";
import { useProductContext } from "../../context/productContext";


function AdminProductList() {
  const { API, toast, products, loading  } = useProductContext()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await API.get("/api/product/list");
        toast.success('admin product list')
      } catch (err) {
        console.log("Product fetch error: ", err);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin - Product List</h2>
      {loading ? (
        <p className="text-center py-10 text-gray-500 font-semibold text-lg">
        Loading products...
      </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">S.N</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Size</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">Rs. {product.price}</td>
                  <td className="p-2 border">{product.sizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProductList;
