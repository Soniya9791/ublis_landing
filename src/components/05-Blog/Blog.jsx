import "./Blog.css";
import blogImg1 from "../../assets/eventOne/img1.jpeg";
import blogImg2 from "../../assets/eventTwo/image1.jpeg";
import logo from "../../assets/logo/logo.png";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 asanas to make you feed good in day to day life",
      category: "Benefits of Yoga",
      image: blogImg1,
      author: "Ublis Yoga",
      date: "Jan 1, 2022",
      link: "blog-details.html",
    },
    {
      id: 2,
      title: "Benefits of Surya Namakskaram",
      category: "Surya Namaskaram",
      image: blogImg2,
      author: "Ublis Yoga",
      date: "Jun 5, 2022",
      link: "blog-details.html",
    },
    {
      id: 3,
      title: "Beach Yoga Title",
      category: "Beach Yoga",
      image: blogImg2,
      author: "Ublis Yoga",
      date: "Jun 5, 2022",
      link: "blog-details.html",
    },
  ];

  return (
    <div className="blogContents">
      <div id="blog-posts" className="blog-posts section">
        <div className="container">
          <div className="row gy-4" style={{ justifyContent: "space-evenly" }}>
            {blogPosts.map((post) => (
              <div className="col-lg-3" key={post.id}>
                <article>
                  <div className="post-img">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid"
                    />
                  </div>

                  <p className="post-category">{post.category}</p>

                  <h2 className="title">
                    <a href={post.link}>{post.title}</a>
                  </h2>

                  <div className="d-flex align-items-center">
                    <img
                      src={logo}
                      alt="author"
                      className="img-fluid post-author-img flex-shrink-0"
                    />
                    <div className="post-meta">
                      <p className="post-author">{post.author}</p>
                      <p className="post-date">
                        <time dateTime={new Date(post.date).toISOString()}>
                          {post.date}
                        </time>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
