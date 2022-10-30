import React, { PureComponent } from 'react';

import '../post.css';

class PostList extends PureComponent {
  state = { isEdit: false, newTitle: '', newBody: '' };

  componentWillUnmount() {
    this.props.showMessage(this.props.post.id, 'deleted');
  }

  editPost = (e) => {
    if (e.target.dataset.name === 'title') {
      this.setState({ newTitle: e.target.value });
    } else if (e.target.dataset.name === 'body') {
      this.setState({ newBody: e.target.value });
    }
  };

  render() {
    if (!this.state.isEdit) {
      return (
        <div className='post'>
          <h3>{this.props.post.title}</h3>
          <div>{this.props.post.body}</div>
          <button
            className='edit'
            onClick={() => {
              this.setState({ isEdit: true });
            }}
          >
            EDIT
          </button>

          <i
            className='fa-sharp fa-solid fa-trash'
            onClick={() => {
              this.props.deletePost(this.props.post.id);
            }}
          >
            <span>delete</span>
          </i>
        </div>
      );
    } else {
      return (
        <form className='post'>
          <p>Title:</p>
          <textarea
            data-name='title'
            defaultValue={this.props.post.title}
            onInput={this.editPost}
          />
          <p>Text:</p>
          <textarea
            data-name='body'
            defaultValue={this.props.post.body}
            onInput={this.editPost}
          />

          <button
            className='edit'
            onClick={(e) => {
              e.preventDefault();
              this.props.editPost(
                this.props.post.id,
                this.state.newTitle || this.props.post.title,
                this.state.newBody || this.props.post.body
              );
              this.setState({ isEdit: false });
            }}
          >
            DONE
          </button>
        </form>
      );
    }
  }
}

export default PostList;
