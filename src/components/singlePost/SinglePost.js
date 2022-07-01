import "./singlePost.css";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { doc, getDoc ,collection,getDocs} from "firebase/firestore";
import { db } from "../../firebase";

export default function SinglePost(setActive) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
     
    };

    getBlogsData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle" >
        {blog?.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
          Author:
            <b className="singlePostAuthor">  {blog?.author}</b>
          </span>
          <span></span>
        </div>
        <p className="singlePostDesc">
        {blog?.description}
          <br />
          <br />
   
        </p>
      </div>
    </div>
  );
}
