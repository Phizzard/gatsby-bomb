import React from "react";
import Slider from "react-slick";
import { Card } from "./Card";
import styled from "@emotion/styled";

export const ShowsSlider = ({ shows, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "80px",
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 1,
          centerPadding: "300px",
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 984,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerPadding: "220px"
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerPadding: "120px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px"
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
            height={270}
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

const ShowCard = styled(Card)`
  width: 250px;
`;

const SliderContainer = styled(Slider)`
  margin: 0 0.5rem;
`;
