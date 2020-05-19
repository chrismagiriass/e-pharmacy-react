import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductService from '../../services/productService';


function ProductCarousel() {
    const [index, setIndex] = useState(0);

    const [productCarouselFirstPage, setProductCarouselFirstPage] = useState([]);
    const [productCarouselSecondPage, setProductCarouselSecondPage] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        ProductService.get(
            {
                params: {
                    page: 0,
                    size: 8
                }
            }
        ).then(result => {
            let first = [];
            let second = [];
            let products = result.results;
            for (let i = 0; i < 4; i++) {
                first.push(products[i]);
            }

            for (let i = 4; i < 8; i++) {
                second.push(products[i]);
            }
            setProductCarouselFirstPage(first);
            setProductCarouselSecondPage(second);
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    }, []
    );




    return (


        <Carousel activeIndex={index} onSelect={handleSelect} slide={true} className="container">
            <Carousel.Item>
                <div className="row">
                    {productCarouselFirstPage.map((product, i) => <ProductCard key={product.productId} product={product} />)}
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="row">
                    {productCarouselSecondPage.map((product, i) => <ProductCard key={product.productId} product={product} />)}
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarousel;
