import React, { useState } from "react";
import "../css/tabStyles.css";
import { IBill } from "../interfaces/bill";
import { useRemoveBillMutation } from "../api/bill";

import { useGetBillsQuery } from "../api/bill";
import { ProductItem } from "@/interfaces/product";
const TabBar = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data, error, refetch } = useGetBillsQuery();
  const [removeBill] = useRemoveBillMutation();

  const handleCancelOrder = async (orderId: number, status: string) => {
    try {
      if (
        status === "shipping" ||
        status === "completed" ||
        status === "refunded"
      ) {
        // Perform cancellation logic for specific statuses
        // For example, you might want to show a confirmation modal for certain statuses
        // or handle additional steps
        console.log(`Canceling order with status: ${status}`);
        return;
      }

      // Common cancellation logic
      await removeBill(orderId);

      // Refetch the data after canceling to update the list
      refetch();
    } catch (error) {
      console.error("Error canceling order:", error);
      // Handle error if needed
    }
  };

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      "message" in error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  const tabs = [
    { name: "Tất cả", id: "all" },
    { name: "Chờ thanh toán", id: "waiting_payment" },
    { name: "Chờ giao hàng", id: "waiting_delivery" },
    { name: "Vận chuyển", id: "shipping" },
    { name: "Hoàn thành", id: "completed" },
    { name: "Đã hủy", id: "cancelled" },
    { name: "Trả hàng / Hoàn tiền", id: "refunded" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const filteredBills = data?.filter((item: IBill) =>
    activeTab === "all" ? true : item.status === activeTab
  );

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.id === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div>
        {filteredBills.map((item: IBill) => (
          <div key={item.id}>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="flex items-center justify-between px-4 py-6">
                  <div>
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      {item.address}
                    </dt>
                    <dd
                      style={{ textAlign: "right" }}
                      className="mt-1 text-sm leading-6 text-gray-700"
                    >
                      Thành tiền: {item.total}
                    </dd>
                  </div>
                  {item.status === "shipping" ||
                  item.status === "completed" ||
                  item.status === "cancelled" ||
                  item.status === "refunded" ? (
                    <div>
                      <p className="text-red-600"></p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCancelOrder(item.id, item.status)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Huỷ đơn hàng
                    </button>
                  )}
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
