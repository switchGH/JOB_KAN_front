import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ _id, body }) => (
    <li>
        { body }
    </li>
)

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.object.isRequired,
        body: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired
    })
}

export default Post