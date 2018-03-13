import React, { Component } from 'react'
import SignUpForm from '../forms/SignUpForm'
import NavBar from '../common/NavBar'
import Footer from '../common/Footer'

export default class SignUpPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="">
          <div className="container w-40">
            <SignUpForm/> 
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
