/* eslint-disable */
//to be reviewed because we are still using the old datas and format of blogs
const BInvoiceForm = ({addInvoice, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange}) => {

	return (
		<div>
			<form onSubmit = {addBlog}>
		        <div>
		          title: <input value = {newTitle}
		          onChange = {handleTitleChange}
		          />
		        </div>
		        <div>
		          author: <input value = {newAuthor}
		          onChange = {handleAuthorChange}
		          />
		        </div>
			<div>
		          url: <input value = {newUrl}
		          onChange = {handleUrlChange}
		          />
		        </div>
		        <div>
		          <button type="submit">create</button>
		        </div>
		      </form>
		</div>
	)
}

export default BlogForm;
