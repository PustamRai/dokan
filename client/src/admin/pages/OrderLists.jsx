import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { API } from "../../api/API";

function OrderLists() {
  const { token, toast } = useAuthContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/api/admin/list", {
        headers: { Authorization: token },
      });
      setOrders(response.data.data);
      console.log("order res: ", response);
      toast.success("admin order list");
    } catch (error) {
      console.log("error in fetching orders: ", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await API.post(
        `/api/admin/order/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: token },
        }
      );
      console.log("order status res: ", response);
      toast.success("Order status updated");
      fetchOrders(); // Refresh orders
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center py-10 text-gray-500 font-semibold text-lg">
          No orders found
        </p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>S.N.</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td>{order._id}</td>
                <td>{order.address.fullName || "N/A"}</td>
                <td>Rs. {order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderLists;
