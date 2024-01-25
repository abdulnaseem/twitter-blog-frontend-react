import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReplyPost } from '../../actions/post';
import PostItem from "../posts/postItem.component";
import { Link, useParams } from 'react-router-dom';
import ReplyForm from './reply-form/reply-form.component';
import ReplyItem from './reply-item/reply-item.component';
import './reply-post.component.css';

const ReplyPost = ({ getReplyPost, post: { post, loading } }) => {

    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        getReplyPost(id)
    }, [getReplyPost, id])

    return loading || post === null ? ( <Spinner /> ) : (
        <>  
            <Link to='/posts' className='go-back'>
                Back to Tweets
            </Link>
            <br />
            <br />
            <div className='container'>
                <h1>Thread</h1>
            </div>
            <PostItem post={post} showActions={false} />
            <ReplyForm postId={post._id} />

            {
                post.comments.map((comment) => (
                    <ReplyItem key={comment._id} comment={comment} postId={post._id} />
                ))
            }
            
        </>
    )
}

ReplyPost.propTypes = {
    getReplyPost: PropTypes.func.isRequired,
    post: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getReplyPost })(ReplyPost);