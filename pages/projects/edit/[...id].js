import Project from "@/components/Project";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBlogger } from "react-icons/fa";


export default function EditProject() {
const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!router.isReady || !id) return;

    axios.get(`/api/projects?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [router.isReady, id]);

    return <>
      <Head>
        <title>Edit Project</title>
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
            <span>Edit Project</span>
          </div>
        </div>
        <div className="mt-3">
            {
                productInfo && (
                    <Project {...productInfo}/>
                )
            }
        </div>
      </div>
    </>
}