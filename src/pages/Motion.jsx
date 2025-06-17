import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router';

// --- Slide Data ---
// Using descriptive names for clarity and consistency.
const CAROUSEL_SLIDES = [
  {
    id: 1, // Added unique ID for better keying in lists
    title: 'Empower Through Education',
    tagline: 'Write, share, and learn with a community that values knowledge. Start your journey today!',
    buttonLabel: 'Explore Articles',
    destination: '/allArticle',
    backgroundImages: [
      'https://images.unsplash.com/photo-1584697964403-c180f49b2733?auto=format&fit=crop&w=1600&q=80', // Main background
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=50', // Layer 1
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=50', // Layer 2
    ],
    overlayColor: 'from-indigo-900/60 to-purple-800/60', // Tailwind gradient classes
  },
  {
    id: 2,
    title: 'Teach What You Love',
    tagline: 'Share your passion and help others grow by writing meaningful articles and guides.',
    buttonLabel: 'Contribute Now', // Changed button text for variety
    destination: '/createArticle', // Assuming a different link for teaching
    backgroundImages: [
      'https://images.unsplash.com/photo-1603575449156-de664c6a28c4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=50',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=50',
    ],
    overlayColor: 'from-teal-800/60 to-blue-800/60',
  },
  {
    id: 3,
    title: 'Learn. Share. Grow.',
    tagline: 'Be part of EduHive and connect with thousands of learners and educators.',
    buttonLabel: 'Join Our Community', // Changed button text for variety
    destination: '/aboutUs', // Assuming a different link for joining
    backgroundImages: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=50',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=50',
    ],
    overlayColor: 'from-orange-800/60 to-red-800/60',
  },
];

// --- Framer Motion Animation Variants ---
const contentAnimationVariants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- Main Carousel Component ---
const Motion = () => {
  // Slick Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800, // Slightly slower transition for more cinematic feel
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Slightly longer autoplay speed
    arrows: false,
    fade: true, // Added fade effect for smoother background transitions
    cssEase: 'ease-in-out', // Ensure smooth CSS transitions
  };

  return (
    <section className="py-6 overflow-hidden rounded-lg shadow-xl relative" aria-label="Educational Content Carousel">
      <Slider {...sliderSettings}>
        {CAROUSEL_SLIDES.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div className="relative flex items-center justify-center h-[350px] md:h-[400px] lg:h-[500px] text-white">
              {/* Background Layers with Enhanced Parallax */}
              {slide.backgroundImages.map((imageUrl, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform`}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    // Deeper blur and brightness for background layers
                    filter: i > 0 ? `blur(${5 + i * 5}px) brightness(${0.7 - i * 0.1})` : 'none',
                    // More pronounced scale for subtle parallax on secondary layers
                    transform: i > 0 ? `scale(${1 + i * 0.02}) translateZ(0)` : 'scale(1) translateZ(0)',
                    // Optimize for hardware acceleration
                    willChange: 'transform, filter',
                  }}
                  aria-hidden="true" // Hide from screen readers as it's decorative
                />
              ))}

              {/* Gradient Overlay for better text readability */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor} z-10`}
                aria-hidden="true"
              ></div>

              {/* Content Overlay with Framer Motion Animation */}
              <motion.div
                className="relative z-20 text-center max-w-3xl px-4 flex flex-col items-center justify-center"
                variants={contentAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.h2
                  className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight" // Stronger shadow, better line height
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl mb-8 drop-shadow-md max-w-prose" // Added max-w-prose for better line length
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.tagline}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link
                    to={slide.destination}
                    className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                    aria-label={`Go to ${slide.buttonLabel} section`} // Added ARIA label
                  >
                    {slide.buttonLabel}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Motion;