import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewsItem.css'

export default class NewsItem extends Component {
    render() {
        return (
            <div className="card my-3 mx-1">
                <img className="card-img-top img-fluid" src={this.props.urlToImage} alt="images Not found" style={{ height: '200px' }} />
                <div className="card-body" style={{ height: '300px' }}>
                    <h5 className="card-title" >{this.props.title}</h5>
                    <p className="card-text text-ellipsis" style={{ WebkitLineClamp: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                        {this.props.description}
                    </p>
                </div >
                <a href={this.props.newsUrl} target="_blank" className="btn btn-primary btn-sm" rel="noopener noreferrer">Read more</a>
            </div >
        )
    }
}

NewsItem.propType = {
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    newsUrl: PropTypes.string
};

