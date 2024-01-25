import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReplyPost } from '../../../actions/post';

const ReplyForm = ({ postId, addReplyPost }) => {
    const [content, setContent] = useState('');

    return (
        <div className="container mb-5 form">
        {/* <h3>Add Tweet</h3> */}
        <form className='form my-1 position-relative' onSubmit={e => {
            e.preventDefault();
            addReplyPost(postId, { content });
            setContent('');
        }}>
            <label for="exampleFormControlTextarea1" class="form-label"></label>
            <textarea 
                class="form-control" 
                id="exampleFormControlTextarea1" 
                placeholder="Tweet your reply"
                value={content}
                onChange={e => setContent(e.target.value)}
                cols="15"
                rows="3"
                required></textarea>

            <input type="submit" value="Tweet" className="btn btn-dark tweet-btn position-absolute end-0 mt-2 mb-2" align="right" />
        </form>
    </div>
    )
}

ReplyForm.propTypes = {
    addReplyPost: PropTypes.func.isRequired
}

export default connect(null, { addReplyPost })(ReplyForm);