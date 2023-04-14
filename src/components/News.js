import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles: 0,
            hasMore: true,
            API_KYES: ['30ea0ceca22b42958b4d2fba9a800165', '6517c7f12e7140328cc1277ec3ed050a', 'dbe57b028aeb41e285a226a94865f7a7', 'd093053d72bc40248998159804e0e67d'],
            rnd_indx: getRandomIntInclusive(0, 3),
        };
    }

    async componentDidMount() {
        this.fetchMoreArticles();
        window.addEventListener('scroll', this.handleScroll);
    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && this.state.hasMore) {
            this.fetchMoreArticles();
        }
    };
    async fetchMoreArticles() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.newsType}&apiKey=${this.state.API_KYES[this.state.rnd_indx]}&page= ${this.state.page}& pageSize=${this.props.pageSize} `;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parshData = await data.json();
        let newArticles = parshData.articles;
        let hasMore = newArticles.length > 0;
        this.setState({
            page: this.state.page + 1,
            articles: [...this.state.articles, ...newArticles],
            totalArticles: parshData.totalResults,
            loading: false,
            hasMore,
        });
    }

    render() {
        return (
            <div className='container' style={{ marginTop: '7em' }}>
                <div className='row'>
                    {this.state.loading && <Spinner />}
                    {this.state.articles.map((element, index) => {
                        return (
                            <div
                                key={index}
                                className='col-md-3'
                                ref={index === this.state.articles.length - 1 ? this.lastArticleRef : null}
                            >
                                <NewsItem
                                    title={element.title}
                                    description={element.description}
                                    urlToImage={element.urlToImage === null ? `https://picsum.photos/200/300?random=${getRandomIntInclusive(1, 100)}` : element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div >
                        );
                    })
                    }
                </div >
            </div >
        );
    }
}

News.propType = {
    country: PropTypes.string,
    newsType: PropTypes.string,
    pageSize: PropTypes.number,
    page: PropTypes.number,
};

News.defaultProps = {
    country: 'in',
    newsType: 'general',
    page: 1,
    pageSize: 12,
};
//${this.state.API_KYES[getRandomIntInclusive(0, 1)]}