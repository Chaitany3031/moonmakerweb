import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { FaBlogger, FaEdit  } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { allData = [], loading } = useFetchData("/api/blogs");
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const allBlog = Array.isArray(allData) ? allData.length : 0;
  const filteredBlogs =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((blog) =>
          (blog?.title || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedBlogs = currentBlogs.filter((ab) => ab.status === "publish");
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allBlog / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Published <span>Blogs</span>
            </h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb">
            <FaBlogger />
            <span>/</span>
            <span>Blogs</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Blog: </h2>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr>
                    <td>
                      <Dataloading />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {publishedBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">No Blogs Found </td>
                    </tr>
                  ) : (
                    publishedBlogs.map((blog,index)=>(
                        <tr key={blog._id}>
                            <td>{indexOfFirstBlog+index+1}</td>
                            <td><img src={blog.images[0]} alt="image" width={180} /></td>
                            <td><h3>{blog.title}</h3></td>
                            <td>
                              <div className="flex gap-2 flex-center">
                                <Link href={'/blogs/edit/'+blog._id}><button><FaEdit/></button></Link>
                                <Link href={'/blogs/delete/'+blog._id}><button><RiDeleteBin7Fill /></button></Link>
                              </div>
                            </td>
                        </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
