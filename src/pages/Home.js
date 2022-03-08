import { useEffect } from 'react';
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../redux/post/postSlice'


function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state?.post);
  console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  
  }, [dispatch])
  

  return (
    <div className="home">
      <h3 className="home__title">All Posts</h3>   
      
      <div className="home__container">
        { !posts ? <Loader /> : null}
        { posts[0]?.map((item) => (
          <PostItem key={item.id} id={item.id} title={item.title} 
            userId={item.userId} body={item.body} />
        ))}
      </div>
      
    </div>
  )
}

export default Home