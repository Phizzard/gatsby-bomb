import React from "react";
import Slider from "react-slick";
import { Card } from "./Card";
import styled from "@emotion/styled";

export const ShowsSlider = ({ shows, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container>
      <Title>{title}</Title>
      <SliderContainer {...settings}>
        {shows.map(({ node }) => (
          <Card
            key={node.id}
            badge={node.title}
            image={node.localImage.childImageSharp.fluid}
            to={node.slug}
            height={"350px"}
          />
        ))}
      </SliderContainer>
    </Container>
  );
};
const Container = styled.div``;

const Title = styled.h2`
  font-weight: bold;
  margin: 0 0.5rem 0.2rem 0.5rem;
`;

const SliderContainer = styled(Slider)`
  margin: 0 0.5rem;
`;
