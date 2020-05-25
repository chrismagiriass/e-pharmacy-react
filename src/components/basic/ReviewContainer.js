import React, { Component } from 'react';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import RatingStar from '../products/RatingStar';


class ReviewContainer extends Component {


    render() {
        return (
            <div className="container-flud review">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2>
                            <FormatQuoteIcon />
                                What they say about us
                            <FormatQuoteIcon />
                        </h2>
                        <div className="row">
                            <div className="col-md-12">
                                <p><strong>John Duffy</strong> <RatingStar value={4.5} /></p>
                                <p>Great E-shop! They applied to my request immediately.
                                I would definately recommend it! lol
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewContainer;