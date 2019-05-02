import React from "react";
import Slider from "react-slick";
import { Card } from "./Card";
import styled from "@emotion/styled";

const CustomNextArrow = ({ ...attrs }) => <NextArrow {...attrs} />;

const CustomPrevArrow = ({ ...attrs }) => <PrevArrow {...attrs} />;

export const ShowsSlider = ({ shows, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
        {shows &&
          shows.map(({ node }) => (
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

const SliderContainer = styled(Slider)`
  margin: 0 0.75rem;
`;

const NextArrow = styled.div`
  height: 91.5%;
  background-color: #404040e0;
  right: -24px;
  transition: ease-in-out 0.1s;
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 25px;
  :hover {
    background-color: #404040;
  }
`;

const PrevArrow = styled.div`
  height: 91.5%;
  background-color: #404040e0;
  left: -24px;
  z-index: 99;
  transition: ease-in-out 0.1s;
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 25px;
  :hover {
    background-color: #404040;
  }
`;
