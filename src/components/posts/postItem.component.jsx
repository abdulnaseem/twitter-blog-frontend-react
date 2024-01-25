import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import './post.component.css';
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { Like, Unlike, deletePost } from '../../actions/post';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PostUpdateForm from './postUpdateForm.component';

const PostItem = ({ 
    Like,
    Unlike,
    auth, 
    post,
    showActions
}) => {

    const { createdBy, date, content, likes, _id, comments, owner } = post;

    const [edit, setEdit] = useState(false);

    const onEdit = () => {
        if(edit === false) {
            setEdit(true);
        }
        if(edit === true) {
            setEdit(false);
        }
    }

    let menu;

    if(edit) {
        menu = <AiOutlineClose className='close' onClick={() => onEdit()} />;                        
    }
    else {
        menu = <BsThreeDotsVertical className='threedots' />;
    }

    return (
        <>  
            <div className='container tweets mt-2'>
                <h5>@{createdBy} </h5>
                <p className='date'><Moment format='DD/MM/YYYY HH:mm'>{date}</Moment></p>

                {!auth.loading && owner === auth.user._id && (
                    <div className="dropdown">
                        <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            {menu}   
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a className="dropdown-item" onClick={() => onEdit()}>Edit</a></li>
                            <li><a className="dropdown-item delete" onClick={deletePost(_id, createdBy)}>Delete</a></li>
                        </ul>
                    </div>
                )}

                <p className='content'>{content}</p>

                {showActions && <>
                    { 
                        likes.includes(auth.user._id) ?
                            <AiFillHeart onClick={() => Unlike(_id, createdBy)} color='red' className='liked' size={20} />
                            : 
                            <AiOutlineHeart onClick={() => Like(_id, createdBy)} className='unliked' size={20} />
                    }
                    {' '}
                    <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                    
                    <Link to={`/post/${_id}`} className='thread'>
                        <BiCommentDetail className='reply' size={20} />{' '}
                        {comments.length > 0 && (
                            <span>{comments.length}</span>
                        )}
                    </Link>

                </>}

            </div>

            
            {   edit && 
                <>
                    <PostUpdateForm post={post} />
                </>
            }


        </>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    Like: PropTypes.func.isRequired,
    Unlike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { Like, Unlike, deletePost })(PostItem);