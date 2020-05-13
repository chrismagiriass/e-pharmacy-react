import React, { Component } from 'react';
import ControlledCarousel from './ControlledCarousel';
import ProductCarousel from '../products/ProductCarousel'
import ReviewContainer from './ReviewContainer'

class HomePage extends Component {


    render() {
        return (
            <>
                <ControlledCarousel />
                {/* <ProductCarousel /> */}
                <ReviewContainer />
            </>
        );
    }
}

export default HomePage;