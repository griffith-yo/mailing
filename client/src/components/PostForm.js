import React from 'react'
import { connect } from 'react-redux'
import { createPost, showAlert } from '../redux/actions'
import { Alert } from './Alert'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { title } = this.state

    // Если пост пустой, то ничего не происходит (удаляем пробелы)
    if (!title.trim()) {
      return this.props.showAlert('Название поста не может быть пустым')
    }

    const newPost = {
      title,
      id: Date.now().toString(),
    }

    // Появляется после Dispatch внизу (после соединения)
    this.props.createPost(newPost)
    this.setState({ title: '' })
  }

  changeInputHandler = (event) => {
    this.setState((prev) => ({
      ...prev,
      ...{ [event.target.name]: event.target.value },
    }))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && <Alert text={this.props.alert} />}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Заголовок поста
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Создать
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
