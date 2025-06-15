import Swal from "sweetalert2";


const PostArticles = () => {

    const handleAddArticle = e => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const articles = Object.fromEntries(formData.entries());
        console.log(articles);

        //send articles data  to the server
        fetch('http://localhost:4000/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articles),
        }) 
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                console.log('Added new article successfully', data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Your article has been added successfully.',
                    icon: 'success',
                    // confirmButtonText: 'Cool',
                    draggable:true
                })
                form.reset();
            }
        })
    }


  return (
    <div className="flex justify-center items-center py-8">
      <form onSubmit={handleAddArticle}  className="w-full max-w-2xl p-8 bg-base-100 rounded-lg shadow-2xl space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-6">
          Craft Your New Article
        </h2>

        {/* Article Title Input Field */}
        <div className="form-control">
          <label htmlFor="articleTitle" className="label">
            <span className="label-text text-lg font-semibold">Article Title <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., The Impact of AI on Modern Lifestyles"
            className="input input-bordered input-primary w-full text-base"
            required 
            aria-label="Article Title"
          />
        </div>

        {/* Content Textarea Field */}
        <div className="form-control">
          <label htmlFor="articleContent" className="label">
            <span className="label-text text-lg font-semibold">Content <span className="text-error">*</span></span>
          </label>
          <textarea
            name="content"
            placeholder="Write the full, engaging content of your article. Be thorough and provide value!"
            className="textarea textarea-bordered textarea-primary h-48 w-full text-base resize-y"
            required 
            aria-label="Article Content"
          ></textarea>
        </div>

        {/* Category Dropdown Field */}
        <div className="form-control">
          <label htmlFor="articleCategory" className="label">
            <span className="label-text text-lg font-semibold">Category <span className="text-error">*</span></span>
          </label>
          <select
            name="category"
            className="select select-bordered select-primary w-full text-base"
            required 
            aria-label="Article Category"
          >
            <option value="" disabled>Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Arts & Culture">Arts & Culture</option>
          </select>
        </div>

        {/* Tags Input Field (Optional) */}
        <div className="form-control">
          <label htmlFor="articleTags" className="label">
            <span className="label-text text-lg font-semibold">Tags (Optional)</span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g., react, javascript, frontend, webdev, programming"
            className="input input-bordered input-primary w-full text-base"
            aria-label="Article Tags"
          />
        </div>

         {/* Author Name Input Field */}
        <div>
            <label htmlFor="authorName" className="label">
            <span className="label-text text-lg font-semibold">Author Name <span className="text-error">*</span></span>
            </label>
            <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            className="input input-bordered input-primary w-full text-base"
            required
            aria-label="Author Name"
            />
        </div>

        {/* Thumbnail Image URL Input Field (Optional) */}
        <div className="form-control">
          <label htmlFor="thumbnailUrl" className="label">
            <span className="label-text text-lg font-semibold">Thumbnail Image URL (Optional)</span>
          </label>
          <input
            type="url"
            name="photoUrl"
            placeholder="Photo URL"
            className="input input-bordered input-primary w-full text-base"
            aria-label="Thumbnail Image URL"
          />
        </div>

        {/* Publication Date Input Field */}
        <div className="form-control">
          <label htmlFor="publicationDate" className="label">
            <span className="label-text text-lg font-semibold">Publication Date <span className="text-error">*</span></span>
          </label>
          <input
            type="date" 
            name="date"
            className="input input-bordered input-primary w-full text-base"
            required 
            aria-label="Publication Date"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button type="submit" className="btn btn-primary btn-lg w-full text-white font-bold">
            Add Post Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostArticles;