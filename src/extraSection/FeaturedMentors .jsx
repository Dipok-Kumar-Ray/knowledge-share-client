import React from "react";

const FeaturedMentors = () => {
  const mentors = [
    {
      id: 1,
      name: "Prof. Mahmudul Karim",
      expertise: "Machine Learning",
      description:
        "Mahmudul Karim has 15+ years of experience in AI research and is passionate about mentoring young engineers.",
      image: "https://i.pravatar.cc/100?img=15",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      expertise: "UI/UX Design",
      description:
        "Nusrat has designed for top startups and focuses on creating user-centered designs with a strong visual impact.",
      image: "https://i.pravatar.cc/100?img=16",
    },
    {
      id: 3,
      name: "Dr. Rezaul Kabir",
      expertise: "Cloud Computing",
      description:
        "Rezaul specializes in scalable cloud architectures and guides professionals in cloud migration strategies.",
      image: "https://i.pravatar.cc/100?img=18",
    },
    {
      id: 4,
      name: "Sharmin Akter",
      expertise: "Blockchain Development",
      description:
        "Sharmin is a blockchain evangelist working on decentralized applications with secure smart contracts.",
      image: "https://i.pravatar.cc/100?img=19",
    },
    {
      id: 5,
      name: "Tanvir Hasan",
      expertise: "Cybersecurity",
      description:
        "Tanvir is a certified ethical hacker helping companies secure their infrastructure and train security teams.",
      image: "https://i.pravatar.cc/100?img=20",
    },
    {
      id: 6,
      name: "Mitu Rahman",
      expertise: "Data Science",
      description:
        "Mitu helps organizations transform data into actionable insights through analytics and predictive modeling.",
      image: "https://i.pravatar.cc/100?img=21",
    },
    {
      id: 7,
      name: "Arif Chowdhury",
      expertise: "DevOps Engineering",
      description:
        "Arif has extensive experience in CI/CD pipelines and automating large-scale deployments.",
      image: "https://i.pravatar.cc/100?img=22",
    },
    {
      id: 8,
      name: "Lamia Akter",
      expertise: "AR/VR Development",
      description:
        "Lamia creates immersive augmented and virtual reality experiences for education and entertainment.",
      image: "https://i.pravatar.cc/100?img=23",
    },
  ];

  return (
    <section className="my-16 px-5">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Featured Mentors
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group p-6 flex flex-col items-center text-center"
          >
            <div className="overflow-hidden rounded-full border-4 border-primary w-28 h-28 mb-4">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {mentor.expertise}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {mentor.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMentors;
