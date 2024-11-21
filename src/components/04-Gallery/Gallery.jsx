import { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import "./Gallery.css";

import app1 from "../../assets/gallery/kidsOne.jpeg";
import app2 from "../../assets/gallery/kidsTwo.jpg";
import app3 from "../../assets/gallery/kidsThree.jpg";

import beachYogaOne from "../../assets/eventTwo/image1.jpeg";
import beachYogaTwo from "../../assets/eventTwo/image2.jpeg";
import beachYogaThree from "../../assets/eventTwo/image3.jpeg";
import beachYogaFour from "../../assets/eventTwo/image4.jpeg";
import beachYogaFive from "../../assets/eventTwo/image5.jpeg";
import beachYogaSix from "../../assets/eventTwo/image6.jpeg";
import beachYogaSeven from "../../assets/eventTwo/imgae7.jpeg";
import video from "../../assets/eventTwo/video.mp4";

import jawadhuHillsOne from "../../assets/eventOne/img1.jpeg";
import jawadhuHillsTwo from "../../assets/eventOne/img2.jpeg";
import jawadhuHillsThree from "../../assets/eventOne/img3.jpeg";
import jawadhuHillsFour from "../../assets/eventOne/img4.jpeg";
import jawadhuHillsFive from "../../assets/eventOne/img5.jpeg";
import jawadhuHillsSix from "../../assets/eventOne/img6.jpeg";
import jawadhuHillsSeven from "../../assets/eventOne/img7.jpeg";
import jawadhuHillsEight from "../../assets/eventOne/img8.jpeg";
import jawadhuHillsNine from "../../assets/eventOne/img9.jpeg";
import jawadhuHillsTen from "../../assets/eventOne/img10.jpeg";
// import jawadhuHillsEleven from "../../assets/eventOne/img11.jpeg";
import jawadhuHillsTwelve from "../../assets/eventOne/img12.jpeg";

// import product1 from "../../assets/gallery/product-1.jpg";
// import product2 from "../../assets/gallery/product-2.jpg";
// import product3 from "../../assets/gallery/product-3.jpg";
import { Modal } from "react-bootstrap";

export default function Gallery() {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ src: "", title: "" });

  const handleClose = () => setShow(false);
  const handleShow = (src, title) => {
    setModalContent({ src, title });
    setShow(true);
  };

  useEffect(() => {
    const isotopeItems = document.querySelectorAll(".isotope-layout");

    isotopeItems.forEach((isotopeItem) => {
      const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
      const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
      const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

      let initIsotope;
      imagesLoaded(
        isotopeItem.querySelector(".isotope-container"),
        function () {
          initIsotope = new Isotope(
            isotopeItem.querySelector(".isotope-container"),
            {
              itemSelector: ".isotope-item",
              layoutMode: layout,
              filter: filter,
              sortBy: sort,
            }
          );
        }
      );

      const filters = isotopeItem.querySelectorAll(
        ".gallerySection-filters li"
      );
      filters.forEach((filterItem) => {
        filterItem.addEventListener("click", function () {
          filters.forEach((el) => el.classList.remove("filter-active"));
          this.classList.add("filter-active");

          const filterValue = this.getAttribute("data-filter");
          initIsotope.arrange({ filter: filterValue });
        });
      });
    });
  }, []);

  return (
    <div>
      <div
        id="gallerySection"
        className="gallerySection section"
        style={{ paddingBottom: "450px", background: "#f9f3eb" }}
      >
        <div className="container introSec">
          <h2>Our Space</h2>
          <p>
            Welcome to our serene and beautiful space. Our gallery showcases the
            tranquil environment and the positive energy that surrounds our yoga
            studio. Feel free to take a virtual tour and explore the calming
            ambiance that awaits you at our site.
          </p>
        </div>
        <h4>Surrounds our yoga studio and events</h4>

        <div className="container galleryIsotopeContainer ms-5 me-5">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <ul className="gallerySection-filters isotope-filters">
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-branding">Beach Yoga</li>
              <li data-filter=".filter-books">Jawadhu Hills</li>
              <li data-filter=".videos">Videos</li>
            </ul>

            <div className="row gy-4 isotope-container">
              {[
                {
                  src: beachYogaFour,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsSeven,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: app1,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: beachYogaFive,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsTwo,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsEight,
                  title: "Jawadhu Hills - Exercise",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: beachYogaOne,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsOne,
                  title: "Jawadhu Hills - Trekking",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: app2,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: beachYogaSix,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsNine,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsThree,
                  title: "Jawadhu Hills - Group Photo",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                // {
                //   src: product2,
                //   title: "Adult 2",
                //   filter: "filter-product",
                //   subHeading: "Lorem text",
                // },
                {
                  src: beachYogaTwo,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                // {
                //   src: jawadhuHillsTen,
                //   title: "Jawadhu Hills - Yoga",
                //   filter: "filter-books",
                //   subHeading: "Lorem text",
                //   type: "image",
                // },
                {
                  src: beachYogaSeven,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                // {
                //   src: jawadhuHillsEleven,
                //   title: "Jawadhu Hills - Yoga",
                //   filter: "filter-books",
                //   subHeading: "Lorem text",
                //   type: "image",
                // },
                {
                  src: jawadhuHillsFour,
                  title: "Jawadhu Hills - Explore Nature",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: app3,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsFive,
                  title: "Jawadhu Hills - Trekking",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsTwelve,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                // {
                //   src: product3,
                //   title: "Adult 3",
                //   filter: "filter-product",
                //   subHeading: "Lorem text",
                // },
                {
                  src: beachYogaThree,
                  title: "Beach Yoga",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: jawadhuHillsSix,
                  title: "Jawadhu Hills - Meditation",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                  type: "image",
                },
                {
                  src: video,
                  title: "Beach Yoga",
                  filter: "videos",
                  subHeading: "Lorem text",
                  type: "video",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`col-lg-4 col-md-6 gallerySection-item isotope-item ${item.filter}`}
                >
                  {item.type === "video" ? (
                    <video
                      className="img-fluid"
                      src={item.src}
                      alt={item.title}
                      controls
                      muted
                      autoPlay
                      loop
                      style={{ borderRadius: "8px", blockSize: "100%" }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      className="img-fluid"
                      alt={item.title}
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                  <div className="gallerySection-info">
                    <h4>{item.title}</h4>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShow(item.src, item.title);
                      }}
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent.src.includes("video") ? (
            <video controls className="img-fluid">
              <source src={modalContent.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={modalContent.src}
              alt={modalContent.title}
              className="img-fluid"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
