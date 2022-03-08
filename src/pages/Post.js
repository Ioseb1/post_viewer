import { useEffect } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { getSinglePost } from '../redux/post/postSlice'
import Loader from '../components/Loader'

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePost } = useSelector((state) => state?.post);
  console.log(singlePost);

  useEffect(() => {
    dispatch(getSinglePost(id));
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
    </div>
  )
}

export default Post