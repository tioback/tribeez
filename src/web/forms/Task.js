import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'

import form from '../../common/forms/task'
import focus from '../../common/utils/formFocus'
import getTask from '../../common/actions/getTask'
import submitTask from '../../common/actions/submitTask'

class TaskForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    // when accessing directly to /task/:id
    if (!this.props.task && this.props.id) {
      this.props.getTask(this.props.id)
    }
  }

  handleSubmit(task) {
    this.props.handleSubmit(submitTask)(task)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, wait, notice}} = this.props

    return (
      <Form name={'task.' + (this.props.task ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="name"
          required={true}
          {...name}
          name="title"
        />
        <TextField ref="description"
          multiLine={true}
          {...description}
        />
        <TextField ref="wait"
          required={true}
          type="number"
          step="1"
          min="0"
          max="255"
          {...wait}
        />
        <TextField ref="notice"
          required={true}
          type="number"
          step="1"
          min="1"
          max="255"
          {...notice}
        />
      </Form>
    )
  }
}

TaskForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  lang: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  task: PropTypes.object,
  // action creators:
  getTask: PropTypes.func.isRequired,
}

export default form(TaskForm, {getTask})
