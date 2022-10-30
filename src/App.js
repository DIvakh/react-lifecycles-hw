import React from 'react';
import Post from './components/Post';
import Message from './components/Message';
import './App.css';

class App extends React.Component {
  state = { posts: [], isMessageShown: false, message: '' };

  async componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    let postsList = await response.json();

    this.setState({ posts: postsList });
  };
  deletePost = async (id) => {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        this.setState({
          posts: this.state.posts.filter((post) => post.id !== id)
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  editPost = async (id, newTitle, newBody) => {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title: `${newTitle}`,
            body: `${newBody}`
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      );

      response.ok &&
        this.setState({
          posts: this.state.posts.map((post) =>
            post.id === id ? { ...post, title: newTitle, body: newBody } : post
          )
        });
      this.showMessage(id, 'edited');
    } catch (e) {
      console.error(e);
    }
  };

  showMessage = (id, action) => {
    this.setState({
      isMessageShown: true,
      message: `Post with id: ${id} ${action} successfully!`
    });
  };
  hideMessage = () => {
    this.setState({ isMessageShown: false });
  };

  render() {
    return (
      <section>
        {this.state.isMessageShown ? (
          <Message
            hideMessage={this.hideMessage}
            messageText={this.state.message}
          />
        ) : (
          ''
        )}
        <div className='container'>
          {this.state.posts.map((el) => {
            return (
              <Post
                deletePost={this.deletePost}
                editPost={this.editPost}
                showMessage={this.showMessage}
                key={el.id}
                post={el}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default App;
