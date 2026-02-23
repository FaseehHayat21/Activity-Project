import React from 'react'
import Hero from '../../Component/FrontPage/Hero/Hero'
import Navbar from '../../Component/FrontPage/Navbar/Navbar'
import AboutUs from '../../Component/FrontPage/AboutUs/AboutsUs'
import Services from '../../Component/FrontPage/Services/Services'
import ProjectOwner from '../../Component/FrontPage/Team/ProjectOwner'
import Contact from '../../Component/FrontPage/Contact/Contact'
import Footer from '../../Component/FrontPage/Footer/Footer'
export default function LandingPage() {
  return (
    <>
    <Navbar/>
    <div id="hero">
        <Hero/>
    </div>
    <div id="about">
        <AboutUs/>
    </div>
    <div id="Service">
        <Services/>
    </div>
    <div id="team">
      <ProjectOwner/>
    </div>
    <div id="contact">
      <Contact/>
    </div>
    <div id="footer">
          <Footer/>

    </div>

    </>
  )
}
