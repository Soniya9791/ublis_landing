import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import PropTypes from "prop-types";
import instructor from "../../assets/about/deepika.png";

import { Row, Col } from "react-bootstrap";

import ourJourney from "../../assets/about/aboutUs.png";
import mission from "../../assets/about/missions.png";

import profile from "../../assets/logo/logo.png";

import "./About.css";

// import mens from "../../assets/about/mens.png";
// import modern from "../../assets/about/modern.png";

import deepika from "../../assets/about/deepika.png";

export default function About() {
  return (
    <div className="bg-white" style={{ paddingTop: "120px" }}>
      <TextParallaxContent
        imgUrl={ourJourney}
        subheading="About"
        heading="Our Journey."
      >
        <ExampleContent
          title="Journey..."
          description="Started in 2012, focusing more on women and children’s well-being, then later shifted to the focus of the Therapy."
          buttonText="Our journey began with the vision that - to lead a healthy life, one does not only need to understand the ancient art of yoga but also incorporate it into modern lifestyle. A kin respect for the teachings of yoga is what weighs heavily on us. "
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl={mission}
        subheading=""
        heading="Our Mission."
      >
        <ExampleContent
          title="Enhancement of Body, mind and soul "
          description="Practicing yoga is our mission to help each and every participant who is with us to attain general well-being and eternal tranquility. "
          buttonText=""
        />
      </TextParallaxContent>

      <div className="instructorContents">
        <Row className="aboutUsTeam text-center">
          <Col md={12} className="mb-5">
            <h4>Our Team</h4>
            <p>
              <span>The Master of Mindful Movement!</span>
            </p>
          </Col>

          <img src={instructor} className="mt-1 mb-2 instructorImg" alt="" />
          <br />
          <h5 className="instructorName">Mrs. Deepika</h5>
          <p className="instructorRole">Founder & Lead Yoga Therapist</p>
          <div className="d-flex flex-column col-lg-6 justify-content-center order-2 order-lg-2">
            <div className="aboutInstructor text-justify">
              <div className="deepika-intro">
                <p className="mt-4">
                  Introducing{" "}
                  <strong style={{ color: "#f95005" }}>Mrs. Deepika</strong>,
                  who is all knowledge in the area of yoga. Deepika began
                  practicing yoga from{" "}
                  <strong style={{ color: "#f95005" }}>8 years of age</strong>,
                  igniting her desire to fully understand the art. She practiced
                  Yoga even more to incorporate it into her professional life as
                  a<strong style={{ color: "#f95005" }}> therapist</strong>.
                </p>

                <p>
                  Deepika holds a
                  <strong style={{ color: "#000000" }}>
                    {" "}
                    Master of Science degree
                  </strong>{" "}
                  in both
                  <strong style={{ color: "#f95005" }}>
                    &nbsp;Yoga and Yoga Therapy,&nbsp;
                  </strong>
                  and every className she takes is filled with in-depth
                  understanding and practical know-how. She is a certified
                  Independent
                  <strong style={{ color: "#f95005" }}>
                    &nbsp; Pre & Postnatal Yoga Teacher
                  </strong>{" "}
                  who takes care of expectant mothers and mothers with newborns
                  from both physical and psychological angles, aiding their
                  recovery and rehabilitation.
                </p>

                {/* <h3 className="yogaHead mb-3">Yoga Therapy trainings</h3> */}
                <p>
                  A&nbsp;
                  <strong style={{ color: "#000000" }}>
                    Post Graduate Diploma
                  </strong>{" "}
                  in
                  <strong style={{ color: "#f95005" }}>
                    &nbsp;Yoga Philosophy and Psychology,&nbsp;
                  </strong>
                  and a
                  <strong style={{ color: "#f95005" }}>
                    {" "}
                    Fitness and Nutrition &nbsp;
                  </strong>
                  <strong style={{ color: "#000000" }}>
                    Advanced Diploma &nbsp;
                  </strong>
                  add to her impressive repertoire, by which she is able to take
                  care of all aspects of one’s wellness—body, mind, and
                  spirit—in a very balanced manner.
                </p>

                <p>
                  With Deepika as your guide, you’ll be in expert hands, gently
                  led toward a path of mindfulness, balance, and transformation.
                  Make use of her guidance to find, restore, and transform
                  yourself .
                </p>
              </div>
            </div>
          </div>
        </Row>{" "}
      </div>
      <div className="teamSection" style={{ height: "60vh" }}>
        <div id="team" className="team section col-lg-8">
          <div className="container section-title" data-aos="fade-up">
            <h2>Team Members</h2>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img src={profile} className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <h4>Instructor Name</h4>
                    <span>Instructor </span>
                    <p>Instructor Description</p>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        {" "}
                        <i className="bi bi-linkedin"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img src={profile} className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <h4>Instructor Name</h4>
                    <span>Instructor </span>
                    <p>Instructor Description</p>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        {" "}
                        <i className="bi bi-linkedin"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[90vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

TextParallaxContent.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(90vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

StickyImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        top: "-35px !important",
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p
        className="text-center text-4xl font-bold md:text-7xl textBorder"
        style={{ color: "#f95005" }}
      >
        {heading}
      </p>
    </motion.div>
  );
};

OverlayCopy.propTypes = {
  subheading: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

const ExampleContent = ({ title, description, buttonText }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pt-2 pb-2 md:grid-cols-12">
    <h2
      className="col-span-1 text-3xl font-bold md:col-span-4"
      style={{ color: "#f95005" }}
    >
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p
        className="mb-4 text-xl text-neutral-600 md:text-2xl"
        style={{ marginTop: "-50px" }}
      >
        {description}
      </p>
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{buttonText}</p>
    </div>
  </div>
);

ExampleContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
