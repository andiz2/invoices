/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react'
import Invoice from './components/Invoice'
import Notification from './components/Notification'
import invoiceService from './services/invoices'
import loginService from './services/login'
//import BlogForm from './components/InvoiceForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'



const App = () => {
  const [invoices, setInvoices] = useState([])
  //const [newTitle, setNewTitle] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newLikes, setNewLikes] = useState(0)
  //const [newUrl, setNewUrl] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    invoiceService.getAll().then(invoices =>
      setInvoices( invoices.sort((a, b) => {
        return b.amount - a.amount
      }) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      invoiceService.setToken(user.token)
    }
  }, [])

  const invoiceFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      invoiceService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username and password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }


  /*const addBlog = (event) => {
       
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }
    //setBlogs(blogs.concat(blogObject))
    console.log("blogs", blogs)
    console.log("newTitle", newTitle)
    console.log("blogObject", blogObject)
    console.log("newLikes", newLikes)

    setErrorMessage(
            `Added ${blogObject.title} by ${blogObject.author}`
          )
      setTimeout(() => {
            console.log('intra in settimeout errorMessage?', errorMessage)
            console.log('nameobject din settimeout', blogObject.title)
            setErrorMessage(null)
         }, 5000)

    blogService
      .create(blogObject)
      .then(response => {
        console.log('blogs din valiblogs', blogs)
        console.log('blogobj din blogserv', blogObject)
        setBlogs(blogs.concat(blogObject))
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => {
        return b.likes - a.likes
      }) )
    )  
      })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
  }
  */
/*
  const deleteBlog = (blogErase) =>{
    console.log('deleteContact', blogErase)
    var newList = [...blogs]
    let toDelete = newList.find(blog => blog.id === blogErase)
    console.log('toDelete', toDelete)
    if(window.confirm(`Removing blog ${toDelete.title} by ${toDelete.author}`)){
      blogService
        .deleteBlog(blogErase)
        .then(deletedlBlog => {
          console.log(deletedlBlog)
        })
      newList = [...blogs]
      newList = newList.filter(blog => blog.id !== blogErase)
      console.log('newList', newList)
      setBlogs(newList)
    }
  }
  */

  /*
  const addLike = (idAddLike) => {
    let newList = [...blogs]
    let toUpdate = newList.find(blog => blog.id === idAddLike)
    // const blogObject = {
    //   title: blog.title,
    //   author: blog.author,
    //   url: blog.url,
    //   likes: likes++
    // }
    toUpdate.likes++
    console.log("blogs", blogs)
    console.log("newList", newList)
    setBlogs(newList)
    blogService.update(idAddLike, toUpdate)

  }
  */



/*
   const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }


  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }


  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  */



  return (
  <div>
   <Notification message={errorMessage} />

   {!user && 
    <Togglable buttonLabel = "log in">

        <LoginForm
              username = {username}
              password = {password}
              handleUsernameChange = {({target}) => setUsername(target.value)}
              handlePasswordChange = {({target}) => setPassword(target.value)}
              handleSubmit = {handleLogin}
          />
    </Togglable>
  }
     
      {user && <div>
        <h2>Invoices</h2>
        <p>{user.name} logged in</p>
        <form onSubmit = {handleLogout}>
            <button type="submit">logout</button>
          </form>
        
          {invoices.map(invoice =>
            <Invoice key={invoice.id} invoice={invoice} username = {user.name}
              />
          )}
        </div>
      }    
      
    </div>
  )
}

export default App