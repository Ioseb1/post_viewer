import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { getSinglePost, getPostComments, createComment, clearUserComment } from '../redux/post/postSlice'
import { Input } from "antd"
import { Button } from 'antd';


function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePost } = useSelector((state) => state?.post);
  const { postComments } = useSelector((state) => state?.post);
  const {userComment} = useSelector((state) => state?.post);
  console.log(userComment);

  const [postId, setPostId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleCommentSubmit = () => { 
    if (postId && name && email && body) {
      dispatch(createComment({postId, name, email, body}))
    }
  }
  
  useEffect(() => {
    setPostId(id);
    dispatch(getSinglePost(id));
    dispatch(getPostComments(id));

    return () => {
      dispatch(clearUserComment());
    }
  }, [dispatch, id])

  return (
    <div>
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

        { Object.keys(userComment).length === 0 ? null : (<div className="detail__comments__inner visible">
                <h1>{ userComment?.body?.postId?.name }</h1>
                <p>{ userComment?.body?.postId?.email}</p>
                <p>{ userComment?.body?.postId?.body}</p>
            </div>)  
        }

      <div className="detail__comments__inner">
          <h2>Create Comment</h2>
          <Input 
            addonBefore="Name" 
            size="medium" 
            placeholder="Enter your name" 
            // onChange={(e) => handleUserFilter(e.target.value)}
            style={{ width: '70%', marginLeft: '15%', padding: '0.5rem' }}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Input 
            addonBefore="Your email" 
            size="medium" 
            placeholder="Enter your email" 
            // onChange={(e) => handleUserFilter(e.target.value)}
            style={{ width: '70%', marginLeft: '15%', padding: '0.5rem' }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            addonBefore="Comment Body" 
            size="medium" 
            placeholder="Enter your comment" 
            // onChange={(e) => handleUserFilter(e.target.value)}
            style={{ width: '70%', marginLeft: '15%', padding: '0.5rem' }}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button size={'large'} block style={{ width: '60%', marginLeft: '20%', marginTop: '1rem' }} onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
      </div>       
     </div>
    </div>
  )
}

export default Post