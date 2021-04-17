import styled from 'styled-components';

export const CarouselContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const CarouselWrapper = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`;

const Arrow = styled.button`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solide #ddd;
`;

export const LeftArrow = styled(Arrow)`
    left: 24px;
`;

export const RightArrow = styled(Arrow)`
    right: 24px;
`;

export const CarouselContentWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

export const CarouselContent = styled.div`
    display: flex;
    transition: all 250ms linear;
    scrollbar-width: none;

    > * {
        width: 100%;
        flex-shrink: 0;
        flex-grow: 1;
        opacity: 0.8;
        transition: all 300ms ease;
    }

    &.show-2 > * {
        width: 50%;
    }

    &.show-3 > * {
        width: calc(100% / 3);
    }

    &.show-4 > * {
        width: calc(100% / 4);
    }

    .middle-slide-item {
        opacity: 1;
        transform: scale(1.1, 1.3);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        
        .img {
            height: calc(100% - 100px);
        }
    }

`;
