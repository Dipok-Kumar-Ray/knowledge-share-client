import React, { useState } from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaGlobe } from "react-icons/fa";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 300);
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  return (
    <section className=" py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-800 mb-2">
            About eduHive
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            At eduHive, we are dedicated to delivering high-quality education,
            connecting learners globally, and empowering them with practical
            skills for the future.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className=" shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <FaGraduationCap size={40} className="text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">10,000+ Learners</h3>
            <p className="text-gray-500 text-sm">
              A growing community of learners across the globe transforming
              their skills with us.
            </p>
          </div>

          <div className=" shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <FaChalkboardTeacher
              size={40}
              className="text-blue-600 mx-auto mb-3"
            />
            <h3 className="text-xl font-semibold mb-2">100+ Expert Mentors</h3>
            <p className="text-gray-500 text-sm">
              Our mentors are industry professionals passionate about teaching
              and guiding.
            </p>
          </div>

          <div className=" shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <FaGlobe size={40} className="text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
            <p className="text-gray-500 text-sm">
              Connecting students from different countries to create a global
              learning network.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-12  p-6 rounded-lg text-center">
          <h4 className="text-2xl font-bold mb-2">Our Mission</h4>
          <p className="max-w-2xl mx-auto text-sm">
            To make quality education accessible, affordable, and practical so
            that anyone, anywhere can achieve their learning goals and build a
            brighter future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
