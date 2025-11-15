import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  // Register chart components once
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [blogData, setBlogData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs created monthly by year",
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/blogs`);
        const responseproject = await fetch(`/api/projects`);
        const responseShop = await fetch(`/api/shops`);
        const responseGallery = await fetch(`/api/photos`);
        const data = await response.json();
        const dataProject = await responseproject.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();
        setBlogData(data);
        setProjectData(dataProject);
        setShopData(dataShop);
        setPhotosData(dataPhotos);
        setLoadingData(false);
      } catch (error) {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const monthlyData = useMemo(() => {
    if (!Array.isArray(blogData)) return {};
    return blogData
      .filter((dat) => dat && dat.status === "publish")
      .reduce((acc, blog) => {
        const created = blog?.createdAt ? new Date(blog.createdAt) : null;
        if (!created || isNaN(created)) return acc;
        const year = created.getFullYear();
        const month = created.getMonth();
        acc[year] = acc[year] || Array(12).fill(0);
        acc[year][month]++;
        return acc;
      }, {});
  }, [blogData]);

  const years = Object.keys(monthlyData || {});
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = useMemo(() => {
    // While loading, render a placeholder dataset
    if (loadingData) {
      return {
        labels,
        datasets: [
          {
            label: "Loading…",
            data: Array(12).fill(0),
            backgroundColor: "rgba(156, 163, 175, 0.5)",
          },
        ],
      };
    }

    // After loading, if there is no published data, show an empty state
    if (!years.length) {
      return {
        labels,
        datasets: [
          {
            label: "No data",
            data: Array(12).fill(0),
            backgroundColor: "rgba(99, 102, 241, 0.5)",
          },
        ],
      };
    }

    const datasets = years.map((year, idx) => ({
      label: `${year}`,
      data: monthlyData[year] || Array(12).fill(0),
      backgroundColor: `hsla(${(idx * 97) % 360}, 70%, 50%, 0.6)`,
    }));
    return { labels, datasets };
  }, [years, monthlyData, loadingData]);

  return (
    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Admin <span>DashBoard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /> <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>
              {blogData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>{Array.isArray(projectData) ? projectData.length : 0}</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>{Array.isArray(shopData) ? shopData.length : 0}</span>
          </div>
          <div className="four_card">
            <h2>Photos</h2>
            <span>{Array.isArray(photosData) ? photosData.length : 0}</span>
          </div>
        </div>
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {blogData.filter((dat) => dat.status === "publish").length} /
                365 <br />
                <span>Total Published</span>
              </h3>
            </div>
            <div style={{ height: 360 }}>
              <Bar options={options} data={chartData} />
            </div>
          </div>
          <div className="right_salescont">
            <div>
              <h3>Blogs by Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Next Js</td>
                    <td>
                      {
                        blogData.filter(
                          (dat) => Array.isArray(dat?.blogcategory) && dat.blogcategory[0] === "Next js"
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>React Js</td>
                    <td>
                      {
                        blogData.filter(
                          (dat) => Array.isArray(dat?.blogcategory) && dat.blogcategory[0] === "React js"
                        ).length
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
