import { useGetPostsQuery } from "../api/post";
import { Image, Table } from "antd";
import { Link } from "react-router-dom";
import "../App.css";

import { IPost } from "../interfaces/post";

interface IProps {
  posts: IPost[];
}

const PostPage = (props: IProps) => {
  const { data } = useGetPostsQuery();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Customers Also Purchased
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data?.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <Link to={`/posts/${item.id}`}>
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.imgAlt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    <Link to={`/posts/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-500">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
