import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "./write.css";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

export default function Write({ user ,setActive}) {
 
    const [form, setForm] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
  
    const { id } = useParams();
  
    const navigate = useNavigate();
  
    const { title, tags, category, trending, description } = form;
  
    useEffect(() => {
      const uploadFile = () => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              toast.info("Image upload to firebase successfully");
              setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
            });
          }
        );
      };
  
      file && uploadFile();
    }, [file]);
  
    useEffect(() => {
      id && getBlogDetail();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
    const getBlogDetail = async () => {
      const docRef = doc(db, "blogs", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setForm({ ...snapshot.data() });
      }
      setActive(null);
    };
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleTags = (tags) => {
      setForm({ ...form, tags });
    };
  
    const handleTrending = (e) => {
      setForm({ ...form, trending: e.target.value });
    };
  
    const onCategoryChange = (e) => {
      setForm({ ...form, category: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (category && tags && title && description && trending) {
        if (!id) {
          try {
            await addDoc(collection(db, "blogs"), {
              ...form,
              timestamp: serverTimestamp(),
              author: user.displayName,
              userId: user.uid,
            });
            toast.success("Blog created successfully");
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            await updateDoc(doc(db, "blogs", id), {
              ...form,
              timestamp: serverTimestamp(),
              author: user.displayName,
              userId: user.uid,
            });
            toast.success("Blog updated successfully");
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        return toast.error("All fields are mandatory to fill");
      }
  
      navigate("/");
    };
  
  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm"  onSubmit={handleSubmit}>
      <div className="writeFormGroup">
      
          <input
                  type="file" id="fileInput"
                 
                  onChange={(e) => setFile(e.target.files[0])}
                />
 
        </div>
        <div className="writeFormGroup">
       
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            value={title}
            name="title"
            autoFocus={true}
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
          <ReactTagInput tags={tags} placeholder="Tags" onChange={handleTags} />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeRadio"
            placeholder="Tell your story..."
            type="radio"
            value="yes"
            name="radioOption"
            autoFocus={true}
            checked={trending === "yes"}
            onChange={handleTrending}
          />
          <label>Yes&nbsp;</label>

          <input
            className="writeRadio"
            placeholder="Tell your story..."
            type="radio"
            value="no"
            name="radioOption"
            autoFocus={true}
            checked={trending === "no"}
            onChange={handleTrending}
          />

          <label>No&nbsp;</label>
        </div>

        <div className="writeFormGroup">
          <select
            className="writeSelect"
            value={category}
            onChange={onCategoryChange}
          >
            <option>Category Secin</option>
            {categoryOption.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput"
            placeholder="Tell your story..."
         
            value={description}
            name="description"
    
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
        <button
                  className="writebutton"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button> 
        </div>
       
  
      </form>
    </div>
  );
}
