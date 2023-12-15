import { useGetPostsQuery, useRemovePostMutation } from "../api/post";
import { Button, Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { IPost } from "../interfaces/post";

const PostManagement = () => {
  const { data, error } = useGetPostsQuery();
  const [removePost] = useRemovePostMutation();

  if (error) return <div>Error</div>;
  const dataSource = data?.map(({ id, content, img }: IPost) => {
    return {
      key: id,
      content,
      img,
    };
  });
  const columns = [
    {
      title: "content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img src={img} alt="Product Image" style={{ maxWidth: "100px" }} />
      ),
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
              <Link to={`/admin/post/${id}/edit`}>Edit</Link>
            </Button>
          </>
        );
      },
    },
  ];
  const xoa = (id: any) => {
    removePost(id);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">Quản lý bài viết</h2>
        <Button type="primary" danger>
          <Link to="/postAdd">Thêm Bài Viết</Link>
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 3 }}
      />
    </div>
  );
};

export default PostManagement;
