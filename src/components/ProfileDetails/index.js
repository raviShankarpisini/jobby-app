import { Component } from 'react'
import Cookies from 'js-cookie'
import Loader from "react-js-loader";
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: profileData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProfileDetails = () => {
    const { profileList } = this.state
    const { name, profileImageUrl, shortBio } = profileList

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="name-heading">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
   
     <div className='profile-loader-container'>
    <Loader type="hourglass" bgColor="red"  size={100} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        data-testId="button"
        className="job-item-failure-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileDetails
