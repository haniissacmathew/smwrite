import "./about.css";
import Smwrite from "../assets/smwrite.svg";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";

const About = (props: any) => {
  return (
    <div className="about">
        <h2>About to Smwrite!</h2>
        <p>This software is created by Hani Issac Mathew.</p>
        <p>
          A screenplay writing app is a software tool designed to help writers
          create scripts for movies, TV shows, or plays. It provides a
          user-friendly interface with features like formatting templates,
          character and scene management, and tools for organizing and outlining
          the plot. This makes the writing process smoother and helps ensure the
          script meets industry standards.
        </p>
        <a href="#" target="_blank">
          <img src={Smwrite} className="about-logo" alt="Vite logo" />
        </a>
        <div className="author">
          <p>Made by: Hani Issac Mathew</p>
          <a href="https://buymeacoffee.com/" target="_blank">
            Buy me a coffee
          </a>
        </div>
        <div className="social-icons">
          <a href="[Social Media Link 1]" target="_blank">
            <FiFacebook/>
          </a>
          <a href="[Social Media Link 2]" target="_blank">
           <FiInstagram/>
          </a>
          <a href="[Social Media Link 3]" target="_blank">
          <FiTwitter/>
          </a>
          <a href="[Social Media Link 3]" target="_blank">
          <FiLinkedin/>
          </a>
        </div>
    </div>
  );
};

export default About;
