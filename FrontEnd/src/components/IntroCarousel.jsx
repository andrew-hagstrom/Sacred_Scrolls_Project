import Carousel from 'react-bootstrap/Carousel';

export const IntroCarousel=() => {
  return (
    <Carousel style={{borderRadius: "10px black solid", width:'500px',height:'500px'}}>
      <Carousel.Item style={{width:'200px', backgroundColor:'white'}}>
      <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}