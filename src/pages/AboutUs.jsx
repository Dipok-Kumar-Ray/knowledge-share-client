import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FaGraduationCap, FaChalkboardTeacher, FaGlobe } from "react-icons/fa";
import CountUp from "react-countup";

const AboutUs = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 dark:bg-gray-900">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-base-100 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-300 mb-3 drop-shadow-md">
            About <span className="text-cyan-600 dark:text-cyan-400">eduHive</span>
          </h2>
          <p className="text-indigo-700 dark:text-indigo-200 max-w-3xl mx-auto text-lg">
            At eduHive, we are dedicated to delivering high-quality education,
            connecting learners globally, and empowering them with practical
            skills for the future.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Learners */}
          <div className="shadow-lg p-8 rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-3 bg-white dark:bg-gray-800">
            <FaGraduationCap
              size={48}
              className="text-cyan-600 dark:text-cyan-400 mx-auto mb-5 animate-bounce"
            />
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">
              <CountUp end={10000} duration={3} separator="," />+
            </h3>
            <p className="text-indigo-600 dark:text-indigo-300 mt-2 text-xl font-medium">Learners</p>
            <p className="text-indigo-500 dark:text-indigo-400 text-sm mt-4">
              A growing community of learners across the globe transforming
              their skills with us.
            </p>
          </div>

          {/* Mentors */}
          <div className="shadow-lg p-8 rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-3 bg-white dark:bg-gray-800">
            <FaChalkboardTeacher
              size={48}
              className="text-cyan-600 dark:text-cyan-400 mx-auto mb-5 animate-bounce"
            />
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">
              <CountUp end={100} duration={3} />+
            </h3>
            <p className="text-indigo-600 dark:text-indigo-300 mt-2 text-xl font-medium">Expert Mentors</p>
            <p className="text-indigo-500 dark:text-indigo-400 text-sm mt-4">
              Our mentors are industry professionals passionate about teaching
              and guiding.
            </p>
          </div>

          {/* Global Impact */}
          <div className="shadow-lg p-8 rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-3 bg-white dark:bg-gray-800">
            <FaGlobe
              size={48}
              className="text-cyan-600 dark:text-cyan-400 mx-auto mb-5 animate-bounce"
            />
            <h3 className="text-3xl font-semibold text-indigo-900 dark:text-white">Global Impact</h3>
            <p className="text-indigo-500 dark:text-indigo-400 text-sm mt-4">
              Connecting students from different countries to create a global
              learning network.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 p-12 rounded-2xl text-center shadow-xl bg-white dark:bg-gray-800">
          <h4 className="text-4xl font-bold mb-6 text-indigo-900 dark:text-white drop-shadow-lg">
            Our Mission
          </h4>
          <p className="max-w-3xl mx-auto text-indigo-900 dark:text-gray-200 text-xl leading-relaxed">
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