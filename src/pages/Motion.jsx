import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router';

const slides = [
  {
    title: 'Empower Through Education',
    description:
      'Write, share, and learn with a community that values knowledge. Start your journey today!',
    button: 'Explore Articles',
    link: '/allArticle',
    backgroundLayers: [
      'https://images.unsplash.com/photo-1584697964403-c180f49b2733?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=50',
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=50',
    ],
  },
  {
    title: 'Teach What You Love',
    description:
      'Share your passion and help others grow by writing meaningful articles and guides.',
    button: 'Explore Articles',
    link: '/allArticle',
    backgroundLayers: [
      'https://images.unsplash.com/photo-1603575449156-de664c6a28c4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=50',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=50',
    ],
  },
  {
    title: 'Learn. Share. Grow.',
    description:
      'Be part of EduHive and connect with thousands of learners and educators.',
    button: 'Explore Articles',
    link: '/allArticle',
    backgroundLayers: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=50',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=50',
    ],
  },
];

const Motion = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, 
    arrows: false,
  };

  return (
    <section className="py-6">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative h-[350px] md:h-[350px] flex items-center justify-center overflow-hidden">

              {/* Background Layers */}
              {slide.backgroundLayers.map((layerUrl, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                    i === 0 ? 'opacity-100 z-10' : 'opacity-30 z-0'
                  }`}
                  style={{
                    backgroundImage: `url(${layerUrl})`,
                    filter: i > 0 ? 'blur(10px) brightness(0.8)' : 'none',
                    transform: i > 0 ? `scale(${1 + i * 0.05})` : 'none',
                  }}
                />
              ))}

              {/* Content */}
              <div
                className="relative z-20 text-center max-w-3xl px-4"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-indigo-800 mb-4 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-gray-700 text-lg md:text-xl mb-6 drop-shadow-sm">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  {slide.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Motion;
