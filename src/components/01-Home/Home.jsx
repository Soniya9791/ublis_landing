import "./Home.css";
import Testimonials from "./Testimonials";
import { Typewriter } from "react-simple-typewriter";

import { useNavigate } from "react-router-dom";
import yogalogo from "../../assets/home/yogalogo.png";
import therapy from "../../assets/home/therapy.svg";
import { Container, Row, Col, Card } from "react-bootstrap";
import img1 from "../../assets/home/homeImgOne.jpg";
import img2 from "../../assets/home/homeImgTwo.jpg";

import profile from "../../assets/logo/logo.png";

import kids from "../../assets/newYoga/kids.png";
import ladies from "../../assets/newYoga/ladies.png";
import senior from "../../assets/newYoga/senior.png";
import unisex from "../../assets/newYoga/unisex.png";
import pranayamaImg from "../../assets/newYoga/pranayama.png";
import pregnancy from "../../assets/newYoga/pregnancy.png";
import meditation from "../../assets/newClass/meditation.png";

import experience from "../../assets/home/verified.png";
import graduate from "../../assets/home/graduated.png";
import life from "../../assets/home/life.png";

import whyChooseUs from "../../assets/home/whyChooseUs.webp";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  const handleTestimonials = () => {
    navigate("/testimonials");
    window.scrollTo(0, 0);
  };

  const cardData = [
    {
      id: 1,
      url: kids,
      title: "Kids Yoga",
      description:
        "Yoga designed specifically for children to improve flexibility and focus.",
      buttonText: "Join Now",
    },
    {
      id: 2,
      url: ladies,
      title: "Ladies Yoga",
      description: "Strength-building yoga sessions tailored for women.",
      buttonText: "Join Now",
    },
    {
      id: 3,
      url: unisex,
      title: "Unisex Yoga",
      description:
        "A mixed yoga class for all to promote calmness and balance.",
      buttonText: "Join Now",
    },
    {
      id: 4,
      url: senior,
      title: "Senior Citizen Yoga",
      description:
        "Gentle yoga for seniors focusing on relaxation and well-being.",
      buttonText: "Join Now",
    },
    {
      id: 5,
      url: pregnancy,
      title: "Pregnancy Yoga",
      description:
        "Yoga sessions to support the physical and mental health of expecting mothers.",
      buttonText: "Join Now",
    },
    {
      id: 6,
      url: meditation,
      title: "Meditation Sessions",
      description: "Mindfulness and meditation practices to reduce stress.",
      buttonText: "Join Now",
    },
    {
      id: 7,
      url: pranayamaImg,
      title: "Pranayama",
      description: "Breathing exercises that improve energy flow and focus.",
      buttonText: "Join Now",
    },
  ];

  return (
    <div className="homeContainer welcomeContent">

      
      <div className="contentContainer">
        <div className="contentSection ">
          <h1 data-aos="fade-in" data-aos-delay="200">
            UBLIS YOGA{" "}
          </h1>
          <h2 className="introText">
            Where Serenity Meets{" "}
            <span style={{ fontWeight: "bold", color: "#f95005" }}>
              <Typewriter
                words={["Health !", "Happiness !"]}
                loop={0}
                typeSpeed={120}
                deleteSpeed={80}
              />
            </span>
          </h2>
        </div>

        {/* <div className="gridFormTemp w-full">
          <div className="ourStoryCont w-full md:w-6/12 mx-auto">
            <h3>Our Story</h3>
            <p>
              Founded in (year ) , Brands New Outlet was born out of a passion
              for fashion and a desire to bring global styles to Switzerland.
              Starting as a small online store, we’ve grown into a trusted
              platform that serves fashion enthusiasts across the country.{" "}
            </p>
            <p>
              Building on quality, innovation, and customer satisfaction, we
              improve our range and services and keep Brands New Outlet at the
              heart of the Swiss fashion scene.{" "}
            </p>
          </div>
          <div className="ourStoryBg w-full md:w-6/12 mx-auto">
            <h4>Our Story</h4>
          </div>
        </div> */}

        <div className="welcomeUblis">
          <h2>
            Welcome To <br /> Ublis Yoga
          </h2>
          <div className="contents">
            <p className="col-lg-8 col-md-12">
              Welcome to Ublis Yoga, the place that brings together power and
              serenity. Walk through our teaching program, learn with our
              experienced teachers, and get started with your practice for a
              better body and mind wellbeing.{" "}
            </p>
            <p className="col-lg-8 col-md-12">
              Ublis Yoga believes in yoga as a journey of self-transformation.
              That means a step within the opportunity to know one's real
              potential. Our studio is a quiet sanctuary for being more
              receptive toward one's self and nature. It is more than just a
              place to practice yoga.
            </p>
            <p className="col-lg-8 col-md-12">
              With studios in Rajakilpakkam, our methodology is designed to
              encompass every level of experience. Whether you are coming in to
              strengthen, find your flexibility, or take a little time out in
              your busy life, our instructors can get you on the right path.
            </p>
            <p className="col-lg-8 col-md-12">
              Step inside our studio, leave behind all worries at the door and
              get ready for a practice that feeds the body, soul, and spirit.
              Whatever your level is, you will find a safe, friendly community
              and environment to help you grow in your wellness journey.
            </p>
            <p className="col-lg-8 col-md-12">
              Explore, breathe, let go, and uncover the magic within!
            </p>
          </div>
        </div>
      </div>

      <div className="homePageContents">
        <div className="homePageContentYoga">
          <div className="w-[100%]">
            <div className="flex flex-col lg:flex-row justify-center items-center mt-5 mb-5">
              <div
                className="w-[100%] lg:w-[30%]"
                align="center"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <h1
                  align="center"
                  className="text-[40px] font-bold text-[#f95005]"
                >
                  What is Yoga?
                </h1>
                <img
                  className="w-[40%] duration-300 hover:w-[35%] mt-10"
                  src={yogalogo}
                  alt="logo"
                />
              </div>
              <div
                className=" w-[90%] lg:w-[40%] flex justify-center items-center"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <p className="text-[20px] text-[#000000] text-justify font-semibold cardsTest">
                  Yoga is about bringing together the body, mind ,and soul as
                  one. It’s more than just physical exercise—it helps you stay
                  physically fit, mentally clear, and emotionally balanced.
                  Through yoga, you can find a sense of inner peace and overall
                  well-being by connecting all parts of yourself.
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center mt-5 mb-5 pt-10">
              <div
                className="w-[100%] lg:w-[30%]"
                align="center"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <h1
                  align="center"
                  className="text-[40px] font-bold text-[#f95005]"
                >
                  What is Therapy?
                </h1>
                <img
                  className="w-[40%] duration-300 hover:w-[35%] mt-10"
                  src={therapy}
                  alt="logo"
                />
              </div>
              <div className=" w-[90%] lg:w-[40%] flex justify-center items-center">
                <p
                  className="text-[20px] text-[#000000] text-justify font-semibold cardsTest"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  Yoga Therapy is a customized approach to yoga that adapts
                  poses, breathing techniques and meditation to meet your
                  individual needs. It helps restore balance in the body, mind
                  and soul, bringing you back to a state of health and
                  well-being. When everything is in harmony—your body, mind and
                  soul—you experience true health and happiness.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="whoAreWe mt-20 mb-20">
          <section id="whoWeAre" className="whoWeAre section col-lg-8">
            <div className="container section-title" data-aos="fade-up">
              <h3
                className="mb-3 text-[30px] lg:text-[50px] text-[#f95005] font-[700] py-3"
                align="center"
              >
                Who We Are?
              </h3>
            </div>

            <div className="container mt-3">
              <div className="row gy-4 align-items-center whoWeAreItems">
                <div
                  className="col-lg-6 order-2 order-lg-1"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  align="center"
                >
                  <p className="whoWeArePara cardsTest">
                    At Ublis Yoga, we are passionate and dedicated to creating
                    a sanctuary for holistic wellness. Our studio is a place
                    where ancient wisdom meets modern practice, offering a
                    diverse range of yoga classes tailored to meet the needs of
                    every individual.
                  </p>
                  <button
                    className="getStartedBtn mt-5 col-lg-7"
                    type="submit"
                    onClick={handleButtonClick}
                  >
                    Send Message
                  </button>
                </div>
                <div
                  className="col-lg-5 order-1 order-lg-2 d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="imageStack">
                    <img
                      src={img1}
                      alt=""
                      className="stackFront"
                      style={{ border: "10px solid white" }}
                    />
                    <img
                      src={img2}
                      alt=""
                      className="stackBack"
                      style={{ border: "10px solid white" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-[100%] flex justify-center flex-col items-center py-10 bg-[#fff]">
          <div className="container section-title mt-5" data-aos="fade-up">
            <h3
              className="text-[30px] lg:text-[50px] text-[#f95005] font-[700] pb-1"
              align="center"
            >
              Why Choose Us?
            </h3>
          </div>
          <img
            className="w-[80%] lg:w-[65%]"
            src={whyChooseUs}
            data-aos="fade-up"
            data-aos-delay="100"
            alt="whyChooseUs"
          />
        </div>

        <div className="stats">
          <Row>
            <Col lg={3} className="statis">
              <div className="image mt-3">
                <img src={experience} />
              </div>
              <p>12+ Years of Experience</p>
            </Col>
            <Col lg={3} className="statis">
              <div className="image mt-3">
                <img src={graduate} />
              </div>
              <p>5000+ Students Trained</p>
            </Col>
            <Col lg={3} className="statis">
              <div className="image mt-3">
                <img src={life} />
              </div>
              <p>800+ Transformed Lives</p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="ourClassesWeOffered">
        <div className="offeredCont mb-5 pb-5">
          <h3>Our Classes</h3>
          <Container>
            <Row className="gy-4 col-lg-7" style={{ justifyContent: "center" }}>
              {cardData.map((card) => (
                <Col
                  lg={4}
                  md={6}
                  key={card.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "19rem",
                      height: "16rem",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={card.url}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title>{card.title}</Card.Title>
                      <button
                        className="viewContactBtn"
                        onClick={handleButtonClick}
                      >
                        {card.buttonText}
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      <div className="testimonials mt-5 pt-10 pb-10">
        <div className="teamSection">
          <div id="team" className="team section col-lg-8">
            <div className="container section-title" data-aos="fade-up">
              <h2>Our Testimonials</h2>
            </div>

            <div className="container">
              <div className="row gy-4">
                <div
                  className="col-lg-6"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="team-member d-flex align-items-start">
                    <div className="pic">
                      <svg
                        aria-hidden="true"
                        className="absolute z-0 h-16 left-6 top-6"
                        viewBox="0 0 17 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.79187 3.83333C2.66179 3.83333 2.53696 3.85316 2.41271 3.87125C2.45296 3.73591 2.49437 3.59825 2.56087 3.47458C2.62737 3.29491 2.73121 3.13916 2.83446 2.98225C2.92079 2.8125 3.07304 2.69758 3.18504 2.55233C3.30229 2.41116 3.46212 2.31725 3.58871 2.2C3.71296 2.0775 3.87571 2.01625 4.00521 1.92991C4.14054 1.85233 4.25837 1.76658 4.38437 1.72575L4.69879 1.59625L4.97529 1.48133L4.69237 0.35083L4.34412 0.43483C4.23271 0.46283 4.09679 0.495496 3.94221 0.53458C3.78412 0.563746 3.61554 0.643663 3.42771 0.71658C3.24221 0.799413 3.02754 0.855413 2.82804 0.988413C2.62737 1.11558 2.39579 1.22175 2.19162 1.39208C1.99387 1.56766 1.75529 1.71991 1.57912 1.94333C1.38662 2.15216 1.19646 2.3715 1.04887 2.62116C0.877957 2.85916 0.761873 3.1205 0.639373 3.37891C0.52854 3.63733 0.43929 3.90158 0.366373 4.15825C0.228123 4.67275 0.16629 5.16158 0.142373 5.57983C0.12254 5.99866 0.134207 6.34691 0.158707 6.59891C0.167457 6.71791 0.18379 6.83341 0.195457 6.91333L0.21004 7.01133L0.225207 7.00783C0.328959 7.49248 0.567801 7.93786 0.914102 8.29243C1.2604 8.64701 1.70001 8.89631 2.18208 9.01148C2.66415 9.12665 3.16897 9.10299 3.63815 8.94323C4.10733 8.78348 4.52169 8.49416 4.83331 8.10874C5.14493 7.72333 5.34107 7.25757 5.39903 6.76534C5.457 6.27311 5.37443 5.77452 5.16087 5.32726C4.94731 4.88 4.61149 4.50233 4.19225 4.23796C3.77302 3.97358 3.28751 3.8333 2.79187 3.83333V3.83333ZM9.20854 3.83333C9.07846 3.83333 8.95362 3.85316 8.82937 3.87125C8.86962 3.73591 8.91104 3.59825 8.97754 3.47458C9.04404 3.29491 9.14787 3.13916 9.25112 2.98225C9.33746 2.8125 9.48971 2.69758 9.60171 2.55233C9.71896 2.41116 9.87879 2.31725 10.0054 2.2C10.1296 2.0775 10.2924 2.01625 10.4219 1.92991C10.5572 1.85233 10.675 1.76658 10.801 1.72575L11.1155 1.59625L11.392 1.48133L11.109 0.35083L10.7608 0.43483C10.6494 0.46283 10.5135 0.495496 10.3589 0.53458C10.2008 0.563746 10.0322 0.643663 9.84437 0.71658C9.65946 0.799997 9.44421 0.855413 9.24471 0.988997C9.04404 1.11616 8.81246 1.22233 8.60829 1.39266C8.41054 1.56825 8.17196 1.7205 7.99579 1.94333C7.80329 2.15216 7.61312 2.3715 7.46554 2.62116C7.29462 2.85916 7.17854 3.1205 7.05604 3.37891C6.94521 3.63733 6.85596 3.90158 6.78304 4.15825C6.64479 4.67275 6.58296 5.16158 6.55904 5.57983C6.53921 5.99866 6.55087 6.34691 6.57537 6.59891C6.58412 6.71791 6.60046 6.83341 6.61212 6.91333L6.62671 7.01133L6.64187 7.00783C6.74563 7.49248 6.98447 7.93786 7.33077 8.29243C7.67707 8.64701 8.11668 8.89631 8.59875 9.01148C9.08081 9.12665 9.58563 9.10299 10.0548 8.94323C10.524 8.78348 10.9384 8.49416 11.25 8.10874C11.5616 7.72333 11.7577 7.25757 11.8157 6.76534C11.8737 6.27311 11.7911 5.77452 11.5775 5.32726C11.364 4.88 11.0282 4.50233 10.6089 4.23796C10.1897 3.97358 9.70417 3.8333 9.20854 3.83333V3.83333Z"
                          className="fill-[#fff8ea]"
                        />
                      </svg>
                      <img
                        src={profile}
                        style={{
                          height: "100px",
                          width: "100px",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: "1000",
                          position: "relative",
                          marginTop: "30px",
                          marginLeft: "30px",
                        }}
                      />
                    </div>
                    <div className="member-info">
                      <h4>Ramya Subramanian</h4>
                      <span>2 Weeks ago </span>
                      <p>
                        Ublis Centre is a place where I find peace and growth.
                        Deepika Mam is an exceptional yoga teacher, mentor, and
                        guide...{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="team-member d-flex align-items-start">
                    <div className="pic">
                      <svg
                        aria-hidden="true"
                        className="absolute z-0 h-16 left-6 top-6"
                        viewBox="0 0 17 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.79187 3.83333C2.66179 3.83333 2.53696 3.85316 2.41271 3.87125C2.45296 3.73591 2.49437 3.59825 2.56087 3.47458C2.62737 3.29491 2.73121 3.13916 2.83446 2.98225C2.92079 2.8125 3.07304 2.69758 3.18504 2.55233C3.30229 2.41116 3.46212 2.31725 3.58871 2.2C3.71296 2.0775 3.87571 2.01625 4.00521 1.92991C4.14054 1.85233 4.25837 1.76658 4.38437 1.72575L4.69879 1.59625L4.97529 1.48133L4.69237 0.35083L4.34412 0.43483C4.23271 0.46283 4.09679 0.495496 3.94221 0.53458C3.78412 0.563746 3.61554 0.643663 3.42771 0.71658C3.24221 0.799413 3.02754 0.855413 2.82804 0.988413C2.62737 1.11558 2.39579 1.22175 2.19162 1.39208C1.99387 1.56766 1.75529 1.71991 1.57912 1.94333C1.38662 2.15216 1.19646 2.3715 1.04887 2.62116C0.877957 2.85916 0.761873 3.1205 0.639373 3.37891C0.52854 3.63733 0.43929 3.90158 0.366373 4.15825C0.228123 4.67275 0.16629 5.16158 0.142373 5.57983C0.12254 5.99866 0.134207 6.34691 0.158707 6.59891C0.167457 6.71791 0.18379 6.83341 0.195457 6.91333L0.21004 7.01133L0.225207 7.00783C0.328959 7.49248 0.567801 7.93786 0.914102 8.29243C1.2604 8.64701 1.70001 8.89631 2.18208 9.01148C2.66415 9.12665 3.16897 9.10299 3.63815 8.94323C4.10733 8.78348 4.52169 8.49416 4.83331 8.10874C5.14493 7.72333 5.34107 7.25757 5.39903 6.76534C5.457 6.27311 5.37443 5.77452 5.16087 5.32726C4.94731 4.88 4.61149 4.50233 4.19225 4.23796C3.77302 3.97358 3.28751 3.8333 2.79187 3.83333V3.83333ZM9.20854 3.83333C9.07846 3.83333 8.95362 3.85316 8.82937 3.87125C8.86962 3.73591 8.91104 3.59825 8.97754 3.47458C9.04404 3.29491 9.14787 3.13916 9.25112 2.98225C9.33746 2.8125 9.48971 2.69758 9.60171 2.55233C9.71896 2.41116 9.87879 2.31725 10.0054 2.2C10.1296 2.0775 10.2924 2.01625 10.4219 1.92991C10.5572 1.85233 10.675 1.76658 10.801 1.72575L11.1155 1.59625L11.392 1.48133L11.109 0.35083L10.7608 0.43483C10.6494 0.46283 10.5135 0.495496 10.3589 0.53458C10.2008 0.563746 10.0322 0.643663 9.84437 0.71658C9.65946 0.799997 9.44421 0.855413 9.24471 0.988997C9.04404 1.11616 8.81246 1.22233 8.60829 1.39266C8.41054 1.56825 8.17196 1.7205 7.99579 1.94333C7.80329 2.15216 7.61312 2.3715 7.46554 2.62116C7.29462 2.85916 7.17854 3.1205 7.05604 3.37891C6.94521 3.63733 6.85596 3.90158 6.78304 4.15825C6.64479 4.67275 6.58296 5.16158 6.55904 5.57983C6.53921 5.99866 6.55087 6.34691 6.57537 6.59891C6.58412 6.71791 6.60046 6.83341 6.61212 6.91333L6.62671 7.01133L6.64187 7.00783C6.74563 7.49248 6.98447 7.93786 7.33077 8.29243C7.67707 8.64701 8.11668 8.89631 8.59875 9.01148C9.08081 9.12665 9.58563 9.10299 10.0548 8.94323C10.524 8.78348 10.9384 8.49416 11.25 8.10874C11.5616 7.72333 11.7577 7.25757 11.8157 6.76534C11.8737 6.27311 11.7911 5.77452 11.5775 5.32726C11.364 4.88 11.0282 4.50233 10.6089 4.23796C10.1897 3.97358 9.70417 3.8333 9.20854 3.83333V3.83333Z"
                          className="fill-[#fff8ea]"
                        />
                      </svg>
                      <img
                        src={profile}
                        style={{
                          height: "100px",
                          width: "100px",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: "1000",
                          position: "relative",
                          marginTop: "30px",
                          marginLeft: "30px",
                        }}
                      />
                    </div>
                    <div className="member-info">
                      <h4>Subhashini Subramanian</h4>
                      <span>2 Weeks ago </span>
                      <p>
                        Been practicing yoga under Deepika Mam's guidance. She
                        teaches very well and provides attention to each
                        individual
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleTestimonials}
            className="testimonialsView container"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}
