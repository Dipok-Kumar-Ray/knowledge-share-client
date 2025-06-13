import React from 'react';

const FeaturedMentors  = () => {

    const mentors = [
    { 
      id: 1, 
      name: "Prof. Mahmudul Karim", 
      expertise: "Machine Learning", 
      description: "Mahmudul Karim has 15+ years of experience in AI research and is passionate about mentoring young engineers.",
      image: "https://i.pravatar.cc/100?img=15" 
    },
    { 
      id: 2, 
      name: "Nusrat Jahan", 
      expertise: "UI/UX Design", 
      description: "Nusrat has designed for top startups and focuses on creating user-centered designs with a strong visual impact.",
      image: "https://i.pravatar.cc/100?img=16" 
    },
    { 
      id: 3, 
      name: "Dr. Rezaul Kabir", 
      expertise: "Cloud Computing", 
      description: "Rezaul specializes in scalable cloud architectures and is dedicated to guiding professionals in cloud migration strategies.",
      image: "https://i.pravatar.cc/100?img=18" 
    },
    { 
      id: 4, 
      name: "Sharmin Akter", 
      expertise: "Blockchain Development", 
      description: "Sharmin is a blockchain evangelist working on decentralized applications, with a focus on secure smart contracts.",
      image: "https://i.pravatar.cc/100?img=19" 
    },
  ];

    return (
        <section className="my-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-secondary">Featured Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-2xl flex flex-col md:flex-row items-center p-6">
            <img 
              src={mentor.image} 
              alt={mentor.name} 
              className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6 border-4 border-primary"
            />
            <div>
              <h3 className="font-semibold text-lg text-primary">{mentor.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{mentor.expertise}</p>
              <p className="text-sm text-gray-600">{mentor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default FeaturedMentors ;