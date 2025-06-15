import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';


const MyArticles = () => {
    const articles = useLoaderData();
    console.log(articles);


    //handleDelete
    const handleDelete = (_id) => {
        console.log(_id);


   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        console.log(result.isConfirmed);
      }
      )

        //start deleting the article
        fetch(`http://localhost:4000/articles/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your article has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                    draggable:true
                });
            }
            // console.log(data);
        })
        
    };
    


    return (
         <div className="overflow-x-auto my-9">
        <h1 className="text-3xl font-bold text-center mb-6">My Articles</h1>
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        
        <thead className="">
          <tr>
         
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Content</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id} className="">
              <td className="px-4 py-2 border">{article.title}</td>
              <td className="px-4 py-2 border truncate max-w-xs">{article.content}</td>
              <td className="px-4 py-2 border">{article.category}</td>
              <td className="px-4 py-2 border">{article.authorName}</td>
              <td className="px-4 py-2 border">{article.date}</td>
              <td className="px-4 py-2 border space-x-2">
               
               <Link to={`/updateArticle/${article._id}`}>
                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
               </Link>
                <button 
                  onClick={() => handleDelete(article._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );

};

export default MyArticles;