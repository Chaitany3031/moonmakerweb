import Head from "next/head";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";

export default function   Project(
    {
    id,
    title:existingTitle,
    slug:existingslug,
    images:existingimages,
    description:existingdescription,
    client:existingclient,
    projectcategory:existingprojectcategory,
    tags:existingtags,
    livepreview:existinglivepreview,
    status:existingstatus,
  }
) {


    const [redirect, setRedirect] = useState(false);
      const router = useRouter();
      const { query } = router;
      const _id = query._id || null;
    
      const [title, setTitle] = useState(existingTitle || "");
      const [slug, setSlug] = useState(existingslug || "");
      const [images, setImages] = useState(existingimages || []);
      const [description, setDescription] = useState(existingdescription || "");
      const [client, setclient] = useState(existingclient || "");
      const [projectcategory, setprojectcategory] = useState(existingprojectcategory || []);
      const [tags, setTags] = useState(existingtags||[]);
      const [livepreview, setlivepreview] = useState(existinglivepreview||"");
      const [status, setStatus] = useState(existingstatus||"");
    
      const handleTitleChange = (e) => setTitle(e.target.value);
      const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, "-");
        setSlug(newSlug);
      };
      const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e?.target?.selectedOptions || [], o => o.value);
        setprojectcategory(selectedOptions);
      };
      const handleTagsChange = (e) => {
        const selectedOptions = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        setTags(selectedOptions);
      };
      const handleDescriptionChange = ({ text }) => setDescription(text);
    
      // image upload state
      const [isUploading, setIsUploading] = useState(false);
      const uploadImageQueueRef = useRef([]);
    
      async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
          setIsUploading(true);
          for (const file of files) {
            const data = new FormData();
            data.append("file", file);
            const p = axios.post("/api/upload", data).then((res) => {
              setImages((oldImages) => [...oldImages, ...res.data.links]);
            });
            uploadImageQueueRef.current.push(p);
          }
          await Promise.all(uploadImageQueueRef.current);
          uploadImageQueueRef.current = [];
          setIsUploading(false);
          toast.success("Images Uploaded");
        } else {
          toast.error("An error occurred");
        }
      }
    
      function updateImagesOrder(list) {
        setImages(list);
      }
    
      function handleDeleteImages(index) {
        const updateImages = [...images];
        updateImages.splice(index, 1);
        setImages(updateImages);
        toast.success("Images Deleted");
      }
    
      async function createBlog(ev) {
        ev.preventDefault();
    
        if (isUploading && uploadImageQueueRef.current.length) {
          await Promise.all(uploadImageQueueRef.current);
          uploadImageQueueRef.current = [];
        }
    
        if (!title || !slug || !description || category.length === 0) {
          toast.error("Please fill all required fields");
          return;
        }
    
        const currentStatus = status || "draft";
        const data = {
          title,
          slug,
          images,
          description,
          client,
          projectcategory,
          tags,
          livepreview,
          status: currentStatus,
        };
    
        try {
          if (_id) {
            await axios.put("/api/projects", { ...data, _id });
            toast.success("Project Updated");
          } else {
            await axios.post("/api/projects", data);
            toast.success("Project Created");
          }
          router.push("/blogs");
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          toast.error(error.response?.data?.error || "Failed to save blog");
        }
    
        setRedirect(true);
      }
    
      if (redirect) {
        router.push("/projects");
        return null;
      }


    return <>
        <Head>
            <title>Add Project</title>
        </Head>
         <>
              <form className="addWebsiteform" onSubmit={createBlog}>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name=""
                    id="title"
                    placeholder="Enter your title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="title">Slug</label>
                  <input
                    type="text"
                    name=""
                    id="slug"
                    placeholder="Enter Slug url"
                    value={slug}
                    onChange={handleSlugChange}
                  />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="client">Client name</label>
                  <input
                    type="text"
                    name=""
                    id="client"
                    placeholder="Enter client name"
                    value={client}
                    onChange={ev => setclient(ev.target.value)}
                  />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="livepreview">Live preview</label>
                  <input
                    type="text"
                    name=""
                    id="livepreview"
                    placeholder="Enter url"
                    value={livepreview}
                    onChange={ev => setlivepreview(ev.target.value)}
                  />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="title">
                    Category(for multi select press ctr + mouse left key)
                  </label>
                  <select
                    name="category"
                    id="category"
                    multiple
                    value={projectcategory}
                    onChange={handleCategoryChange}
                  >
                    {/* <option value="">Select Category</option> */}
                    <option value="Web Dev">Web Dev</option>
                    <option value="App Dev">App Dev</option>
                    <option value="System Design">System Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Freelancing">Freelancing</option>
                    <option value="Finance">Finance</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <div className="w-100">
                    <label htmlFor="images">
                      Images(first image will be shown as thumbnail, you can drag)
                    </label>
                    <input
                      type="file"
                      name=""
                      id="fileInput"
                      className="mt-1"
                      accept="image/*"
                      multiple
                      onChange={uploadImages}
                    />
                  </div>
                  <div className="w-100 flex flex-left mt-1">
                    {isUploading && <Spinner />}
                  </div>
                </div>
        
                {!isUploading && (
                  <div className="flex">
                    <ReactSortable
                      list={Array.isArray(images) ? images : []}
                      setList={updateImagesOrder}
                      animation={200}
                      className="flex gap-1"
                    >
                      {images?.map((link, index) => (
                        <div key={link} className="uploading">
                          <img src={link} alt="image" className="object-cover" />
                          <div className="deleting">
                            <button onClick={() => handleDeleteImages(index)}>
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                      ))}
                    </ReactSortable>
                  </div>
                )}
        
                <div className="description w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="description">
                    Blog Content(for image : first upload and copy link and paste in !
                    [alt text](link))
                  </label>
                  <MarkdownEditor
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ width: "100%", height: "400px" }}
                    renderHTML={(text) => (
                      <ReactMarkdown
                        components={{
                          code: ({ node, inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || "");
                            if (inline) {
                              return <code>{children}</code>;
                            } else if (match) {
                              return (
                                <div style={{ position: "relative" }}>
                                  <pre
                                    style={{
                                      padding: "0",
                                      borderRadius: "5px",
                                      overflowX: "auto",
                                      whiteSpace: "pre-wrap",
                                    }}
                                    {...props}
                                  >
                                    <code>{children}</code>
                                  </pre>
                                  <button
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      right: "0",
                                      zIndex: "1",
                                    }}
                                    onClick={() =>
                                      navigator.clipboard.writeText(children)
                                    }
                                  >
                                    copy code
                                  </button>
                                </div>
                              );
                            } else {
                              return <code {...props}>{children}</code>;
                            }
                          },
                        }}
                      >
                        {text}
                      </ReactMarkdown>
                    )}
                  />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="tags">
                    Tags(for multi select press ctr + mouse left key)
                  </label>
                  <select
                    name="tags"
                    id="tags"
                    multiple
                    value={tags}
                    onChange={handleTagsChange}
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="CSS">CSS</option>
                    <option value="HTML">HTML</option>
                    <option value="NodeJS">NodeJS</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                  </select>
                </div>
                <div className="w-100 mb-2">
                  <button type="submit" className="w-100 addwebbtn flex-center">
                    SAVE
                  </button>
                </div>
              </form>
            </>

   

    </>
}

