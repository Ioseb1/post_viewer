import { useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { getSinglePost, getPostComments } from '../redux/post/postSlice'
import Loader from '../components/Loader'

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePost } = useSelector((state) => state?.post);
  const { postComments } = useSelector((state) => state?.post);
  // console.log(postComments);

  useEffect(() => {
    dispatch(getSinglePost(id));
    dispatch(getPostComments(id));
  }, [dispatch, id])

  return (
    <div className="home">
      <h3 className="home__title">Post Detail</h3>   
      
     <div className="detail__container">
       <div>
          <h1>{ singlePost.title }</h1>
          <p>Author ID - { singlePost.userId }</p>
          <p>{ singlePost.body }</p>
       </div>
     </div>

     <h3 className="home__title">Post Comments</h3>   

     <div className="detail__comments__container">
       {
         postComments[0]?.map((comment) => (
            <div className="detail__comments__inner">
                <h1>{ comment.name }</h1>
                <p>Author Email - { comment.email }</p>
                <p>{ comment.body }</p>
            </div>
         ))
       }
     </div>
    </div>
  )
}

export default Post