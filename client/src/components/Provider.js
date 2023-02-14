import React, {useState} from 'react';
import {Modal, Button, Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init({
    duration: 1000
});

function Provider({ provider }) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
        <div className='row bs' data-aos='fade-up'>
            <div className='col-md-4'>
                <img src={provider.imageurls[0]} className='smallimg' alt="" />
            </div>
            <div className='col-md-7'>
                <h1>{provider.name}</h1>
                <b>
                    <p>Price: {provider.price}</p>
                    <p>Phone number: {provider.phonenumber}</p>
                </b>

                <div style={{ float: 'right' }}>
                  <Link to={`/book/${provider._id}`}><button className='btn btn-primary m-2'>Book Now</button></Link>
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{provider.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
      {provider.imageurls.map(url=>{
        return <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={url}
          alt="First slide"
        />
      </Carousel.Item>
      })}
    </Carousel>
    <p>{provider.description}</p>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default Provider