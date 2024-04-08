import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer>
      <ul className="footer_categories">
        <li><a href="/"><FaLinkedin /></a></li>
        <li><a href="/"><FaInstagram /></a></li>
        <li><a href="/"><FaTwitter /></a></li>
        <li><a href="/"><FaEarthAmericas /></a></li>
      </ul>
      <div className='footer_copyright'>
        <small>All Rights Reserved &copy; Copyright, White Devil</small>
      </div>
    </footer>
  )
}

export default Footer
