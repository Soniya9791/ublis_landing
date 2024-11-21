import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "", // Changed to firstName for clarity
    lastName: "", // Added a lastName field for completeness
    email: "",
    mobile: "", // Added mobile field to match with handleSubmit
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, mobile, message } = formData;

    const whatsappNumber = "919940063000";
    const whatsappMessage = encodeURIComponent(`
    Hi, I am ${firstName} ${lastName}.

    ${message}

    Regards,
    ${firstName} ${lastName}
    Mobile: ${mobile}
    Email: ${email}
  `);

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <div className="contactUs" style={{ background: "#f9f3eb" }}>
        <div id="contact" className="contact mt-5 section">
          <div className="contactFormContainer col-lg-7 mt-5 p-3">
            <h4>Get in touch</h4>
            <p className="contactQuote mt-4 mb-5">
              We would love to hear from you! Whether you have questions about
              our classes, need help registering, or would like information
              about any of our special programs. In any case, we're here to
              help!
            </p>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-5">
                <iframe
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "7px",
                  }}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7777.794127964202!2d80.154533!3d12.914337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6de2acd781%3A0x1e56c9f3ddf024dc!2sUBLIS%20YOGA!5e0!3m2!1sen!2sin!4v1727763696778!5m2!1sen!2sin"
                  frameBorder="0"
                  allowFullScreen=""
                ></iframe>
              </div>

              <div className="row gy-4">
                <div className="col-md-12">
                  <div
                    className="contactInfoItem d-flex align-items-start"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="icon bi bi-geo-alt flex-shrink-0"></i>
                    <div className="contactInfoCont">
                      <h3>Address</h3>
                      <p>
                        #28 Second Floor, Madambakkam Main Road, Gandhi Nagar,
                        Rajakilpakkam,
                      </p>
                      <p>Opposite to Gate 2 Jain Sudharsana Apartments,</p>
                      <p>Chennai, Tamil Nadu - 600073.</p>{" "}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className="contactInfoItem d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i className="icon bi bi-envelope flex-shrink-0"></i>
                    <div className="contactInfoCont">
                      <h3>Email</h3>
                      <p>ublisyoga@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className="contactInfoItem d-flex align-items-center"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <i className="icon bi bi-phone flex-shrink-0"></i>
                    <div className="contactInfoCont">
                      <h3>Mobile (6 am - 8 pm)</h3>
                      <p>+91 9940063000 / 044-43368237</p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="contactEmailForm"
                data-aos="fade-up"
                data-aos-delay="600"
                onSubmit={handleSubmit}
              >
                <div className="row gy-4">
                  <h4>Reach Us on Whatsapp</h4>
                  <p>We'll Reach You Shortly!</p>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Your First Name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Your Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      placeholder="Your Mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
