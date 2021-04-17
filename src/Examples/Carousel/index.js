import React, { useState } from 'react';
import Carousel from '../../components/Carousel';
import {
    Image,
    ProductName,
    ImageContainer,
    CarouselItemContainer,
    ProductDescription,
    CategoryContainer,
    ExampleContainer
} from './style';
import { carouselData } from './data';

function CarouselItem({
    name,
    image,
    category, 
    price
}) {
    return (
        <CarouselItemContainer>
            <ImageContainer
                className='img'
            >
                <Image
                    src={image}
                    alt={name}
                />
            </ImageContainer>
            <ProductDescription>
                <ProductName>{name}</ProductName>
                <span><b>Price: </b>{price}</span>
                <span><b>Category: </b>{category}</span>
            </ProductDescription>
        </CarouselItemContainer>
    );
}

function CarouselExample() {
    const [selectedCategory, setCategory] = useState();

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function renderCategoryDropDown() {
        const categories = Array.from(new Set(carouselData.map(data => data.category)));
        return (
            <CategoryContainer>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {categories.map(currentCategory => (
                        <option
                            key={currentCategory}
                            value={currentCategory}
                        >
                            {currentCategory}
                        </option>
                    ))}
                </select>
            </CategoryContainer>
        );
    }

    function getFilteredData() {
        const toUseSelectedCategory = selectedCategory || '';
        const dataToRender = toUseSelectedCategory ?
            carouselData.filter(data => data.category === toUseSelectedCategory)
            : carouselData;
        return dataToRender;
    }

    function render() {
        return (
            <ExampleContainer>
                {renderCategoryDropDown()}
                <Carousel
                    show={3}
                    infiniteLoop
                >
                    {getFilteredData().map((data, i) => (
                        <div>
                            <CarouselItem
                                key={i}
                                {...data}
                            />
                        </div>
                    ))}
                </Carousel>
            </ExampleContainer>
        );
    }

    return render();
}

export default CarouselExample;
 