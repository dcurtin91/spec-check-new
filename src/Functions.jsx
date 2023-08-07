import React, { useState } from "react";
import Upload from "./Upload";
import { ShareScreen } from "./Sharescreen";
import { Navbar, Offcanvas } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

export default function Functions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div>
        <Navbar
          className="text-light justify-content-center"
          bg="dark"
          variant="dark"
        >
          <div className="demo" onClick={handleShow}>
            Demo Video
          </div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Body>
                <iframe
                  width="320"
                  height="245"
                  src="https://www.youtube.com/embed/E2zzcTR_BpY"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Offcanvas.Body>
            </Offcanvas.Header>
          </Offcanvas>

          <div>Analyze Audio With a Spectrogram</div>
        </Navbar>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Row>
          <Col
            style={{
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="upload">
              <Upload />
            </div>
          </Col>
          <Col
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginLeft: "50px",
            }}
          >
            <div className="initialize">
              <ShareScreen />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
