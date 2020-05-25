import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className="container">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{ height: 400 }}
                    src="/slider1.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Olive products</h3>
                    <p>-40% in all biological olive products</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://glimmerbeauty.gr/image/cache/catalog/slider/Organic%20and%20botanic-1920x692.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{ height: 400 }}
                    src="https://cdn.chemistdirect.co.uk/img/2020/May/7_Changes/Anti-Virus-Slide+(Desktop).png"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{ height: 400 }}
                    src="https://bestpharmacy.gr/media/magiccart/magicslider/cache/985x478//f/r/frezyderm-gift-eye-patch-en.jpg"
                    alt="Forth slide"
                />
            </Carousel.Item>

        </Carousel >
    );
}

export default ControlledCarousel;
