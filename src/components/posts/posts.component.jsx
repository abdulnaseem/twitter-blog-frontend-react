import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './postItem.component';
import PostForm from './postForm.component';
import './post.component.css';

const Posts = ({ getPosts, post: { posts, loading }, auth }) => {

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return loading ? <Spinner /> : <>

        <div className='container'>
            <h1>Tweets</h1>
            <p>Welcome <strong><i>@{auth.user.loginId}</i></strong> to Twitter!</p>
        </div>
        <div className='container-fluid'>
            
            <PostForm className='post-form' />

            <div className='post-item'>
                {
                    posts.map((post) => {
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

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);