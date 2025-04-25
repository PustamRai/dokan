import React, { useEffect, useState } from "react";
import { useProductContext } from "../../context/productContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";

function ProductList() {
  const { API, toast, loading } = useProductContext();
  const { token } = useAuthContext();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/product/list");

        setProductList(response.data.data);
      } catch (err) {
        console.log("Product fetch error: ", err);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // remove admin product list
  const removeProductItem = async (productId) => {
    try {
      const response = await API.post(`/api/admin/removeProductItem/${productId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProductList((prevProduct) =>
        prevProduct.filter((item) => item._id !== productId)
      );
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error removing product items: ", error);
      toast.error(
        error.response?.data?.message || "failed to remove product items"
      );
    }
  };

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
                <th className="p-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-all duration-150 ease-in-out"
                >
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
                  <td 
                  className="p-2 border bg-red-200  hover:bg-red-300 cursor-pointer"
                  onClick={() => removeProductItem(product._id)}
                  >
                    <div
                      className="flex items-center justify-center"
                    >
                      <FaRegTrashAlt />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
