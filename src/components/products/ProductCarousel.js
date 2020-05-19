import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductService from '../../services/productService';


function ProductCarousel() {
    const [index, setIndex] = useState(0);

    const [products, setProducts] = useState([]);

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
            this.setProducts(result.results);
        }
        ).catch(error =>
            console.error("Error from product", error)
        )
    });

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} slide={false} className="container">
            <Carousel.Item>
                <div className="row">
                    {products.map((product, i) => <ProductCard key={product.productId} product={product} />)}
                </div>
            </Carousel.Item>
            <Carousel.Item>
                {/* <div className="row">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div> */}
            </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarousel;
