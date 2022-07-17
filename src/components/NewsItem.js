import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
      let {title, description, imgUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imgUrl?"https://feeds.abplive.com/onecms/images/uploaded-images/2022/07/17/81a87bb0d9220d89dc8309437cfb8e091658055703_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628": imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
