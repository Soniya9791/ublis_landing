import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Modal } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const [showMap, setShowMap] = useState(false);

  const handleShow = () => setShowMap(true);
  const handleClose = () => setShowMap(false);

  return (
    <div>
      <footer className="bg-dark text-white">
        <div className="pt-16 pb-12 border-top border-slate-900 footerBg">
          <Container
            className="col-lg-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Row style={{ justifyContent: "space-between", width: "90%" }}>
              <Col md={4} lg={4} className="mb-4">
                <h3 className="text-white text-xl mb-3">Ublis Yoga Studio </h3>
                <Nav className="flex-column">
                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={handleShow}
                  >
                    <p>#28 Second Floor,</p>
                    <p>Madambakkam Main Road ,</p>
                    <p>Gandhi Nagar, Rajakilpakkam,</p>
                    <p>Opposite to Gate 2 Jain Sudharsana Apartments,</p>
                    <p>Chennai, Tamil Nadu - 600073.</p>
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md={4} lg={2} className="mb-4">
                <h3 className="text-white text-xl mb-3">Quick Links </h3>
                <Nav className="flex-column">
                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/")}
                  >
                    Home{" "}
                  </Nav.Link>
                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/about")}
                  >
                    About{" "}
                  </Nav.Link>

                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/class")}
                  >
                    Class{" "}
                  </Nav.Link>
                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/gallery")}
                  >
                    Gallery{" "}
                  </Nav.Link>
                  {/* <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/blog")}
                  >
                    Blog{" "}
                  </Nav.Link> */}
                  <Nav.Link
                    className="text-lg text-white hover:text-yellow-500"
                    onClick={() => handleNavigate("/contact")}
                  >
                    Contact Us{" "}
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md={4} lg={4} className="mb-4">
                <h3 className="text-white text-xl mb-3">Location</h3>
                <Nav className="flex-column">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7777.794127964202!2d80.154533!3d12.914337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6de2acd781%3A0x1e56c9f3ddf024dc!2sUBLIS%20YOGA!5e0!3m2!1sen!2sin!4v1727763696778!5m2!1sen!2sin"
                    height="250"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Nav>
              </Col>
              {/* <Col md={4} lg={3} className="mb-4">
                <h3 className="text-white text-xl mb-3">Follow Us </h3>
                <Nav className="flex-column">
                  <Nav.Link className="text-lg text-white hover:text-yellow-500">
                    {"contactUs.timeOne"}
                  </Nav.Link>
                  <Nav.Link className="text-lg text-white hover:text-yellow-500">
                    {"contactUs.timeTwo"}
                  </Nav.Link>
                  <Nav.Link className="text-lg text-white hover:text-yellow-500">
                    {"contactUs.timeThree"}
                  </Nav.Link>
                </Nav>
              </Col> */}
            </Row>
          </Container>
        </div>
        <div className="py-4 bg-black-700 border-top border-slate-900">
          <Container>
            <Row className="align-items-center">
              <Col
                md={12}
                lg={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                © 2024 Ublis Yoga. All rights reserved.{" "}
              </Col>

              <Col md={12} lg={6}>
                <Nav className="mt-3" style={{ justifyContent: "center" }}>
                  <Nav.Link
                    href="https://www.instagram.com/ublis_yoga/"
                    target="_blank"
                    className="text-white"
                  >
                    <FaInstagram fontSize={20} />
                  </Nav.Link>
                  <Nav.Link
                    className="text-white"
                    href="https://www.facebook.com/ublis%20yoga"
                    target="_blank"
                  >
                    <FaFacebook fontSize={20} />
                  </Nav.Link>

                  <Nav.Link
                    className="text-white"
                    href="https://wa.me/919940063000"
                    target="_blank"
                  >
                    <FaWhatsapp fontSize={20} />
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>

      <Modal
        show={showMap}
        onHide={handleClose}
        centered
        size="lg" // Modal size
      >
        <Modal.Header closeButton>
          <Modal.Title>Location Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Google Map iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7777.794127964202!2d80.154533!3d12.914337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6de2acd781%3A0x1e56c9f3ddf024dc!2sUBLIS%20YOGA!5e0!3m2!1sen!2sin!4v1727763696778!5m2!1sen!2sin"
            height="400"
            width="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Modal.Body>
      </Modal>
    </div>
  );
}
