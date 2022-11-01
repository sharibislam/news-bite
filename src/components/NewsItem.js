import React from 'react'

const NewsItem = (props) => {

    let {title, description, imgUrl, newsUrl, time, source} = props;
      return (
        <div className='my-3'>
          <div className="card">
              <div style ={{
                      display: 'flex',
                      justifyContent: 'flex-end;',
                      position: 'absolute',
                      right: '0'
                }
                }>
                      <span className="badge rounded-pill bg-danger"> {source} </span>
                </div>
                <img src={!imgUrl?"https://feeds.abplive.com/onecms/images/uploaded-images/2022/07/17/81a87bb0d9220d89dc8309437cfb8e091658055703_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628": imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{!title?"Unkown_Sources":title} <span className="badge rounded-pill bg-primary">Breaking-News</span> </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">Update  on {new Date(time).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
                </div>
             </div>
          </div>
        )
  }

export default NewsItem
