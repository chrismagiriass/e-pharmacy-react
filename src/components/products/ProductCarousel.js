import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import ProductCard from './ProductCard'

function ProductCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} slide={false} className="container">
            <Carousel.Item>
                <div className="row">
                    <ProductCard className="col-md-2" />
                    <ProductCard className="col-md-2" />
                    <ProductCard className="col-md-2" />
                    <ProductCard className="col-md-2" />
                </div>
                <ProductCard />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ProductCard />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div class="col-md-3" style={{ float: 'left' }}>
                    <div class="card mb-2">
                        <img class="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg" alt="Card image cap" />
                        <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content.</p>
                            <a class="btn btn-primary">Button</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-3" style={{ float: 'left' }}>
                    <div class="card mb-2">
                        <img class="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg" alt="Card image cap" />
                        <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content.</p>
                            <a class="btn btn-primary">Button</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-3" style={{ float: 'left' }}>
                    <ProductCard />
                </div>

                <div class="col-md-3" style={{ float: 'left' }}>
                    <div class="card mb-2">
                        <img class="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg" alt="Card image cap" />
                        <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content.</p>
                            <a class="btn btn-primary">Button</a>
                        </div>
                    </div>
                </div>

            </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarousel;
