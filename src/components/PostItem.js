import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'; 
import { Alert, Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { deleteSinglePost } from '../redux/post/postSlice'

function PostItem({ ...props }) {
    // console.log(props);
    const id = props.id;
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [deletedItem, setDeletedItem] = useState(false)

    const { deleted } = useSelector((state) => state?.post);

    const handleDelete = (id) => {
      if (id) {
        setClick(true)
      }
    }

    const handleWarningDelete = () => {
      // console.log(id);
      dispatch(deleteSinglePost(id));
      setDeletedItem(true);
    }

    return (
      <div className='post__item'>
          <h1>{ props.title }</h1>
          <p>Author ID - { props.userId }</p>
          <p style={{ width: '90%' }}>{ props.body }</p>
          <Link to={`/posts/${props.id}`}>Details...</Link>
          <DeleteOutlined onClick={(id) => handleDelete(id)} style={{ fontSize: '20px', color: 'red', marginLeft: '1rem' }} />

          { click ?  <Alert
              message="Do you want to delete Post?"
              type="warning"
              action={
                <Space>
                  <Button size="small" type="ghost" onClick={handleWarningDelete}>
                    Yes
                  </Button>
                </Space>
              }
                closable
              /> : null
          }

          { deletedItem && deleted && ( <Alert
              message="Deleted"
              type="success"
              showIcon
              action={
                <Button size="small" type="text">
                  UNDO
                </Button>
              }
              closable
            />) 
          }
      </div>
    )
}

export default PostItem