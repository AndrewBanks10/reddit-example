import React, { Component } from 'react';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

export default class AsyncApp extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
      const { selectedSubreddit, handleChangeSubreddit } = this.props;
      handleChangeSubreddit(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated, handleChangeSubreddit, handleRefreshList } = this.props;
    return (
      <div>
        <Picker
            value={selectedSubreddit}
            onChange={handleChangeSubreddit}
            options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={handleRefreshList}>
              Refresh
            </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>}
      </div>
    );
  }
}