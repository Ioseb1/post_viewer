import { useEffect, useState } from 'react';
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../redux/post/postSlice'
import { Pagination } from 'antd'


function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state?.post);
  console.log(posts);

  const pageSize = 4;

  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page-1) * pageSize)
    setMaxIndex(page * pageSize)
  }

  useEffect(() => {
    dispatch(getAllPosts());
  
  }, [dispatch])

  useEffect(() => {
    setTotalPage(posts?.length / pageSize)
    setMinIndex(0)
    setMaxIndex(pageSize)
  }, [posts?.length])
  

  return (
    <div className="home">
      <h3 className="home__title">All Posts</h3>   
      
      <div className="home__container">
        { !posts ? <Loader /> : null}
        { posts[0]?.map((item, index) => 
            index >= minIndex &&
            index < maxIndex && (
              <PostItem key={item.id} id={item.id} title={item.title} 
                userId={item.userId} body={item.body} />
            ))}
      </div>

      <Pagination
          pageSize={pageSize}
          current={current}
          total={100}
          onChange={handleChange}
          style={{ marginTop: "20px", marginLeft: "20px" }}
      />
      
    </div>
  )
}

export default Home