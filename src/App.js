import React from 'react';
import './App.css';
import Post from './components/Post';

class App extends React.Component {
  async componentDidMount() {
    this.getPosts();
  }

  constructor(props) {
    super(props);
    this.state = { posts: [] };
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
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div className='container'>
        {this.state.posts.map((el) => {
          return (
            <Post
              deletePost={this.deletePost}
              editPost={this.editPost}
              key={el.id}
              post={el}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
