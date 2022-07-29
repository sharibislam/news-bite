import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,

  }

  constructor(props) {
    super(props);
    console.log("This is news constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News-Bite`
  }
 

    updateNews = async ()=>{
    this.props.setProgress(10)  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("Clicked on prev button");
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Clicked on next button");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({page : this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });

  };

  
  render() {
    return (
      <>
        <h1 className="text-center"> NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        {/* {this.state.articles.map((element)=>console.log(element))} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.author}
                    description={element.url}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    time={element.publishedAt}
                    source={element.source.Name}
                  />
                  {/* <NewsItem title ={element?element.source.name.slice(0, 30):""} description = {element.url?element.url.slice(0, 80):""} imgUrl ={element.urlToImage} newsUrl = {element.url}/> */}
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
