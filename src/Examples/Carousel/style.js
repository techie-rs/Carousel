import styled from 'styled-components';

export const CarouselItemContainer = styled.div`
    margin: auto;
    text-align: center;
    height: 100%;
    position: relative;
    :hover {
        opacity: 0.7;
    }
`;

export const ImageContainer = styled.div`
    width: 80%;
    height: calc(100% - 80px);
    margin: auto;
`;

export const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const ProductDescription = styled.div`
    height: 60px;
    display: flex;
    flex-direction: column;
    padding: 0 24px;
`;

export const ProductName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CategoryContainer = styled.div`
    width: 200px;
    position: relative;
    margin-bottom: 20px;
`;

export const ExampleContainer = styled.div`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 64px;
`;
