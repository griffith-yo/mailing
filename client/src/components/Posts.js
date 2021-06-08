import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'

const Posts = ({ syncPosts }) => {
  if (!syncPosts.length) {
    return <p className="text-center">Постов пока нет</p>
  }
  return syncPosts.map((post) => <Post post={post} key={post.id} />)
}

// Преобразовывает весь state в пропсы. Их же мы и получаем в компоненте выше
const mapStateToProps = (state) => ({ syncPosts: state.posts.posts })

// Функция connect должна сделать из dumb component - smart component. Она
export default connect(mapStateToProps, null)(Posts)
