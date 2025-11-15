import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBlogger } from "react-icons/fa";
import Blog from "@/components/Blog";
import toast from "react-hot-toast";

export default function DeleteProduct() {

  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    axios.get(`/api/blogs?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [router.isReady, id]);

  function goBack(){
    router.push('/blogs')
  }

  async function deleteBlog() {
    await axios.delete(`/api/blogs?id=${id}`)
    toast.success('Deleted')
    goBack()
  }

    return <>
      <Head>
        <title>Update Blog</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaBlogger /> <span>/</span>
            <span>Edit Blog</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
            <div className="deletecard">
                <svg
                viewBox='0 0 24 24'
                    fill="red"
                    height="6em"
                    weight="6em"
                >
                    <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V0H6m7 .5-5H17v2H3V4h3 .5l1-1h5l"></path>
                    
                </svg>
                <p className="cookieHeading">Are you sure?</p>
                <p className="cookieDescription">This will be permenently deleted !</p>
                <div className="buttonContainer">
                    <button onClick={deleteBlog} className="acceptButton">Delete</button>
                    <button  onClick={goBack}  className="declineButton">Cancel</button>
                </div>
            </div>
        </div>
      </div>
    </>
}