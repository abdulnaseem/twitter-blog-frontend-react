import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from "../posts/postItem.component";

const Post = ({ getPost, post: { post, loading }, auth }) => {
    
    useEffect(() => {
        getPost(auth.user.loginId)
    }, [getPost])

    return loading ? <Spinner /> : <>

        <div className='container'>
            <h1>My Tweets</h1>
            <p>Welcome to Twitter!</p>
        </div>
        <div className='container-fluid mt-2'>
            
            {/* <PostForm /> */}

            <div>
                {
                    post.map((post) => {
                        console.log(post)
                        if (!post) {
                            return null;
                        }
                        return (
                            <PostItem key={post._id} post={post} />
                        )
                    })
                }
            </div>
        </div>
    
    </>;
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPost })(Post);