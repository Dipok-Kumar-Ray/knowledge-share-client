import React from 'react';
import { useLoaderData } from 'react-router';

const AllArticle = () => {
    const  data = useLoaderData();
    console.log(data);
    return (
         <div className="card w-96 bg-base-100 shadow-xl image-full transform transition duration-300 hover:scale-105">
      
      <div className="card-body">
        <h1></h1>
        <h2 className="card-title text-white">
          {/* {title} */}
        </h2>
        <p className="text-gray-200 text-sm mb-4">
          By <span className="font-semibold text-primary"></span> | Published: <span className="text-gray-300"></span>
        </p>
        <div className="card-actions justify-end">
          <a 
            // href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
          >
            Read More
          </a>
        </div>
      </div>
    </div>
    );
};

export default AllArticle;