import "./Home.css";
import React, { useState, useEffect, useRef } from "react";
import logoIMG from './icons/HomeIMG.svg';
import fackIMG from './icons/fake.png';
import missinformationIMG from './icons/misinformation.png';
import techIMG from './icons/tech.png';
import tech2IMG from './icons/technologie.jpg';
import socialIMG from './icons/social.jpg';
import aiIMG from './icons/ai.png';
import leftIMG from './icons/leftArrow.svg';
import rightIMG from './icons/rightArrow.svg';
import FeatureIMG1 from './icons/firebase.png'
import FeatureIMG2 from './icons/ux.png'
import FeatureIMG3 from './icons/medical.png'
import facebookIMG from './icons/facebook.png';
import linkedinIMG from './icons/linkedin.png';
import ngiIMG from './icons/ngi.png';
import ichouIMG from './icons/ichou.jpeg';
import oualidIMG from './icons/oualid.jpeg';
import hamdiIMG from './icons/hamdi.jpeg';
import marouaneIMG from './icons/merouane.jpeg';
import luigiIMG from './icons/luigi.jpeg';
import allesandroIMG from './icons/allesandro.jpeg';
import aladineIMG from './icons/aladine.jpeg';
import amineIMG from './icons/amine.png';
import NavBar from "./components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const members = [
    { name: 'Alessandro Bruno', job: 'Head Coordinator', disciption: "The team is under the coordination of Alessandro Bruno, a Tenure-Track Assistant Professor at the IULM University, Milan, Italy.", img : allesandroIMG },
    { name: 'Aladine Chetouani', job: 'Research investigator', disciption: "Professor Aladine Chetouani from the University of Orleans' Prisme Laboratory, France.", img : aladineIMG },
    { name: 'Pier-Luigie Mazzeo', job: 'Research investigator', disciption: "Research Pier-Luigie Mazzeo from CNR (Italian Research Council) ISASI (Institute of Applied Science and Intelligent Systems) in Italy", img : luigiIMG },
    { name: 'Mohamed Amine KERKOURI', job: 'AI Researcher, Web-Dev, Team Lead', disciption: "Mohamed Amine KERKOURI conducts research on human visual perception and attention modeling using deep learning approaches.", img : amineIMG },
    { name: 'Marouane Tliba', job: 'Communication, Team Lead', disciption: "Marouane Tliba conducts research about improving the representational ability of neural networks for 3D content perceptual assessment.", img : marouaneIMG },
    { name: 'Abderrahmene Hamdi', job: 'AI/LLMs Intern', disciption: "CS student (ESI) | Machine Learning | Deep learning", img : hamdiIMG },
    { name: 'Walid Taib', job: 'AI, Data pipline Intern', disciption: "Research intern, Junior Data Scientist, and Final Student at the Higher National School of Telecommunication and ICT", img : oualidIMG },
    { name: 'Abdelali ichou', job: 'Web dev, UI/UX intern', disciption: "Computer science student at Orleans university | Native mobile developer | Web developer", img : ichouIMG }
  ];
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  const navRef = useRef(null);

  const Memberscroll = (scrollOffset) => {
    navRef.current.scrollLeft += scrollOffset;
  };

  // declaration of all our variables
  const navigate = useNavigate();

  useEffect(()=>{
    nextPage();
  }, [])

  const nextPage = () => {
  //  navigate(`/home`)
  }

  // whenever the width of the screen changes, we change the variable wich make us able to change the drop down from top left absolute parent to our page-container flex under the input text  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle mouse up and touch end events
  const handleEnd = () => {
    setIsDragging(false);
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed by multiplying factor
    navRef.current.scrollLeft = scrollLeft - walk;
  };

 

  return (
  
    <div className="page-container3">

      <div id="home" className="Header-container">

        <ToastContainer />

        <NavBar/>

        { windowWidth > 492 ? (

            <div className="welcomHeader">

              <div className="welcomHeader2">

                <p className="HeaderText">
                  Health-care <br/> Related Fake News <br/> Metigation 
                </p>

                <p className="HeaderText2">
                  HeReFaNMI, an innovative platform dedicated to the detection and 
                  the combat of the false health information spreading in the field
                  of public health using a large language model developed by our team. 
                  This project is funded by the NGI initiative Search (Next Generation Internet Discovery and Search), 
                  which supports the development of trusted open source search and
                  discovery tools.
                </p>

                <div className="column">
                  
                <button className="register-button" onClick={ ()=> { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }) } }>
                      See Features
                  </button>

                  <button className="signin-button" onClick={ ()=> { document.getElementById('team').scrollIntoView({ behavior: 'smooth' }) } }>
                      Team 
                  </button>
                </div>

              </div>

              <img className="welcomIMG" src={logoIMG} alt="Image" />

            </div>

        ) : (
            <div className="welcomHeader">

              <div className="footerIconsContainer">

                <p className="HeaderText">
                    Health care <br/> Related Fake News <br/> Metigation 
                </p>

                <div className="space6"/>   

                <img className="welcomIMG" src={logoIMG} alt="Image" />

              </div>

              <div className="welcomHeader2">

                <p className="HeaderText2">
                  HeReFaNMI, an innovative platform dedicated to the detection and 
                  the combat of the false health information spreading in the field
                  of public health using a large language model developed by our team. 
                  This project is funded by the NGI initiative Search (Next Generation Internet Discovery and Search), 
                  which supports the development of trusted open source search and
                  discovery tools.
                </p>

                <div className="column">
                  
                  <button className="register-button" onClick={ ()=> { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }) } }>
                      See Features
                  </button>

                  <button className="signin-button" onClick={ ()=> { document.getElementById('team').scrollIntoView({ behavior: 'smooth' }) } }>
                      Team 
                  </button>

                </div>

              </div>

            </div>
        )}
       
      </div>

      <div id="role" className="WhatWeDo-container">

          <p className="SectionText">
            What we do?
          </p>

          { windowWidth > 934 ? (
            <>
              <p className="SectionText2">
                Our primary aim is to develop an automated tool that empowers every internet user to discern between information <br/> supported by scientific evidence and that which is not. We strive to enable individuals to distinguish <br/> truth from falsehood, fostering a more informed and accurate understanding of the world.
              </p>
            </>
          ) : (
            <>
              <p className="SectionText2">
                Our primary aim is to develop an automated tool that empowers every internet user to discern between information supported by scientific evidence and that which is not. We strive to enable individuals to distinguish truth from falsehood, fostering a more informed and accurate understanding of the world.
              </p>
            </>
          )}
         
          <div className="margin"/>

          <div className="Card2Header">

            <div className="card2">

              <img className="card2IMG" src={socialIMG} alt="Image" />

              <div className="card2Discription">

                <p className="Card2Title">
                  Social goals
                </p>

                <p className="Card2Text">
                  Combat the propagation of fake news within health-related information.
                </p>

                <p className="Card2Text">
                  Restore trustworthiness to the internet community.
                </p>
                
                <p className="Card2Text">
                Safeguard individuals against misinformation while promoting the dissemination of accurate health information.
                </p>

              </div>

            </div>

            <div className="space4"/>

            <div className="card2">

              <img className="card2IMG" src={tech2IMG} alt="Image" />

              <div className="card2Discription">

                <p className="Card2Title">
                  Technological goals
                </p>

                <p className="Card2Text">
                  Develop an autonomous system equipped with continual learning capabilities.
                </p>

                <p className="Card2Text">
                  Leverage cutting-edge ML algorithms to provide individuals with an automated and reliable solution.
                </p>

                <p className="Card2Text">
                  Harness the power of technology to enhance overall societal well-being and improve public health outcomes.
                </p>

              </div>

            </div>

          </div>

      </div>

      <div id="section1" className="WhatWeDo2-container">

        { windowWidth > 512 ? (
          <>
            <div className="WhatWeDoHeader">

              <div className="space3"/>

              <img className="WhatWeDoIMG" src={missinformationIMG} alt="Image" />

              <div className="space2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Misinformation
                </p>

                <p className="WhatWeDoText2">
                  Ensure the protection of individuals from the spread of misinformation by implementing rigorous measures to verify and correct false claims. At the same time, actively promote the dissemination of accurate and reliable health information to the public, fostering an informed and health-conscious community. By prioritizing both aspects, we aim to create a balanced environment where truth prevails and individuals can make well-informed decisions about their health and well-being.
                </p>

              </div>

            </div>

            <div className="WhatWeDoHeader">

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Fake News
                </p>

                <p className="WhatWeDoText2">
                  Combat the propagation of fake news and misinformation within health-related information, ensuring that accurate and reliable data reaches the public. This involves identifying and correcting false claims, promoting verified sources, and educating individuals on how to discern trustworthy health information from misleading or deceptive content. By doing so, we aim to protect public health, enhance the quality of healthcare decisions, and foster a well-informed community.
                </p>

              </div>

              <div className="space2"/>

              <img className="WhatWeDoIMG" src={fackIMG} alt="Image" />

              <div className="space3"/>

            </div>

            <div className="WhatWeDoHeader">

              <div className="space3"/>

              <img className="WhatWeDoIMG" src={aiIMG} alt="Image" />

              <div className="space2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  AI & Society
                </p>

                <p className="WhatWeDoText2">
                Harness the transformative power of cutting-edge technology to significantly enhance overall societal well-being. By leveraging advanced tools and innovative solutions, we can improve public health outcomes, making healthcare more accessible, efficient, and effective. This approach ensures that communities thrive through better disease prevention, quicker diagnostics, personalized treatments, and improved healthcare delivery systems. The integration of technology in public health not only addresses current health challenges but also proactively prepares us for future health crises, ultimately leading to a healthier, more resilient society.
                </p>

              </div>

            </div>

            <div className="WhatWeDoHeader">

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Latest Tech 
                </p>

                <p className="WhatWeDoText2">
                Leverage cutting-edge machine learning algorithms to provide individuals with an automated and reliable solution. These advanced algorithms analyze vast amounts of  data to deliver precise and insightful predictions, optimizing various aspects of decision-making processes. By automating complex tasks, users can benefit from increased efficiency, reduced error rates, and a deeper understanding of patterns and trends that were previously difficult to discern. This innovative approach empowers individuals to make data-driven decisions with confidence, ensuring accuracy and reliability in their endeavors.
                </p>

              </div>

              <div className="space2"/>

              <img className="WhatWeDoIMG" src={techIMG} alt="Image" />

              <div className="space3"/>

            </div>
          </>
        ) : (
          <>
            <div className="WhatWeDoHeader">

              <div className="margin2"/>

              <img className="WhatWeDoIMG" src={missinformationIMG} alt="Image" />

              <div className="margin2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Misinformation
                </p>

                <p className="WhatWeDoText2">
                  Ensure the protection of individuals from the spread of misinformation by implementing rigorous measures to verify and correct false claims. At the same time, actively promote the dissemination of accurate and reliable health information to the public, fostering an informed and health-conscious community. By prioritizing both aspects, we aim to create a balanced environment where truth prevails and individuals can make well-informed decisions about their health and well-being.
                </p>

              </div>

            </div>

            <div className="WhatWeDoHeader">

              <div className="margin2"/>

              <img className="WhatWeDoIMG" src={fackIMG} alt="Image" />

              <div className="margin2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Fake News
                </p>

                <p className="WhatWeDoText2">
                  Combat the propagation of fake news and misinformation within health-related information, ensuring that accurate and reliable data reaches the public. This involves identifying and correcting false claims, promoting verified sources, and educating individuals on how to discern trustworthy health information from misleading or deceptive content. By doing so, we aim to protect public health, enhance the quality of healthcare decisions, and foster a well-informed community.
                </p>

              </div>

            </div>

            <div className="WhatWeDoHeader">

              <div className="margin2"/>

              <img className="WhatWeDoIMG" src={aiIMG} alt="Image" />

              <div className="margin2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  AI & Society
                </p>

                <p className="WhatWeDoText2">
                Harness the transformative power of cutting-edge technology to significantly enhance overall societal well-being. By leveraging advanced tools and innovative solutions, we can improve public health outcomes, making healthcare more accessible, efficient, and effective. This approach ensures that communities thrive through better disease prevention, quicker diagnostics, personalized treatments, and improved healthcare delivery systems. The integration of technology in public health not only addresses current health challenges but also proactively prepares us for future health crises, ultimately leading to a healthier, more resilient society.
                </p>

              </div>

            </div>

            <div className="WhatWeDoHeader">

              <div className="marign2"/>

              <img className="WhatWeDoIMG" src={techIMG} alt="Image" />

              <div className="margin2"/>

              <div className="welcomHeader2">

                <p className="WhatWeDoText">
                  Latest Tech 
                </p>

                <p className="WhatWeDoText2">
                Leverage cutting-edge machine learning algorithms to provide individuals with an automated and reliable solution. These advanced algorithms analyze vast amounts of  data to deliver precise and insightful predictions, optimizing various aspects of decision-making processes. By automating complex tasks, users can benefit from increased efficiency, reduced error rates, and a deeper understanding of patterns and trends that were previously difficult to discern. This innovative approach empowers individuals to make data-driven decisions with confidence, ensuring accuracy and reliability in their endeavors.
                </p>

              </div>



            </div>
          </>
        )
        }
        
      </div>

      <div id="team" className="Team-container">

        <p className="SectionText">
          Meet our team
        </p>

        { windowWidth > 1005 ? (
          <>
            <p className="SectionText2">
              Our team consists of doctors, professors, researchers, and interns. Each
              member brings valuable expertise,<br/> working together to develop and deliver
              this tool. We are committed to excellence and continually <br/>  strive to provide
              high-quality resources and solutions for the community.
            </p>
          </>
        ) : (
          <>
            <p className="SectionText2">
              Our team consists of doctors, professors, researchers, and interns. Each
              member brings valuable expertise working together to develop and deliver
              this tool. We are committed to excellence and continually  strive to provide
              high-quality resources and solutions for the community.
            </p>
          </>
        )}

        <div className="margin"/>

        <div className="members"
             ref={navRef} 
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleEnd}
        >

          {
            members.map((member, index) => (

              <div key={index} className="MemberCard">

                <div className="MemberCardRow">

                  <img className="MemberCardIMG" src={member.img} alt="Image" />

                  <div className="MemberCardColumn">

                    <p className="MemberCardTitle"> {member.name} </p>

                    <p className="MemberCardSubTitle"> {member.job} </p>

                  </div>                  
                  
                </div>

                <div className="MemberCardDiscription">

                  <p className="MemberCardText"> {member.disciption} </p>

                </div>

              </div>

            ))
          }

        </div>

        <div className="column">

          <img className="arrow" onClick={() => Memberscroll(-400)} src={leftIMG} alt="Image" />

          <img className="arrow" onClick={() => Memberscroll(+400)} src={rightIMG} alt="Image" />

        </div>

      </div>

      <div id="features" className="Features-container">

          <p className="SectionText">
            Platforme features
          </p>

          { windowWidth > 1005 ? (
            <>
              <p className="SectionText2">
                The main objective is to allow users to verify the veracity of
                medical information in real time <br/>while guaranteeing an experience
                secure and intuitive user.
              </p>
            </>
          ) : (
            <>
              <p className="SectionText2">
                The main objective is to allow users to verify the veracity of
                medical information in real timev while guaranteeing an experience
                secure and intuitive user.
              </p>
            </>
          )}

          <div className="CardColumn">

            <div className="card">

              <img className="cardIMG2" src={FeatureIMG1} alt="Image" />

              <div className="cardDiscription">

                <p className="CardTitle">
                  Google Firebase
                </p>

                <p className="CardText">
                  Ensuring secure user auth and personal data by using Firebase, a secure solution provided by Google.
                </p>

              </div>

            </div>

            <div className="card">

              <img className="cardIMG" src={FeatureIMG2} alt="Image" />

              <div className="cardDiscription">

                <p className="CardTitle">
                  Optimized UX
                </p>

                <p className="CardText">
                  Offer an intuitive, responsive and centralized user interface, developed in React.js which makes it so easy to use 
                </p>
              </div>

            </div>

            <div className="card">

              <img className="cardIMG2" src={FeatureIMG3} alt="Image" />

              <div className="cardDiscription">

                <p className="CardTitle">
                  Medical Verification 
                </p>

                <p className="CardText">
                  Allow users to submit medical information and
                  receive detailed assessments of their reliability, based on AI  
                </p>

              </div>

            </div>
          
          </div>
          
      </div>

      <div id="ngi" className="statistics-container">

        <p className="statistics-title">
          NGI SEARCH BENEFITS FOR YOUR PROJECT
        </p>

        { windowWidth > 1239 ? (
          <>
            <p className="statistics-disc">
              Do your ideas for finding information and resources on the Internet respect the privacy of end-users?
              The NGI Search project helps you turn <br/>them into reality with financial, technical and community support.  
            </p>
          </>
        ) : (
          <>
            <p className="statistics-disc">
              Do your ideas for finding information and resources on the Internet respect the privacy of end-users?
              The NGI Search project helps you turnm them into reality with financial, technical and community support.  
            </p>
          </>
        )}

        <div className="margin2"/>

        <div className="column">

          <p className="statistics-text">
            Open Call #5 is open May 29-July 29, 2024
          </p>

          <div className="space2"/>
          <div className="space2"/>

          <p className="statistics-text">
            Get funded up to €150,000 to innovate
          </p>

          <div className="space2"/>
          <div className="space2"/>

          <p className="statistics-text">
          10 services provided during one year   
          </p>

        </div>

      </div>

      <div id="faq" className="FAQ-container">

        <div className="content">

          <p className="SectionText">
            FAQ
          </p>

          { windowWidth > 1211 ? (
            <>
              <p className="SectionText2">
                collection of common inquiries and their corresponding answers, typically curated
                to address the most prevalent or recurring  concerns <br/> and queries posed by users to
                provide and facilitate understanding and resolve doubts without the need for direct assistance.
              </p>
            </>
          ) : (
            <>
              <p className="SectionText2">
                collection of common inquiries and their corresponding answers, typically curated
                to address the most prevalent or recurring  concerns and queries posed by users to
                provide and facilitate understanding and resolve doubts without the need for direct assistance.
              </p>
            </>
          )}

          <div className="margin"/>

          <div className="welcomHeader2">

            <p className="FAQTitle">
            Why was HeReFaNMi created?
            </p>

            <p className="FAQText">
              HeReFaNMi was created in response to the critical challenge of misinformation, particularly highlighted during the COVID-19 pandemic. The widespread dissemination of inaccurate health information has eroded public trust in official guidelines and posed significant obstacles to public health efforts. HeReFaNMi aims to address these issues by providing reliable and accurate health information.          
            </p>

          </div>

          <div className="margin2"/>

          <div className="welcomHeader2">

            <p className="FAQTitle">
              How does HeReFaNMi work?
            </p>

            <p className="FAQText">
              HeReFaNMi uses cutting-edge AI &  LLM algorithms to monitor, detect, and combat fake news in health-related information. The system is designed to automatically identify and flag inaccurate information provided by users, helping individuals access reliable health information quickly and efficiently.
            </p>

          </div>

          <div className="margin2"/>

          <div className="welcomHeader2">

            <p className="FAQTitle">
              How does HeReFaNMi benefit the public?
            </p>

            <p className="FAQText">
              HeReFaNMi enhances societal well-being by ensuring that accurate health information is readily available and easily accessible. By combating misinformation, the project helps maintain public trust in scientific research and official health guidelines, ultimately improving public health outcomes.
            </p>

          </div>

          <div className="margin2"/>

          <div className="welcomHeader2">

            <p className="FAQTitle">
            How can organizations partner with HeReFaNMi?
            </p>

            <p className="FAQText">
              Organizations interested in partnering with HeReFaNMi can contact the project team through the official email. Partnerships can involve data sharing, collaborative research, and joint initiatives to combat health-related misinformation.
              HeReFaNMi  is a product oriented research project, the team appriciates any contribution you can add to the project. 
            </p>

          </div>

        </div>

      </div>

      <div id="footer" className="footer-container">
        
        <div className="footer">

          <div className="footerheader">

            <div className="footer2 ">

              <p className="navText2">
                  HeReFanMi<p className="dot">.</p> 
              </p>

              <div className="space5"/>

              <p className="FooterText2">
                HeReFaNMi (Health-Related Fake News Monitoring) is funded by the NGI Search european project
                which is an European project designed to support entrepreneurs, tech-geeks, developers, and socially engaged people,  who are capable of challenging the way we search and discover information and resources on the internet.     
              </p>

              <div className="space5"/>

              <div className="footerIconsContainer">

                <a href="#footer"><img className="footerIcon" src={facebookIMG} alt="Image" /></a>
                <a href="https://www.linkedin.com/company/herefanmi-project/" target="_blank"><img className="footerIcon" src={linkedinIMG} alt="Image" /></a>
                <a href="https://sites.google.com/view/herefanmi/" target="_blank"><img className="footerIcon" src={ngiIMG} alt="Image" /></a>

              </div>
              
            </div>

            <div className="space2"/>

            <div className="footerDisc">

              <div className="footerInf">

                <p className="footerTitle">
                  About
                </p>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#home">Home</a>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#footer">About Us</a>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#role">Role</a>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#features">Features</a>
              
                <div className="space6"/>

              </div>

              <div className="footerInf">

                <p className="footerTitle">
                  Info
                </p>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#footer">Contacts</a>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#ngi">NGI</a>
               
                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#team">Our team</a>

                <div className="space5"/>

                <a className="FooterText" style={{textDecoration:'none'}} href="#faq">FAQ</a>

                <div className="space6"/>
              
              </div>

              <div className="footerInf">

                <p className="footerTitle">
                  Contact
                </p>

                <div className="space5"/>

                <p className="FooterText2">
                  Address: <br/>
                  3, rue Charles du Coulomb, Orleans 45100, France
                </p>

                <div className="space5"/>

                <p className="FooterText2">
                  Contact: <br/>
                  +33 7 80 39 15 53
                  a.ichou@esi-sba.dz
                </p>

                <div className="space6"/>
              
              </div>

            </div>

          </div>

          <div className="footerdevider"/>

          <p className="FooterLittleText">
            © Ichou Abdelali 2024. All right reserved.
          </p>

        </div>

      </div>

    </div>
    
  );
}

export default Home;
