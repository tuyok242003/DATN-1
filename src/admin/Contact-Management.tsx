import { useGetContactsQuery, useRemoveContactMutation } from "../api/contact";
import { Button, Table, Popconfirm } from "antd";
import { IContact } from "../interfaces/contact";

const ContactManagement = () => {
  const { data, error } = useGetContactsQuery();
  const [removeContact] = useRemoveContactMutation();

  if (error) return <div>Error</div>;
  const dataSource = data?.map(
    ({ id, name, phone, email, content }: IContact) => {
      return {
        key: id,
        name,
        phone,
        email,
        content,
      };
    }
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
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
          </>
        );
      },
    },
  ];
  const xoa = (id: any) => {
    removeContact(id);
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

export default ContactManagement;
