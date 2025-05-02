import React, { useState } from "react";
import { API } from "../../api/API";
import { useAuthContext } from "../../context/authContext";
import { useProductContext } from "../../context/productContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { token } = useAuthContext();
  const { setLoading, loading } = useProductContext()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sizes: [],
    bestseller: false,
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const categoryOptions = ["Men", "Women", "Laptops"];

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      if (prev.sizes.includes(size)) {
        return {
          ...prev,
          sizes: prev.sizes.filter((s) => s !== size),
        };
      } else {
        return {
          ...prev,
          sizes: [...prev.sizes, size],
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      // Validate inputs
      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.category ||
        formData.sizes.length === 0 ||
        !formData.image
      ) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("sizes", JSON.stringify(formData.sizes));
      data.append("bestseller", formData.bestseller);
      data.append("image", formData.image);

      const response = await API.post("/api/product/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Product added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          sizes: [],
          bestseller: false,
          image: null,
        });
        setPreviewImage("");
      } 
      else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log("error in adding products: ", error)
      toast.error(error.response?.data?.message || "An error occurred while adding the product")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (NRs)*
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Bestseller toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="bestseller"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="bestseller"
              className="ml-2 block text-sm text-gray-700"
            >
              Mark as Bestseller
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes*
          </label>
          <div className="flex flex-wrap gap-3">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  formData.sizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image*
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="product-image"
            />
            <label
              htmlFor="product-image"
              className="cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Choose file
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {formData.image ? formData.image.name : "No file selected"}
            </span>
          </div>

          {previewImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
