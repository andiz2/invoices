/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RennderInv = () => {
  const [companies, setCompanies] = useState([])

  // Function to fetch companies and device counts for all companies
  const fetchCompaniesAndDeviceCounts = async () => {
    try {
      const companiesResponse = await fetch('https://api-blogs-swuo.onrender.com/api/blogs')
      const companiesData = await companiesResponse.json()

      // Fetch device counts for all companies
      const deviceCounts = await Promise.all(
        companiesData.map(async (company) => {
          const deviceResponse = await axios.get(`https://api-blogs-swuo.onrender.com/api/blogs/${company.id}`)
          return { id: company.id, name: company.details, deviceCount: deviceResponse.data.likes }
        })
      )

      setCompanies(deviceCounts)
    } catch (error) {
      console.error('Error fetching companies and device counts:', error)
    }
  }

  // useEffect to fetch companies and device counts when component mounts
  useEffect(() => {
    fetchCompaniesAndDeviceCounts()
  }, [])

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.details} - Number of devices: {company.deviceCount}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RennderInv
