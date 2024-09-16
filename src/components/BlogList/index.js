// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoaded: true}

  componentDidMount() {
    this.getBlogItem()
  }

  getBlogItem = async () => {
    const response = await fetch(`https://apis.ccbp.in/blogs`)
    const data = await response.json()
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      author: eachItem.author,
      topic: eachItem.topic,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      title: eachItem.title,
    }))
    this.setState({blogsData: updatedData, isLoaded: false})
  }

  render() {
    const {blogsData, isLoaded} = this.state
    return (
      <ul className="blogsList-container">
        {isLoaded ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(eachItem => (
            <BlogItem key={eachItem.id} blogData={eachItem} />
          ))
        )}
      </ul>
    )
  }
}
export default BlogsList
