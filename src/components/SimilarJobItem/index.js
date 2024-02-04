import {AiFillStar} from 'react-icons/ai'
import { useEffect } from 'react'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import { Link,withRouter } from 'react-router-dom'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,id,
  } = jobDetails
  return (
    <li className="similar-list-docs">
     {/* <Link to={`/jobs/${id}`} className="link-item"> */}
     {/* <Link to="/jobs" className="link-item"> */}
    <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-url"
        />
        <div>
          <h1 className="company-logo-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="count-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-desc-heading">Description</h1>
      <p className="similar-desc">{jobDescription}</p>
      <div className="location-container-flex-justify">
        <div className="responsive">
          <GoLocation className="location-logo" />
          <p className="location-desc">{location}</p>
        </div>
        <div className="responsive">
          <BsBriefcaseFill className="location-logo-brief" />
          <p className="location-desc">{employmentType}</p>
        </div>
      </div>
    {/* </Link> */}
      
    </li>
  )
}

export default withRouter(SimilarJobItem)
