import { motion } from 'framer-motion';

const slides = [
  {
    title: 'Share Your Knowledge',
    description:
      'Inspire thousands by publishing insightful articles and tutorials on EduHive.',
    button: 'Explore Articles',
    link: '/articles',
    backgroundImage:
      'https://images.unsplash.com/photo-1581090700227-1e8d49cdd657?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Empower With Education',
    description:
      'Create content that helps others grow. Your voice matters here at EduHive.',
    button: 'Write Now',
    link: '/articles',
    backgroundImage:
      'https://images.unsplash.com/photo-1584697964403-c180f49b2733?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Connect Through Learning',
    description:
      'Be part of a community where learning and teaching go hand in hand.',
    button: 'Join the Community',
    link: '/articles',
    backgroundImage:
      'https://images.unsplash.com/photo-1603575449156-de664c6a28c4?auto=format&fit=crop&w=1600&q=80',
  },
];

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router';

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.75)), url(${slide.backgroundImage})`,
              }}
            >
              <motion.div
                className="text-center max-w-3xl px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-indigo-800 mb-4">
                  {slide.title}
                </h2>
                <p className="text-gray-700 text-lg md:text-xl mb-6">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
                >
                  {slide.button}
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
