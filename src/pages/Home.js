import { useEffect, useState } from 'react';
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts, getPostByUser, clearGetPostsByUser } from '../redux/post/postSlice'
import { Pagination, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';


function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state?.post);
  const { userPosts } = useSelector((state) => state?.post);
  const userLen = userPosts?.length
  const postsLen = posts?.length
  console.log(userPosts);

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

  const handleUserFilter = (userId) => {
    if (!userId) dispatch(clearGetPostsByUser());
    dispatch(getPostByUser(userId))
  }

  useEffect(() => {
    dispatch(getAllPosts());
  
  }, [dispatch])

  useEffect(() => {
    if (userPosts) {
      setTotalPage(userLen / pageSize)
    }
    setTotalPage(posts?.length / pageSize)
    setMinIndex(0)
    setMaxIndex(pageSize)
  }, [posts?.length, userPosts, userLen])
  

  return (
    <div className="home">
      <h3 className="home__title">All Posts</h3>   
      <Input 
        addonBefore="Search Post" 
        size="large" 
        placeholder="Search Post By User ID" 
        prefix={<UserOutlined />} 
        onChange={(e) => handleUserFilter(e.target.value)}
        style={{ width: '90%', marginLeft: '5%' }}
      />
      
      <div className="home__container">
        { !posts ? <Loader /> : null}
        
        { userPosts.length === 0 ? posts[0]?.map((item, index) => 
            index >= minIndex &&
            index < maxIndex && (
              <PostItem key={item.id} id={item.id} title={item.title} 
                userId={item.userId} body={item.body} />
            )) : userPosts[0]?.map((item, index) => 
            index >= minIndex &&
            index < maxIndex && (
              <PostItem key={item.id} id={item.id} title={item.title} 
                userId={item.userId} body={item.body} />
            ))}
      </div>

      <Pagination
          pageSize={pageSize}
          current={current}
          total={ 100 }
          onChange={handleChange}
          style={{ marginTop: "20px", marginLeft: "20px" }}
      />
      
    </div>
  )
}

export default Home