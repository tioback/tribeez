import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative, FormattedNumber} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import SendIcon from 'material-ui/lib/svg-icons/content/send'

import Comment from './Comment'

import postComment from '../actions/postComment'
import updateComment from '../actions/updateComment'

import gravatar from '../utils/gravatar'

import css from './Entry.css'

class Entry extends Component {

  handleCommentChange(id, event) {
    this.props.updateComment(id, event.target.value)
  }

  postComment(id, event) {
    event.preventDefault()
    this.props.postComment(id, this.props.boxComments[id])
  }

  render() {
    const {entry, users, currency, uid} = this.props

    // to render an activity, the users must be loaded for the current tribe activity (see parent component)
    const author = users.find((u) => u.id === entry.user_id)
    if (!author) {
      return null
    }

    const [type, action] = entry.type.split('.')
    let extra = ''
    const values = {
      author: author.name,
    }
    let infos
    switch (type) {
      case 'user':
        if (entry.item_id) {
          const inviter = users.find((u) => u.id === entry.item_id)
          values.inviter = inviter.name
          extra = 'invited'
        }
        break
      case 'bill':
        values.name = entry.data.name
        values.amount = <FormattedNumber value={entry.data.amount} style="currency" currency={currency} />
        const user_part = entry.data.parts.find((part) => part.user_id === uid)
        const user_amount = <FormattedNumber value={user_part.amount} style="currency" currency={currency} />
        infos = <FormattedMessage id={`entry.bill.${action}.infos`} values={{amount: user_amount}} />
        break
      default:
        return null
    }
    const title = <FormattedMessage id={`entry.${type}.${action}${extra ? '.' + extra : ''}`} values={values} />

    const date = <FormattedRelative value={entry.added} />
    const comments = (
      <span style={{fontWeight: entry.comments.length ? 'bold' : 'normal'}}>
        <FormattedMessage id="entry.comments" values={{num: entry.comments.length}} />
      </span>
    )

    if (infos) {
      infos = (
        <CardText expandable={true}>
          {infos}
        </CardText>
      )
    }

    return (
      <Card className={css.container}>
        <CardHeader title={title} subtitle={<span>{date} — {comments}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(author)}
          actAsExpander={true} showExpandableButton={true}
        />
        {infos}
        <CardText expandable={true} className={css.comments}>
          {
            entry.comments.map((comment) =>
              <Comment comment={comment} key={comment.id} />
            )
          }
          <form onSubmit={this.postComment.bind(this, entry.id)}>
            <TextField value={this.props.boxComments[entry.id]}
              onChange={this.handleCommentChange.bind(this, entry.id)}
              hintText={<FormattedMessage id="comment" />}
              autoComplete="off"
            />
            <IconButton type="submit" className={css.button}><SendIcon /></IconButton>
          </form>
        </CardText>
      </Card>
    )
  }

}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  boxComments: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currency: PropTypes.string,
  uid: PropTypes.number,
  postComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  boxComments: state.activity.boxComments,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
  uid: state.member.user.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postComment,
  updateComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Entry)
