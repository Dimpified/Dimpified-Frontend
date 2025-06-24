import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import BookingModal from "./BookingModal";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Navbar as BootstrapNavbar,
  Nav,
  Carousel,
  ButtonGroup,
  Figure,
} from "react-bootstrap";

import {
  ArrowRight,
  PlayCircle,
  Mouse,
  StarFill,
  Person,
  Envelope,
  ChatSquareDots,
  Calendar2Check,
} from "react-bootstrap-icons";
const BarberMordern = () => {
  return (
    <Fragment>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Gallery />
      <Team />
      <Testimonials />
      <Statistics />
      <Contact />
      <Footer />
    </Fragment>
  );
};

export default BarberMordern;
const images = [
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-04.jpg",
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-08.jpg",
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-06.jpg",
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-07.jpg",
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-08.jpg",
  "https://gfa-tech.com/dimp-template-images/images/demo-barber-home-04.jpg",
];
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Group images into chunks of 4
const imageChunks = chunkArray(images, 3);

// Navbar Component
const Navbar = () => (
  <BootstrapNavbar
    bg="transparent"
    variant="transparent"
    expand="lg"
    className="px-4 px-lg-10"
  >
    <Container>
      <BootstrapNavbar.Brand
        className="fw-bold d-flex align-items-center"
        href="#home"
      >
        <img
          src="https://gfa-tech.com/dimp-template-images/images/demo-barber-logo-black.png"
          alt="Logo"
        />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto barber-link">
          <Nav.Link
            style={{ fontWeight: "600", fontSize: "1rem" }}
            href="#about"
          >
            About Us
          </Nav.Link>
          <Nav.Link
            style={{ fontWeight: "600", fontSize: "1rem" }}
            href="#services"
          >
            Hair Services
          </Nav.Link>
          <Nav.Link
            style={{ fontWeight: "600", fontSize: "1rem" }}
            href="#gallery"
          >
            Gallery
          </Nav.Link>
          <Nav.Link
            style={{ fontWeight: "600", fontSize: "1rem" }}
            href="#barbers"
          >
            Barbers
          </Nav.Link>
          <Nav.Link
            style={{ fontWeight: "600", fontSize: "1rem" }}
            href="#testimonials"
          >
            Reviews
          </Nav.Link>
        </Nav>
        <Button
          href="#appointment"
          className="btn-large btn-round-edge btn-box-shadow btn-white left-icon section-link"
        >
          <span>
            <span className="btn-double-text">Contact Us</span>
          </span>
        </Button>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

// Hero Section
const Hero = () => {
  const [modalShow, setModalShow] = useState(false);
  

  return (
    <Fragment>
      <section
        id="home"
        className="barber px-4 full-screen bg-dark-gray position-relative"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/images/demo-barber-home-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container className="h-100">
          <Row className="align-items-center justify-content-center h-100">
            <Col lg={9} md={12} className="text-center">
              <span className="fs-16 text-white text-uppercase text-shadow-double-large ls-3px d-block mb-25px sm-mb-15px">
                London popular barber
              </span>
              <h1 className="fs-90 md-fs-80 ls-minus-4px alt-font text-white mb-35px md-mb-20px text-shadow-double-large xs-fs-60 xs-ls-minus-2px">
                Talented men's barber studio
              </h1>
              <Button
                onClick={() => setModalShow(true)}
                className="btn-extra-large btn-round-edge btn-box-shadow btn-switch-text btn-white left-icon section-link"
              >
                <span>
                  <span
                    className="btn-double-text"
                    data-text="Online appointment"
                  >
                    Online appointment
                  </span>
                  {""}
                  <Calendar2Check />
                </span>
              </Button>
              <BookingModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
              />
            </Col>
            <div className="text-center position-absolute left-0px bottom-50px md-bottom-30px w-100 animation-float">
              <a href="#about" className="d-block text-white section-link">
                <Mouse />
              </a>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

// About Section
const About = () => (
  <section
    id="about"
    className="barber px-4 bg-very-light-yellow position-relative pb-8"
  >
    <Container>
      <Row className="align-items-center mb-50px sm-mb-40px">
        <Col
          xl={5}
          lg={6}
          className="align-self-end mt-15 xl-mt-18 md-mt-22 xs-mt-30"
        >
          <h2 className="fs-60 alt-font  fw-400 ls-minus-2px text-white-gray mb-15px shadow-none">
            Award{" "}
            <span className="text-highlight">
              winning
              <span className="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>{" "}
            barber studio.
          </h2>
          <p className="w-90 xl-w-100 mb-30px sm-mb-25px">
            Our barbers are carefully hand-picked to ensure the finest service
            in our barbershops around London, the UK, and the world. We’re well
            trusted to deliver excellence with over 5000+ customer reviews.
          </p>
          <div className="d-inline-block">
            <Button
              href="#services"
              className="btn btn-extra-large btn-base-color btn-hover-animation-switch btn-round-edge btn-box-shadow me-4"
            >
              <span>
                <span className="primary-font btn-text text-white">
                  Explore Services
                </span>
                <span className="primary-font btn-icon text-white">
                  <i className="fa-solid fa-arrow-right fs-14"></i>
                </span>
                <span className="primary-font btn-icon text-white">
                  <i className="fa-solid fa-arrow-right fs-14"></i>
                </span>
              </span>
            </Button>
          </div>
        </Col>
        <Col
          lg={6}
          className="offset-xl-1 position-relative md-mt-45px md-mb-50px"
        >
          <div
            className="position-relative w-70 md-w-60"
            style={{ transition: "transform 0.6s ease-out" }}
          >
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-01.jpg"
              className="border-radius-6px"
              alt="Barber Studio"
            />
          </div>
          <div className="position-absolute right-15px bottom-minus-60px border-radius-6px lg-w-65 md-w-50 overflow-hidden">
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-02.jpg"
              className="box-shadow-quadruple-large"
              alt="Barber Studio"
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// Services Section
const Services = () => (
  <section
    id="services"
    className="barber px-4 bg-medium-yellow position-relative overlap-height pt-4"
  >
    <div
      className="position-absolute left-0 top-minus-50px md-top-minus-30px sm-top-minus-25px xs-top-minus-15px background-position-left-top w-100 h-100px md-h-50px background-size-100 background-no-repeat"
      style={{ backgroundImage: `url(images/demo-barber-home-bg-up.png)` }}
    ></div>
    <div className="position-absolute left-0 top-minus-130px lg-top-minus-90px d-none d-md-block">
      <img
        src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-03.png"
        alt=""
        style={{ transform: "translateY(50px)" }}
        onLoad={(e) => {
          e.currentTarget.style.transform = "translateY(-50px)";
        }}
      />
    </div>
    <Container className="overlap-gap-section">
      <Row className="mb-3">
        <Col className="text-center">
          <h2 className="alt-font fs-2 ls-minus-2px text-dark-gray shadow-none">
            Barbershop{" "}
            <span className="text-highlight">
              services
              <span className="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>
          </h2>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 g-0 align-items-center mb-5 md-mb-7">
        {/* Start Feature Box 1 */}
        <Col className="services-box-style-07 text-center last-paragraph-no-margin border-end border-color-transparent-dark-very-light md-mb-50px xs-border-end-0">
          <div className="pe-50px ps-50px pb-40px lg-p-30px lg-pt-0">
            <div className="position-relative ms-auto me-auto mb-25px">
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-01.svg"
                className="h-70px position-relative z-index-1 mt-35px"
                alt=""
              />
              <div className="h-85px w-85px rounded-circle bg-very-light-yellow position-absolute top-0 start-50 translate-middle-x"></div>
            </div>
            <span className="fs-20 fw-700 text-dark-gray d-block mb-5px">
              Haircutting
            </span>
            <p className="lh-28">
              Your choice of hairstyle is pivotal in the way.
            </p>
          </div>
          <div className="d-flex flex-column overflow-hidden w-100 justify-content-center position-relative">
            <div className="fs-14 fw-700 text-uppercase text-dark-gray border-top border-bottom border-color-transparent-dark-very-light pt-10px pb-10px">
              <span className="text-down d-block">Starting from $35</span>
            </div>
            <div className="btn-hover d-flex align-items-center justify-content-center bg-dark-gray">
              <Button
                href="#book"
                className="inner-link btn btn-link btn-hover-animation-switch btn-large text-white"
              >
                <span>
                  <span className="btn-text">Request an appointment</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </Col>
        {/* End Feature Box 1 */}

        {/* Start Feature Box 2 */}
        <Col className="services-box-style-07 text-center last-paragraph-no-margin border-end md-border-end-0 border-color-transparent-dark-very-light md-mb-50px">
          <div className="pe-50px ps-50px pb-40px lg-p-30px lg-pt-0">
            <div className="position-relative ms-auto me-auto mb-25px">
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-02.svg"
                className="h-70px position-relative z-index-1 mt-35px"
                alt=""
              />
              <div className="h-85px w-85px rounded-circle bg-very-light-yellow position-absolute top-0 start-50 translate-middle-x"></div>
            </div>
            <span className="fs-20 fw-700 text-dark-gray d-block mb-5px">
              Shaving
            </span>
            <p className="lh-28">
              Your choice of hairstyle is pivotal in the way.
            </p>
          </div>
          <div className="d-flex flex-column overflow-hidden w-100 justify-content-center position-relative">
            <div className="fs-14 fw-700 text-uppercase text-dark-gray border-top border-bottom border-color-transparent-dark-very-light pt-10px pb-10px">
              <span className="text-down d-block">Starting from $25</span>
            </div>
            <div className="btn-hover d-flex align-items-center justify-content-center bg-dark-gray">
              <Button
                href="#appointment"
                className="inner-link btn btn-link btn-hover-animation-switch btn-large text-white"
              >
                <span>
                  <span className="btn-text">Request an appointment</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </Col>
        {/* End Feature Box 2 */}

        {/* Start Feature Box 3 */}
        <Col className="services-box-style-07 text-center last-paragraph-no-margin border-end border-color-transparent-dark-very-light xs-border-end-0 xs-mb-40px">
          <div className="pe-50px ps-50px pb-40px lg-p-30px lg-pt-0">
            <div className="position-relative ms-auto me-auto mb-25px">
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-03.svg"
                className="h-70px position-relative z-index-1 mt-35px"
                alt=""
              />
              <div className="h-85px w-85px rounded-circle bg-very-light-yellow position-absolute top-0 start-50 translate-middle-x"></div>
            </div>
            <span className="fs-20 fw-700 text-dark-gray d-block mb-5px">
              Styling
            </span>
            <p className="lh-28">
              Your choice of hairstyle is pivotal in the way.
            </p>
          </div>
          <div className="d-flex flex-column overflow-hidden w-100 justify-content-center position-relative">
            <div className="fs-14 fw-700 text-uppercase text-dark-gray border-top border-bottom border-color-transparent-dark-very-light pt-10px pb-10px">
              <span className="text-down d-block">Starting from $40</span>
            </div>
            <div className="btn-hover d-flex align-items-center justify-content-center bg-dark-gray">
              <Button
                href="#appointment"
                className="inner-link btn btn-link btn-hover-animation-switch btn-large text-white"
              >
                <span>
                  <span className="btn-text">Request an appointment</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </Col>
        {/* End Feature Box 3 */}

        {/* Start Feature Box 4 */}
        <Col className="services-box-style-07 text-center last-paragraph-no-margin">
          <div className="pe-50px ps-50px pb-40px lg-p-30px lg-pt-0">
            <div className="position-relative ms-auto me-auto mb-25px">
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-04.svg"
                className="h-70px position-relative z-index-1 mt-35px"
                alt=""
              />
              <div className="h-85px w-85px rounded-circle bg-very-light-yellow position-absolute top-0 start-50 translate-middle-x"></div>
            </div>
            <span className="fs-20 fw-700 text-dark-gray d-block mb-5px">
              Trimming
            </span>
            <p className="lh-28">
              Your choice of hairstyle is pivotal in the way.
            </p>
          </div>
          <div className="d-flex flex-column overflow-hidden w-100 justify-content-center position-relative">
            <div className="fs-14 fw-700 text-uppercase text-dark-gray border-top border-bottom border-color-transparent-dark-very-light pt-10px pb-10px">
              <span className="text-down d-block">Starting from $15</span>
            </div>
            <div className="btn-hover d-flex align-items-center justify-content-center bg-dark-gray">
              <Button
                href="#appointment"
                className="inner-link btn btn-link btn-hover-animation-switch btn-large text-white"
              >
                <span>
                  <span className="btn-text">Request an appointment</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </Col>
        {/* End Feature Box 4 */}
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center last-paragraph-no-margin">
          <div className="d-inline-block align-middle me-5px">
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-05.png"
              className="h-20px"
              alt=""
            />
          </div>
          <div className="fs-20 ls-minus-05px text-dark-gray d-inline-block align-middle">
            We're dedicated to empowering men to look and feel fantastic.
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// Gallery Section
const Gallery = () => (
  <section className="barber px-4 bg-very-light-gray p-0">
    <Container fluid className="p-0">
      <Row className="g-0 position-relative overlap-section">
        <Col md={12}>
          <Carousel
            controls={true}
            indicators={true}
            interval={3000}
            pause={false}
            keyboard={true}
            className="image-gallery-style-01"
          >
            {imageChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <Row className="g-0">
                  {chunk.map((src, idx) => (
                    <Col md={4} key={idx} className="p-1">
                      <div className="gallery-box">
                        <a
                          href="#"
                          data-group="lightbox-gallery"
                          title="Lightbox gallery image title"
                        >
                          <div className="position-relative gallery-image bg-dark-gray overflow-hidden border-radius-6px">
                            <img src={src} className="img-fluid h-100" alt="" />
                          </div>
                        </a>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  </section>
);

// Testimonials Section
const Pricing = () => (
  <section id="pricing" class="barber px-4 bg-very-light-yellow overlap-height">
    <div class="container overlap-gap-section">
      <div class="row mb-1">
        <div class="col-12 text-center">
          <h2
            class="alt-font fs-2 ls-minus-2px text-dark-gray shadow-none"
            data-shadow-animation="true"
            data-animation-delay="700"
          >
            Flexible{" "}
            <span class="text-highlight">
              pricing
              <span class="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>
          </h2>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-lg-2 row-cols-md-1 sm-mb-10px xs-mb-0">
        <div class="col">
          <ul class="pricing-table-style-13">
            <li class="flex-column last-paragraph-no-margin overflow-hidden p-0">
              <div class="w-100 ps-35px pe-35px pt-15px pb-15px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Traditional hair styling
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$10.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
            <li class="flex-column last-paragraph-no-margin overflow-hidden border border-color-light-yellow border-radius-4px p-0 mt-20px mb-20px">
              <div class="fs-13 text-uppercase lh-38 fw-700 w-100 bg-light-yellow text-dark-gray ps-30px pe-30px xs-ps-15px xs-pe-15px">
                Barber specials
              </div>
              <div class="w-100 ps-35px pe-35px pt-25px pb-25px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Classic haircut and washing
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$10.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
            <li class="flex-column last-paragraph-no-margin overflow-hidden p-0">
              <div class="w-100 ps-35px pe-35px pt-15px pb-15px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Arranging long beard
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$08.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="pricing-table-style-13">
            <li class="flex-column last-paragraph-no-margin overflow-hidden p-0">
              <div class="w-100 ps-35px pe-35px pt-15px pb-15px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Stylization beard
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$12.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
            <li class="flex-column last-paragraph-no-margin overflow-hidden border border-color-light-yellow border-radius-4px p-0 mt-20px mb-20px">
              <div class="fs-13 text-uppercase lh-38 fw-700 w-100 bg-light-yellow text-dark-gray ps-30px pe-30px xs-ps-15px xs-pe-15px">
                Barber specials
              </div>
              <div class="w-100 ps-35px pe-35px pt-25px pb-25px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Trimming long beard
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$11.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
            <li class="flex-column last-paragraph-no-margin overflow-hidden p-0">
              <div class="w-100 ps-35px pe-35px pt-15px pb-15px xs-pe-15px xs-ps-15px">
                <div class="fs-19 ls-05px d-flex align-items-baseline w-100">
                  <span class="fw-700 text-dark-gray ls-minus-05px">
                    Beard and hair washing
                  </span>
                  <div class="text-dark-gray ms-auto flex-shrink-0">$10.00</div>
                </div>
                <p>Lorem ipsum has been the industry.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Contact Section
const Team = () => (
  <section
    id="barbers"
    className="barber px-4 bg-very-light-yellow overlap-height position-relative"
  >
    <div
      className="position-absolute left-0 top-minus-50 lg-top-minus-10 background-position-left-top w-100 h-100 background-size-100 background-no-repeat"
      style={{ backgroundImage: "url('images/demo-barber-home-bg-down.png')" }}
    ></div>
    <Container className="overlap-gap-section">
      <Row className="mb-3 animate__animated animate__fadeIn animate__delay-1s">
        <Col xs={12} className="text-center">
          <h2 className="alt-font fs-2 ls-minus-2px text-dark-gray shadow-none">
            Talented{" "}
            <span className="text-highlight">
              barbers
              <span className="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>
          </h2>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center mb-5 animate__animated animate__fadeIn">
        <Col className="team-style-08 border-radius-6px md-mb-30px">
          <Figure className="mb-0 position-relative">
            <Figure.Image
              className="border-radius-6px"
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-team-01.jpg"
              alt="Michal Ruheen"
            />
            <Figure.Caption className="w-100 h-100 d-flex align-items-end p-12 lg-p-8 bg-gradient-base-transparent border-radius-6px">
              <div className="w-100">
                <span className="team-member-name fs-18 text-white d-block">
                  Michal Ruheen
                </span>
                <span className="member-designation lh-20 text-white d-block">
                  Hair stylist
                </span>
              </div>
            </Figure.Caption>
          </Figure>
        </Col>
        <Col className="team-style-08 border-radius-6px md-mb-30px">
          <Figure className="mb-0 position-relative">
            <Figure.Image
              className="border-radius-6px"
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-team-02.jpg"
              alt="Jessica Dover"
            />
            <Figure.Caption className="w-100 h-100 d-flex align-items-end p-12 lg-p-8 bg-gradient-base-transparent border-radius-6px">
              <div className="w-100">
                <span className="team-member-name fs-18 text-white d-block">
                  Jessica Dover
                </span>
                <span className="member-designation lh-20 text-white d-block">
                  Hair stylist
                </span>
              </div>
            </Figure.Caption>
          </Figure>
        </Col>
        <Col className="team-style-08 xs-mb-30px">
          <Figure className="mb-0 position-relative">
            <Figure.Image
              className="border-radius-6px"
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-team-03.jpg"
              alt="Johncy Parker"
            />
            <Figure.Caption className="w-100 h-100 d-flex align-items-end p-12 lg-p-8 bg-gradient-base-transparent border-radius-6px">
              <div className="w-100">
                <span className="team-member-name fs-18 text-white d-block">
                  Johncy Parker
                </span>
                <span className="member-designation lh-20 text-white d-block">
                  Beard stylist
                </span>
              </div>
            </Figure.Caption>
          </Figure>
        </Col>
        <Col className="team-style-08">
          <Figure className="mb-0 position-relative">
            <Figure.Image
              className="border-radius-6px"
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-team-04.jpg"
              alt="Jemmy Watson"
            />
            <Figure.Caption className="w-100 h-100 d-flex align-items-end p-12 lg-p-8 bg-gradient-base-transparent border-radius-6px">
              <div className="w-100">
                <span className="team-member-name fs-18 text-white d-block">
                  Jemmy Watson
                </span>
                <span className="member-designation lh-20 text-white d-block">
                  Hair washer
                </span>
              </div>
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>
      <Row className="justify-content-center animate__animated animate__fadeIn">
        <Col
          xs="auto"
          className="text-center last-paragraph-no-margin sm-mb-20 xs-mb-0"
        >
          <div className="d-inline-block align-middle me-5px">
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-05.png"
              className="h-20px"
              alt="Barber Icon"
            />
          </div>
          <div className="fs-20 ls-minus-05px text-dark-gray d-inline-block align-middle">
            Our nearly 80 committed talented barbers are ready to help.
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
const Testimonials = () => (
  <section className="barber px-4 bg-medium-yellow position-relative">
    <div
      className="position-absolute left-0 top-minus-50 md-top-minus-30 sm-top-minus-25 xs-top-minus-15 background-position-left-top w-100 h-100px background-size-100 background-no-repeat"
      style={{
        backgroundImage: `url('https://gfa-tech.com/dimp-template-imags/images/demo-barber-home-bg-up.png')`,
      }}
    ></div>
    <Container>
      <Row className="justify-content-center mb-1">
        <Col className="text-center">
          <h2
            className="alt-font fs-2 fs-2 ls-minus-2px text-dark-gray shadow-none"
            data-shadow-animation="true"
            data-animation-delay="700"
          >
            Satisfied{" "}
            <span className="text-highlight">
              customers
              <span className="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center mb-6 sm-mb-12">
        <Col
          xl={11}
          className="testimonials-style-11 position-relative ps-18 pe-18 sm-ps-0 sm-pe-0 text-center text-md-start"
        >
          <Carousel>
            {/* Start testimonial item */}
            <Carousel.Item>
              <div className="text-center">
                <span className="fs-20 lh-32 ls-minus-05px d-block mb-10px">
                  The Barbers is an affordable, convenient and good quality
                  place to get my hair cut. It is a friendly, laid back
                  environment with great professionals. It is also friendly for
                  all ages from kids to adults!
                </span>
                <span className="fs-19 fw-700 text-dark-gray py-3">
                  Herman miller - Switzerland
                </span>
              </div>
            </Carousel.Item>
            {/* End testimonial item */}
            {/* Start testimonial item */}
            <Carousel.Item>
              <div className="text-center">
                <span className="fs-20 lh-32 ls-minus-05px d-block mb-10px">
                  Great barber shop. Walked in and they took me immediately
                  without an appointment. Quick haircut, great service and
                  reasonable price. I didn't have to wait at all when I got to
                  the barbershop.
                </span>
                <span className="fs-19 fw-700 text-dark-gray py-3">
                  Matthew taylor - New York
                </span>
              </div>
            </Carousel.Item>
            {/* End testimonial item */}
            {/* Start testimonial item */}
            <Carousel.Item>
              <div className="text-center">
                <span className="fs-20 lh-32 ls-minus-05px d-block mb-10px">
                  Barber was friendly and professional. He asked me what kind of
                  hairstyle I want/used to have and he gave me his input on what
                  he thinks would look good with my head shape. Cheers guys!
                </span>
                <span className="fs-19 fw-700 text-dark-gray py-3">
                  Leonel mooney - London
                </span>
              </div>
            </Carousel.Item>
            {/* End testimonial item */}
          </Carousel>
        </Col>
      </Row>
    </Container>
  </section>
);
const Statistics = () => (
  <section className="barber px-4 bg-medium-yellow position-relative">
    <div
      className="position-absolute left-0 top-minus-50 md-top-minus-30 sm-top-minus-25 xs-top-minus-15 background-position-left-top w-100 h-100px background-size-100 background-no-repeat"
      style={{ backgroundImage: "url(images/demo-barber-home-bg-up.png)" }}
    ></div>
    <Container>
      <Row className="row-cols-1 row-cols-md-4 row-cols-sm-2 counter-style-04">
        {/* Start counter item */}
        <Col className="last-paragraph-no-margin sm-mb-30px text-center">
          <h2
            className="alt-font fs-2 ls-minus-4px md-ls-minus-2px text-dark-gray vertical-counter d-inline-flex text-corduroy-green mb-0"
            data-text="+"
            data-to="437"
          >
            437
          </h2>
          <span className="lh-22 text-dark-gray d-block">
            Haircuts per week
          </span>
        </Col>
        {/* End counter item */}
        {/* Start counter item */}
        <Col className="last-paragraph-no-margin sm-mb-30px text-center">
          <h2
            className="alt-font fs-2 ls-minus-4px md-ls-minus-2px text-dark-gray vertical-counter d-inline-flex text-corduroy-green mb-0"
            data-text="+"
            data-to="864"
          >
            864
          </h2>
          <span className="lh-22 text-dark-gray d-block">Shaved per week</span>
        </Col>
        {/* End counter item */}
        {/* Start counter item */}
        <Col className="last-paragraph-no-margin xs-mb-30px text-center">
          <h2
            className="alt-font fs-2 ls-minus-4px md-ls-minus-2px text-dark-gray vertical-counter d-inline-flex text-corduroy-green mb-0"
            data-text="+"
            data-to="334"
          >
            334
          </h2>
          <span className="lh-22 text-dark-gray d-block">
            Stylization per week
          </span>
        </Col>
        {/* End counter item */}
        {/* Start counter item */}
        <Col className="last-paragraph-no-margin text-center">
          <h2
            className="alt-font fs-2 ls-minus-4px md-ls-minus-2px text-dark-gray vertical-counter d-inline-flex text-corduroy-green mb-0"
            data-text="+"
            data-to="453"
          >
            453
          </h2>
          <span className="lh-22 text-dark-gray d-block">Washing per week</span>
        </Col>
        {/* End counter item */}
      </Row>
    </Container>
  </section>
);
const Contact = () => (
  <section className="barber px-4 bg-very-light-yellow" id="appointment">
    <Container>
      <Row>
        <Col xl={4} lg={5} className="md-mb-50px">
          <h3
            className="alt-font fs-2 ls-minus-2px text-dark-gray mb-20px shadow-none"
            data-shadow-animation="true"
            data-animation-delay="700"
          >
            Request an{" "}
            <span className="text-highlight">
              appointment
              <span className="bg-base-color h-2px bottom-8px separator-animation"></span>
            </span>
          </h3>
          <p className="mb-30px">
            Your information will be forwarded to a scheduling specialist who
            will contact you.
          </p>
          <div className="icon-with-text-style-01 feature-box feature-box-left-icon-middle bg-medium-yellow p-25px border-radius-6px last-paragraph-no-margin w-95 md-w-100 text-start">
            <div className="feature-box-icon me-15px">
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-13.jpg"
                className="h-60px"
                alt=""
              />
            </div>
            <div className="feature-box-content">
              <p className="lh-26 mb-0">Phone appointment</p>
              <a
                href="tel:12345678910"
                className="fs-22 ls-minus-1px fw-600 ls-minus-05px text-dark-gray"
              >
                +1 234 567 8910
              </a>
            </div>
          </div>
        </Col>
        <Col xl={8} lg={7}>
          <div className="contact-form-style-05">
            {/* Start contact form */}
            <Form action="email-templates/contact-form.php" method="post">
              <Row className="justify-content-center">
                <Col md={6} className="sm-mb-20px">
                  <Form.Control
                    className="mb-20px border-color-transparent-dark-very-light bg-transparent required"
                    type="text"
                    name="name"
                    placeholder="Your name*"
                  />
                  <Form.Control
                    className="mb-20px border-color-transparent-dark-very-light bg-transparent required"
                    type="email"
                    name="email"
                    placeholder="Your email address*"
                  />
                  <div className="date-time row gutter-very-small">
                    <Col xl={6} className="date-icon lg-mb-25px">
                      <Form.Control
                        className="border-color-transparent-dark-very-light bg-transparent"
                        type="date"
                        name="date"
                        defaultValue="2023-01-01"
                        min="2023-01-01"
                        max="2099-12-31"
                      />
                    </Col>
                    <Col xl={6} className="time-icon">
                      <Form.Control
                        className="border-color-transparent-dark-very-light bg-transparent"
                        type="time"
                        name="time"
                        defaultValue="09:12"
                        min="09:00"
                        max="12:00"
                      />
                    </Col>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-20px select">
                    <Form.Select
                      className="border-color-transparent-dark-very-light bg-transparent"
                      name="select"
                    >
                      <option value="">Select barber service</option>
                      <option value="Haircut">Haircut</option>
                      <option value="Hair styling">Hair styling</option>
                      <option value="Shaving">Shaving</option>
                      <option value="Beard sculpting">Beard sculpting</option>
                      <option value="Kids haircut">Kids haircut</option>
                    </Form.Select>
                  </div>
                  <Form.Control
                    as="textarea"
                    className="border-color-transparent-dark-very-light bg-transparent h-140px"
                    name="comment"
                    placeholder="Your message"
                    rows={4}
                  />
                </Col>
                <Col md={6} className="mt-30px sm-mt-20px">
                  <p className="fs-14 lh-22 opacity-7 text-center text-md-start mb-0">
                    We are committed to protecting your privacy. We will never
                    collect information about you.
                  </p>
                </Col>
                <Col
                  md={6}
                  className="text-center text-md-end mt-30px sm-mt-20px"
                >
                  <input type="hidden" name="redirect" value="" />
                  <Button
                    className="btn-large btn-round-edge btn-box-shadow btn-switch-text btn-dark-gray left-icon submit w-100"
                    type="submit"
                  >
                    <span>
                      <span>
                        <i className="feather icon-feather-calendar"></i>
                      </span>
                      <span
                        className="btn-double-text"
                        data-text="Book appointment"
                      >
                        Book appointment
                      </span>
                    </span>
                  </Button>
                </Col>
                <Col xs={12}>
                  <div className="form-results d-none text-center mt-15px ps-15px pe-15px"></div>
                </Col>
              </Row>
            </Form>
            {/* End contact form */}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
// Footer Section
const Footer = () => (
  <footer
    className="barber px-4 footer-light position-relative cover-background"
    style={{
      backgroundImage: `url(https://gfa-tech.com/dimp-template-images/images/demo-barber-home-footer-bg.jpg)`,
    }}
  >
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={10} className="text-center">
          <a
            href="demo-barber.html"
            className="footer-logo position-relative z-index-1 d-inline-block"
          >
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-logo-black.png"
              alt="Barber Logo"
            />
          </a>
          <span className="fs-90 xs-fs-60 alt-font fs-2 text-base-color opacity-4 d-block mt-minus-50px mb-30px ls-minus-4px xs-ls-minus-2px">
            Award winning barber studio
          </span>
          <Col
            xs={12}
            className="text-center elements-social social-icon-style-09 mb-30px"
          >
            <ul className="large-icon light">
              <li>
                <a
                  className="facebook"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="instagram"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  className="twitter"
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </Col>
          <p className="mb-0 fs-16">
            &copy; 2024 Proudly powered by{" "}
            <a
              href="https://www.dimpified.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-line-bottom text-white"
            >
              DIMP
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);
