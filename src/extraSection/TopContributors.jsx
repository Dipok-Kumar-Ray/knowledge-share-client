import React from 'react';

const TopContributors = () => {


   const contributors = [
    { id: 1, name: "Dr. Ayesha Rahman", field: "AI & Robotics", avatar: "https://i.pravatar.cc/100?img=12" },
    { id: 2, name: "Md. Tanvir Hasan", field: "Web Development", avatar: "https://i.pravatar.cc/100?img=13" },
    { id: 3, name: "Sadia Jahan", field: "Data Science", avatar: "https://i.pravatar.cc/100?img=14" },
    { id: 4, name: "Farhan Kabir", field: "Cybersecurity", avatar: "https://i.pravatar.cc/100?img=17" },
  ];

    return (
        <section className="grid my-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Top Contributors</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {contributors.map((person) => (
          <div key={person.id} className="card w-64 bg-base-100 shadow-md hover:shadow-lg transition rounded-xl">
            <figure className="pt-4">
              <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.field}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default TopContributors;