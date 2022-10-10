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
    this.getPosts = this.getPosts.bind(this);
  }
  postsLink = 'https://jsonplaceholder.typicode.com/posts';

  async sendData(link, method = 'GET', body) {
    let fetchData = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };
    if (method === 'GET') {
      fetchData = {};
    }

    let response = await fetch(link, fetchData);

    let data = await response.json();

    return data;
  }

  async getPosts() {
    let postsList = await this.sendData(this.postsLink);

    this.setState({ posts: postsList });
  }

  render() {
    return (
      <div className='container'>
        {this.state.posts.map((el) => {
          return <Post key={el.id} post={el} />;
        })}
      </div>
    );
  }
}

export default App;
