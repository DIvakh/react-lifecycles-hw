import React from 'react';
import '../Post.css';

class PostList extends React.Component {
  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className='post' key={this.props.post.id}>
        <h3>{this.props.post.title}</h3>
        <div>{this.props.post.body}</div>
      </div>
    );
  }
}

export default PostList;
