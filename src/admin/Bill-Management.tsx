import { useGetBillsQuery, useRemoveBillMutation } from "../api/bill";
import { Button, Table, Popconfirm } from "antd";
import { IBill } from "../interfaces/bill";
import { Link } from "react-router-dom";
import { ProductItem } from "@/interfaces/product";
import { notification } from "antd";

interface ApiResponse {
  data: IBill[]; // Adjust this based on the actual structure of your API response
  // Add other properties if necessary, e.g., meta, status, etc.
}
const BillManagement = () => {
  const { data, error } = useGetBillsQuery();
  const [removeBill] = useRemoveBillMutation();
  if (!data && !error) {
    return <div>Loading...</div>;
  }

  // Check for errors
  if (error) {
    const errorMessage =
      "message" in error ? error.message : "An error occurred";

    return <div>Error: {errorMessage}</div>;
  }

  if (error) return <div>Error</div>;
  const dataSource =
    data?.map(
      ({
        id,
        user_id,
        status,
        address,
        date,
        total,
        phone,
        payment_method,
        notes,
      }: IBill) => {
        return {
          key: id,
          user_id,
          status,
          date,
          address,
          total,
          phone,
          payment_method,
          notes,
        };
      }
    ) || [];
  const columns = [
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "payment_method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: ({ key: id }: any) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={"Bạn có muốn xóa không?"}
              onConfirm={() => xoa(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
            <Button type="primary" danger className="ml-2">
              <Link to={`/admin/bill/${id}/edit`}>Edit</Link>
            </Button>
          </>
        );
      },
    },
  ];

  const xoa = async (id: any) => {
    try {
      await removeBill(id);
      // If the mutation is successful, show a success notification
      notification.success({
        message: "Đã xoá đơn hàng thành công",
        description: `Đơn hàng số ${id} đã được xoá thành công.`,
      });
    } catch (error) {
      // If there is an error, show an error notification
      notification.error({
        message: "Xoá đơn hàng thất bại",
        description: `Đã xảy ra lỗi khi xoá đơn hàng số ${id}.`,
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">Quản lý liên hệ</h2>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 3 }}
      />
    </div>
  );
};

export default BillManagement;
