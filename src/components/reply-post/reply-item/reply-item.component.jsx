import React from 'react';
import { PropTypes } from 'prop-types';
import { deleteReplyPost } from '../../../actions/post';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import './reply-item.component.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ReplyItem = ({
    postId,
    comment,
    auth
}) => {

    const { _id, createdBy, content, owner, date } = comment;
    

    return (
        <div className='container tweets mt-2'>
            <h5>@{createdBy} </h5>
            <p className='date'><Moment format='DD/MM/YYYY HH:mm'>{date}</Moment></p>

            {!auth.loading && owner === auth.user._id && (
                // <button onClick={() => deleteReplyPost(postId, _id)} type='button' className='btn btn-danger' >
                //     <AiFillDelete className='delete' />
                // </button>
                <div className="dropdown mb-5">
                    <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsThreeDotsVertical className='threedots' />
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item delete" onClick={() => deleteReplyPost(postId, _id)}>Delete</a></li>
                    </ul>
                </div>
            )}

            <p className='content'>{content}</p>


        </div>
    )
}

ReplyItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteReplyPost: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });


export default connect(mapStateToProps, { deleteReplyPost })(ReplyItem);

