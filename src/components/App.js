import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Routes, Route,Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login } from './';

const Signup = () => <div>Signup</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
