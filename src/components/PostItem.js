import { Link } from 'react-router-dom'

function PostItem({ ...props }) {
    // console.log(props);
  return (
    <div>
        <h1>{ props.title }</h1>
        <p>Author ID - { props.userId }</p>
        <p>{ props.body }</p>
        <Link to={`/posts/${props.id}`}>Details...</Link>
    </div>
  )
}

export default PostItem