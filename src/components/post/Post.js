import "./post.css";

import { Link } from "react-router-dom";


const Post = ({blogs ,user ,handleDelete}) => {

  const userId = user?.uid;

  return (
    <div className="posts">
   
   {blogs?.map((item)=> (
      
    <div className="post" key={item.id}>
      <img
        className="postImg"
        src={item.imgUrl} alt={item.title}
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            
          {item.tag}
            
          </span>
          <span className="postCat">
           
              Life
           
          </span>
        </div>
        <span className="postTitle">
         
        {item.title}
          
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
      {item.description}
          
      </p>  
      
             
      <div className="postedit">
            <Link to={`/detail/${item.id}`}>
              <button className="postbutton">Read More</button>
            </Link>
          {userId && item?.userId === userId && (
            <Link to={`/detail/${item.id}`}>
              <button className="postbutton2">Sil</button>
         
           <button className="postbutton3">Guncelle</button>
            </Link> )}
           
            
           
      
      </div>  
    </div>    ))}
  

    </div>
  );
}
export default Post;