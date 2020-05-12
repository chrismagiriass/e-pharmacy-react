import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

class ReviewContainer extends Component {


    render() {
        return (
            <div className="container-flud review">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1>
                            <FormatQuoteIcon />
                        What they say about us
                        <FormatQuoteIcon />
                        </h1>
                        <p>This is a review </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewContainer;