import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../../actions/post';
import './post.component.css';

const PostUpdateForm = ({ auth, updatePost, post }) => {
    const [content, setContent] = useState('');

    const { _id } = post;

    console.log(_id)

    return (
        <div className="container mb-5 form">
        <form className='form my-1 position-relative' onSubmit={e => {
            e.preventDefault();
            updatePost(auth.user.loginId, _id, { content });
            setContent('');
        }}>
            <div class="vl"></div>
            <label for="exampleFormControlTextarea1" class="form-label"></label>
            <textarea 
                class="form-control update-tweet" 
                id="exampleFormControlTextarea1" 
                placeholder="Update tweet"
                value={content}
                onChange={e => setContent(e.target.value)}
                cols="15"
                rows="1"
                required></textarea>

            <input type="submit" value="Tweet" className="btn btn-dark tweet-btn position-absolute end-0 mt-2 mb-2" align="right" />
        </form>
    </div>
    )
}

PostUpdateForm.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updatePost })(PostUpdateForm)