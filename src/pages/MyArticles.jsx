import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const MyArticles = () => {
  const articles = useLoaderData();

  // handleDelete
  const handleDelete = (_id) => {
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
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/articles/${_id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your article has been deleted.',
                  icon: 'success',
                  confirmButtonText: 'Cool',
                });
              }
            });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-9 overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Articles</h1>
      <div className="shadow-md rounded-lg border border-gray-300">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left border">Title</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Content</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Category</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Author</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Date</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:orange-100">
                <td className="px-3 sm:px-4 py-2 border break-words">{article.title}</td>
                <td className="px-3 sm:px-4 py-2 border break-words max-w-[150px] sm:max-w-xs truncate">{article.content}</td>
                <td className="px-3 sm:px-4 py-2 border">{article.category}</td>
                <td className="px-3 sm:px-4 py-2 border">{article.authorName}</td>
                <td className="px-3 sm:px-4 py-2 border">{article.date}</td>
                <td className="px-3 sm:px-4 py-2 border">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Link to={`/updateArticle/${article._id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 w-full sm:w-auto">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
