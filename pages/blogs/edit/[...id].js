import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBlogger } from "react-icons/fa";
import Blog from "@/components/Blog";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    axios.get(`/api/blogs?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [router.isReady, id]);

  return (
    <>
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
        <div className="mt-3">
            {
                productInfo && (
                    <Blog {...productInfo}/>
                )
            }
        </div>
      </div>
    </>
  );
}
