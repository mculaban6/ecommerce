import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
// import PropTypes from 'prop-types'

export default function ProductCard(product) {
  // Destructuring the props
  const {
    productName,
    productDescription,
    price,
    productImage1,
    productImage2,
    productImage3,
    _id,
    isActive,
    productStock,
  } = product.productProp;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function ProductAvailable() {
    if (isActive === false || productStock === 0) {
      return <Card.Text>Not Available</Card.Text>;
    } else {
      return <Card.Text>{productStock}</Card.Text>;
    }
  }

  return (
    // <Row className="mt-3 mb-3">
    //   <Col xs={12} md={4}>
    <Card className="cardProducts" style={{ height: "370px" }}>
      <Card.Body>
        <div className="carouselProduct">
          <Carousel
            className="cardImage"
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
          >
            <Carousel.Item interval={1500}>
              <img
                className="cardImage d-block w-100"
                top
                src={productImage1}
              />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img className="cardImage" top src={productImage2} />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img className="cardImage" top src={productImage3} />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="cardBody">
          <Card.Title>{productName}</Card.Title>

          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>PHP {price}</Card.Text>
        </div>

        <Card.Footer className="text-center">
          <Link className="btn btn-secondary" to={`/products/${_id}`}>
            <div className="cardFooterBtn">Details</div>
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
    //   </Col>
    // </Row>
  );
}
// Prop Types can be used to validate the data coming from the props. You can define each property of the prop and assign specific validation for each of them.
// {CourseCard.propTypes = {
//   course: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
//   })
// }}

// Initialize a 'count' state with a value of zero (0)
// const [count, setCount] = useState(0)
// const [slots, setSlots] = useState(15)
// const [isOpen, setIsOpen] = useState(true)

// console.log({name})
// console.log({description})
// console.log({_id})

// function enroll(){
//  if(slots > 0){
//    setCount(count + 1)
//    setSlots(slots - 1)

//    return
//  }

//  alert('Slots are full!')
// }

// Effects in React is just like side effects/effects in real life, where everytime something happens within the component, a function or condition runs.
// You may also listen or watch a specific state for changes instead of watching/listening to the whole component
// useEffect(() => {
//  if(slots === 0){
//    setIsOpen(false)
//  }
// }, [slots])
