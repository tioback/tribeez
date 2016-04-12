import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {FormattedRelative} from 'react-intl'

import Avatar from 'material-ui/lib/avatar'

import gravatar from '../utils/gravatar'

const css = {} // import css from './Comment.css'

class Comment extends React.Component {

  render() {
    const {comment} = this.props

    const user = this.props.users.find((u) => u.id === comment.author_id)

    return (
      <div className={css.container}>
        <Avatar src={gravatar(user)} size={30} />
        <div className={css.body}>
          <div>
            <span className={css.author}>{user.name} </span>
            <span className={css.content}>{comment.content}</span>
          </div>
          <div className={css.time}>
            <FormattedRelative value={comment.added} />
          </div>
        </div>
      </div>
    )
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  users: PropTypes.array,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

export default connect(mapStateToProps)(Comment)
