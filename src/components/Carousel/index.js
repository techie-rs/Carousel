import React, { useEffect, useState } from 'react';
import {
    CarouselContainer,
    CarouselWrapper,
    LeftArrow,
    RightArrow,
    CarouselContentWrapper,
    CarouselContent
} from './style';

function Carousel({
    children,
    show,
    infiniteLoop
}) {
    const [currentIndex, setCurrentIndex] = useState(show);
    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [touchPosition, setTouchPosition] = useState(null);

    useEffect(function() {
        setIsRepeating(infiniteLoop && children.length > show);
    }, [children.length, infiniteLoop, show]);

    useEffect(function() {
        if (isRepeating && ((infiniteLoop === show) || (currentIndex === children.length))) {
            setTransitionEnabled(true);
        }
    }, [currentIndex, isRepeating, show, children.length]);

    function handleNextBtnClick() {
        if (isRepeating || (currentIndex < (children.length - show))) {
            setCurrentIndex(prevState => prevState + 1);
        }
    }

    function handlePrevBtnClick() {
        if (isRepeating || (currentIndex > 0)) {
            setCurrentIndex(prevState => prevState - 1);
        }
    }

    function handleTouchStart(event) {
        setTouchPosition(event.touches[0].clientX);
    }

    function handleTouchMove(event) {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = event.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            handleNextBtnClick();
        }

        if (diff < -5) {
            handlePrevBtnClick();
        }

        setTouchPosition(null);
    }

    function handleTransitionEnd() {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false);
                setCurrentIndex(children.length);
            } else if (currentIndex === children.length + show) {
                setTransitionEnabled(false);
                setCurrentIndex(show);
            }
        }
    }

    function renderExtraPrevSlideItems() {
        const toReturn = [];

        for (let i = 0; i < show; i++) {
            toReturn.push(React.cloneElement(children[children.length - 1 - i], {
                className: (children.length - currentIndex) === (children.length - 1 - i) ? 'middle-slide-item' : ''
            }));
        }

        toReturn.reverse();
        return toReturn;
    }

    function renderExtraNextSlideItems() {
        const toReturn = [];

        for (let i = 0; i < show; i++) {
            toReturn.push(React.cloneElement(children[i], {
                className: (currentIndex % children.length - show + 1) === i ? 'middle-slide-item' : ''
            }))
        }

        return toReturn;
    }

    function render() {
        return (
            <CarouselContainer>
                <CarouselWrapper>
                    {(isRepeating || (currentIndex > 0)) && (
                        <LeftArrow
                            onClick={handlePrevBtnClick}
                        >
                            &lt;
                        </LeftArrow>
                    )}
                    <CarouselContentWrapper
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <CarouselContent
                            className={`show-${show}`}
                            onTransitionEnd={() => handleTransitionEnd()}
                            style={{
                                transform: `translateX(-${currentIndex * (100 /show)}%)`,
                                transition: ~transitionEnabled ? 'none': undefined
                            }}
                        >
                            {((children.length > show) && isRepeating) && renderExtraPrevSlideItems()}
                            {React.Children.map(children, (child, i) => (
                                React.cloneElement(child, {
                                    key: i,
                                    className: (currentIndex - show + 1) === i ? 'middle-slide-item' : ''
                                })
                            ))}
                            {((children.length > show) && isRepeating) && renderExtraNextSlideItems()}
                        </CarouselContent>
                    </CarouselContentWrapper>
                    {(isRepeating || currentIndex < (children.length - show)) && (
                        <RightArrow
                            onClick={handleNextBtnClick}
                        >
                            &gt;
                        </RightArrow>
                    )}
                </CarouselWrapper>
            </CarouselContainer>
        );
    }

    return render();

}

export default Carousel;
