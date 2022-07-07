import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './userHeader';

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPostsAndUsers();
    }

    renderList() {
        return this.props.posts.map(post => {
            return (
                <div className='card mb-3' key={post.id}>
                        
                            <div className='card-body row'>
                            <div className='col-md-4'>
                            <img src='https://via.placeholder.com/150/f9cee5' className='img-fluid rounded'  />
                        </div>
                        <div className='col-md-8'>
                                <h5 className='card-title'>{post.title}</h5>
                                <small className='text-muted'>
                                    <UserHeader userId={ post.userId }></UserHeader>
                                </small>
                                <p className='card-text'>{post.body}</p>
                            </div>
                        </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.posts);
        return <div>{ this.renderList() }</div>
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);