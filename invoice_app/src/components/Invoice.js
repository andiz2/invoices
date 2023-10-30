/* eslint-disable */
import {useState,useImperativeHandle, forwardRef} from 'react'

const baseUrl = 'http://localhost:3003/invoices'

const Invoice = ({invoice}) => {
	console.log('invoice', invoice.id)
	const invoiceStyle = {
	    paddingTop: 10,
	    paddingLeft: 2,
	    border: 'solid',
	    borderWidth: 1,
	    marginBottom: 5
  	}
  	const [visible, setVisible] = useState(false)

  	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const increaseLikes = () => {
		setVisible(!visible)
	}

return (
  <div style = {invoiceStyle}>
	  	<div style = {hideWhenVisible} data-testid = 'toBe'>
		    {invoice.details}  {invoice.due_date}
		    <button onClick = {toggleVisibility} data-testid = 'toBeBtn'>view</button>
	    </div>
	    <div style = {showWhenVisible} data-testid = 'toNotBe'>
		{invoice.details}  {invoice.due_date}
		    <button onClick = {toggleVisibility} >hide</button> <br />
		    {invoice.amount}<br />
			<a href = {`${ baseUrl }/${invoice.id}`}> API link </a>
	    </div>
  </div>  
)}

export default Invoice