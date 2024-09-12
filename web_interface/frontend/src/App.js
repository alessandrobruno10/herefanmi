import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import logoutIMG from './icons/logout.svg';
import logoIMG from './icons/HeReFanMi.png';
import userIMG from './icons/user.png';
import lockIMG from './icons/lock.png';
import shareIMG from './icons/share.png';
import rateIMG from './icons/jaime.svg';
import copyIMG from './icons/copy.svg';
import regenerateIMG from './icons/restart.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './userContext';


function App() {

  // Getting the user from context
  const { user, setUser } = useUser();


  // console.log("Home page user => ",user);   // This should log the user object

  
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");  
  const [label, setLabel] = useState("");  
  const [source, setSrouce] = useState([]);  
  const [reference, setReference] = useState("");
  const [news, setNews] = useState("");
  const [rating, setRating] = useState("0");
  const [ratingOpinion, setRatingOpinion] = useState("0");
  const [hoverRating, setHoverRating] = useState(null);
  const [hoverOpinion, setHoverOpinion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ transform: 'scale(1)', transition: 'transform 0.3s ease' });
  const [userScroll, setUserScroll] = useState(false);
  const [life, setLife] = useState(0);
  const [asked, setAsked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userPoints, setUserPoints] = useState(null);  
  const navigate = useNavigate();

  const dropDownOptions = [
    { id: 1, label: 'BARD (PALM)', imageUrl: lockIMG },
    { id: 2, label: 'GEMINI', imageUrl: lockIMG },
    { id: 3, label: 'GPT4', imageUrl: null },
    { id: 4, label: 'GPT3.5', imageUrl: null },
    { id: 5, label: 'MISTRAL', imageUrl: lockIMG }
  ];

  const [selectedItem, setSelectedItem] = useState(
    { id: 4, label: 'GPT3.5', imageUrl: lockIMG }
  );

  const handleDropItemClick = (item) => {
    if((item.label == 'BARD (PALM)') || (item.label == 'MISTRAL') || ((item.label == 'GEMINI'))){
      toast.error("This model hasn't been implemented yet !", {
        position: "top-center",
       });
      return ;
    }
  
    setSelectedItem(item);
    setIsOpen(false);

  };
  
  const toggleDropdown = () => setIsOpen(!isOpen);

    // pass request and get response from my local backend server 
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true when starting the request
      const datum = {
        user : user?.uid,
        data : inputText,
        opinion : ratingOpinion,
        backend : selectedItem.label
      }

      console.log(datum)
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/medicalTalk', datum ,{
      const response = await axios.post('http://127.0.0.1:4000/medicalTalk', datum ,{
        onUploadProgress: progressEvent => {
          // Handle upload progress if needed
        },
        onDownloadProgress: progressEvent => {
          // Handle download progress if needed
        }
      });

      console.log(response.data.data);
      console.log(response.data.key);  
      console.log(response.data.news);
      console.log(response.data.label);
      console.log(response.data.source);    

      setResult(response.data.data);
      setNews(response.data.news);
      setLabel(response.data.label);
      setSrouce(response.data.source);
      setReference(response.data.key);

      // verifiying user number of essayes 
      if( response.data.data === "Please try to ask something related to to medical field... !" ){
        setLife(life + 1)
      } else {
        setLife(0)
      }

    } catch (error) {
      console.error(error);
    } finally
    {
      setLoading(false); // Set loading state to false when request is complete, to hide the progress bar
    }
  };
  
  // saving the user rating
  const saveRating = async () => {

    if(rating === "0"){
      toast.error("Please enter your rating about the model's response !", {
        position: "top-center"
      });
      return;
    }

    try {
      const datum = {
        user : user?.uid,
        rating : rating,
        reference : reference
      }
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/save', datum );
      const response = await axios.post('http://127.0.0.1:4000/save', datum );
      console.log(response.data);

      // showing alert message if setting the rating was good 
      if(response.data === "SUCCESS"){
        toast.success("Rating saved !", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // saving the user opinion
  const handleOPINION = () => {

    if(asked === true) return;

    if(userPoints === 0){
      toast.error("You have used all your points !", {
        position: "top-center"
      });
      return ;
    }

    if(inputText === ""){
      toast.error("Please enter your prompt !", {
        position: "top-center"
      });
      return;
    }

    if(ratingOpinion === "0"){
      toast.error("Please enter your opinion rating about your prompt !", {
        position: "top-center"
      });
      return;
    }

    // showing alert message if opinion was not entered 
    toast.success("Opinion and prompt saved !", {
      position: "top-center"
    });

    // going top next page by seeting the variables after 5 seconds
    setTimeout(() => {
      setAsked(true)    
      // setInputText("")
    }, 2000);
  }
  
  // button on click 
  const handleAPI = async () => {
    if(inputText === ""){
      toast.error("Please enter your prompt !", {
        position: "top-center"
      });
      setResult("")
      setSrouce([])
      setReference("")
      setLabel("")
      return;
    }

    console.log("life : ",life)

    if (life === 3) {
      toast.error("You did 3 non medical questions, Please try later !", {
        position: "top-center"
      });
      // setLife(0)
      return;
    }

    await fetchData();
  }

  // a use effect method to change the text after writing
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // Handeling rating and opinion mouse events 
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleOpinionClick = (value) => {
    setRatingOpinion(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseOpinionEnter = (value) => {
    setHoverOpinion(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleMouseOpinionLeave = () => {
    setHoverOpinion(null);
  };

  const handleEnterpress = (e) => {
    if (e.key === 'Enter') {
      // Call your function here
      if( asked === true ){
        handleAPI();
        return ;
      }

      if(ratingOpinion === "0"){
        toast.error("Please enter your opinion rating about your prompt !", {
          position: "top-center"
        });
      }
    }
  };

  // calling the handleOPINION function whenever the opinion changes 
  useEffect(() => {
    if (ratingOpinion !== "0")  {
      setTimeout(() => {
        console.log("your opinion canged to : ", ratingOpinion)
        handleOPINION()
      }, 500);  
    }
  }, [ratingOpinion]);

  // calling the saveRating function whenever the rating changes 
  useEffect(() => {
    if (rating !== "0")  {
      console.log("rating : ", rating)
      saveRating()
    }
  }, [rating]);

  // function to know if the user has scrolled all the way down to the bottom of the response
  useEffect(() => {

    const handleScroll = () => {

      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight === scrolledTo ;
  
      if (isReachBottom && (userScroll === false)) {
        console.log("you scrolled until the bottom !");
        setUserScroll(true);
      }
    };
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [userScroll]);
 
  // logout
  const logout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        setUser(null);
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }

  const showLogout = () => {
    if(logged){
      setLogged(false);
      return;
    }

    setLogged(true);
  }

  const showMail = (str) => {
    return str?.slice(0, str.length-3) + '...';
  }

  // check if the user is null, we logged him out directly
  useEffect(() => {
    if (user === null) {
      console.log("User is null so we logged you out directy !");
      logout();
    }
  }, []);

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

  // response options functions
  const optionRate = () => {
    setHoverStyle({ transform: 'scale(1.09)', transition: 'transform 0.3s ease' });
    setTimeout(() => {
      setHoverStyle({ transform: 'scale(1)', transition: 'transform 0.3s ease' });
    }, 500);  
  }

  const optionCopy = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        toast.success("Text copied to clipboard!", {
          position: "top-center"
        });
      })
      .catch(err => {
        toast.error(`Failed to copy text: ${err}`, {
          position: "top-center"
        });
      });
  }

  const optionShare = () => {
    const recipient = 'a.ichou@esi-sba.dz';
    const subject =   `Hello from ${user?.email}`;
    const body = 'This is a test email sent from a React app.';
    const cc = 'cc@example.com';
    const bcc = 'bcc@example.com';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${cc}&bcc=${bcc}`;
  }

  // checking the user points and saving the new user points after every loggin
  useEffect(() => {
    checkUserPoints(); 
  }, []);

  const checkUserPoints = async () => { 

    // means that this user is the admin, so he have unlimited number of points
    if (user?.uid === "dvvkcNQ2H0OEyQCX8uiwnoLh45t2"){
      setUserPoints(99999)
      await saveUserPoints(99999)
      return 
    }

    try {
      const datum = {
        user : user?.uid,
      }
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/pointcheck', datum );
      const response = await axios.post('http://127.0.0.1:4000/pointcheck', datum );
      const points = response.data.points;
      console.log("USER POINTS ARE : ", points);

      // veriying if the user point are appove 0 so he can use the appe or not 
      if (points === -1){
        // means this is the first login to this account, so we save his points in firebase to 15 
        setUserPoints(14)
        await saveUserPoints(14)
        return
      }

      if (points === 1){
        // means that this user has spend all his points, so he cant use the model 
        setUserPoints(0)
        return
      }

      if (points - 1 > 0){
        // means that this user can use the app
        setUserPoints(points - 1)
        await saveUserPoints(points - 1)
        return
      }
   
    } catch (error) {
      console.error(error);
    }
  }

  const saveUserPoints = async (point) => {
    try {
      const datum = {
        points : point,
        user : user?.uid,
      }
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/pointsave', datum );
      const response = await axios.post('http://127.0.0.1:4000/pointsave', datum );
      console.log(response.data)

    } catch (error) {
      console.error(error);
    }
  }

  return (
 
    <>

      { asked === false ? (

        // means that the user hasn't entered his opinion yet, so we show to him the opinion page

        <div className="page-container">
         
          {/* this is the logo  */}
    
          <img className="logo" src={logoIMG} alt="Image" />

          {/*  this is the input section where we in write our information  */}
    
          <div className="input-section">

            <input
              type="text"
              className="text-input"
              placeholder="Write your health information here..."
              onKeyDown={handleEnterpress}
              value={inputText}
              onChange={handleTextChange}
            />


            {/* this is the profile and logout buttons    */}


            <div className="profile-section-notasked">

              <button className="user" onClick={showLogout}>
                  <img src={userIMG} alt="Google Logo" className="user-icon" />
                  {showMail(user?.email)}
              </button>

              {
                (logged && (
                    <button className="logout-button" onClick={logout}>
                      <img src={logoutIMG} alt="Google Logo" className="logout-icon" />
                      {/* Logout */}
                    </button>
                ))
              }
              
            </div>
              

            {/* this is the rating place */}


            {(inputText !== "") && 
            <div className="opinion-page"> 
              <p className="rating-text">
              How much is the trustworthiness of the prompt you provided ?
              </p>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={value <= (hoverOpinion || ratingOpinion) ? "active" : ""}
                    onClick={() => handleOpinionClick(value)}
                    onMouseEnter={() => handleMouseOpinionEnter(value)}
                    onMouseLeave={handleMouseOpinionLeave}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>}

          </div>
    
          <ToastContainer />
    
        </div>

      ) : (
      
        // means that the user has entered his opinion, so we show to him the model page"
        
        <div className="page-container">

          {/* this is the logo  */}
    
          <img className="logo" src={logoIMG} alt="Image" /> 
          
          {/*  this is the input section where we in write our information  */}
    
          <div className="input-section">

            <input
              type="text"
              className="text-input"
              placeholder="How i can help you today ?"
              onKeyDown={handleEnterpress}
              value={inputText}
              onChange={handleTextChange}
            />
    
            {/* this is the drop down section to select the AI model + the logout and profile buttons */}
            {/* this windowWidth variable is helping us to change the css of the drop down from absolute to relative, keeping the rest absolut */}

            { windowWidth > 1100 ? (

                <div className="profile-section">

                  <div className="profile-section-row">

                    <button className="user" onClick={showLogout}>
                          <img src={userIMG} alt="Google Logo" className="user-icon" />
                          {showMail(user?.email)}
                    </button>

                    {
                      (logged && (
                          <button className="logout-button" onClick={logout}>
                              <img src={logoutIMG} alt="Google Logo" className="logout-icon" />
                              {/* Logout */}
                          </button>
                      ))
                    }

                  </div>

                  <div className="dropdown">
                    <div className="dropdown-header" onClick={toggleDropdown}>
                      {selectedItem ? selectedItem.label : "GPT3.5"}
                      <span className="caret"></span>
                    </div>
                    {isOpen && (
                      <ul className="dropdown-menu">
                        {dropDownOptions.map(option => (
                          <li key={option.id} onClick={() => handleDropItemClick(option)}>
                            {
                              option.imageUrl ? (
                                <>
                                  <img src={option.imageUrl} />
                                  {option.label}
                                </>
                              ) : (
                                <>
                                  {option.label}
                                </>
                              )
                            }
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                </div>        

            ) : (

                <>
                  <div className="profile-section-notasked">

                    <button className="user" onClick={showLogout}>
                          <img src={userIMG} alt="Google Logo" className="user-icon" />
                          {showMail(user?.email)}
                    </button>

                    {
                      (logged && (
                          <button className="logout-button" onClick={logout}>
                              <img src={logoutIMG} alt="Google Logo" className="logout-icon" />
                              {/* Logout */}
                          </button>
                      ))
                    }

                  </div>

                  <div className="dropdown">
                    <div className="dropdown-header" onClick={toggleDropdown}>
                      {selectedItem ? selectedItem.label : "Select Model"}
                      <span className="caret"></span>
                    </div>
                    {isOpen && (
                      <ul className="dropdown-menu">
                        {dropDownOptions.map(option => (
                          <li key={option.id} onClick={() => handleDropItemClick(option)}>
                            {
                              option.imageUrl ? (
                                <>
                                  <img src={option.imageUrl} />
                                  {option.label}
                                </>
                              ) : (
                                <>
                                  {option.label}
                                </>
                              )
                            }
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>

            )}

            {/*  this is the button to click to check the infomation worth  */}
            
            <button className="analyze-button" onClick={handleAPI}>
              Check Reliability
            </button>

          </div>
  
        {/*  here is the logic of showing different componenets based on the "result" variable
        which is the response of our API */}
  
        {loading && ( 
          <div className="loading-indicator"></div> // Display loading indicator if loading state is true
        )}
  
        {/* Display result, label, source, reference, etc. */}
  
        {label === "Trustworthy" ? (

          <>
  
            <ToastContainer />
    
            {/* Modal for displaying the green alert message */}
    
            <div className="trust">
              Your information is trust worthy !
            </div>

            <div className="response">

              <div className="response-section">
                <p className="response-text">
                  {result}
                </p>

                {(source.length > 0) && (
                  <>
                    { source[0] == "{Web page is not working}" ? (
                      <p className="response-text">
                        Reference :
                        <br/> 
                        <a>{source}</a>
                      </p>
                    ) : (
                      <p className="response-text">
                        Reference :
                        <br/>
                        <a href={source} target="_blank" style={{textDecoration:'none'}} >{source}</a>
                      </p>
                    )}
                  </>
                )}  
              </div>

              <div className="response-options" >
                <img className="options-icon" onClick={optionCopy} src={copyIMG} alt="copy" />
                <img className="options-icon" onClick={handleAPI} src={regenerateIMG} alt="Regenerate" />
                <img className="options-icon" onClick={optionRate} src={rateIMG} alt="rate" />
                <img className="options-icon" onClick={optionShare} src={shareIMG} alt="share" />
              </div>

            </div>

            {/* this is the rating place */}
    
            <div className="rating-page" style={hoverStyle}> 
              <p className="rating-text">
                How much you trust our Model's generated response ?
              </p>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={value <= (hoverRating || rating) ? "active" : ""}
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                  >
                    &#9733;
                  </span>
                ))}
              </div>  
            </div>
  
          </>
        ) : label === "Doubtful" ? (
          <>
  
            <ToastContainer />
    
            {/* Modal for yellow the red alert message */}
    
            <div className="doutable">
              Your information is doutable !
            </div>
    
            {/*  We show the result of the variable so we show it, and it's directly trust worthy because we traited it in the back-end */}
    
            <div className="response">

              <div className="response-section">
                <p className="response-text">
                  {result}
                </p>
              </div>

              <div className="response-options" >
                <img className="options-icon" onClick={optionCopy} src={copyIMG} alt="copy" />
                <img className="options-icon" onClick={handleAPI} src={regenerateIMG} alt="Regenerate" />
                <img className="options-icon" onClick={optionRate} src={rateIMG} alt="rate" />
                <img className="options-icon" onClick={optionShare} src={shareIMG} alt="share" />
              </div>

            </div>

            {/* this is the rating place */}
    
            <div className="rating-page" style={hoverStyle}> 
              <p className="rating-text">
                How much you trust our Model's generated response ?
              </p>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={value <= (hoverRating || rating) ? "active" : ""}
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                  >
                    &#9733;
                  </span>
                ))}
              </div> 
            </div>
    
          </>
        ) : label === "Fake" ? (
          <>
  
            <ToastContainer />
    
            {/* Modal for displaying the red alert message */}
    
            <div className="wrong">
              Your information is fake !
            </div>
    
            {/*  We show the result of the variable so we show it, and it's directly trust worthy because we traited it in the back-end */}

            <div className="response">

              <div className="response-section">
                <p className="response-text">
                  {result}
                </p>

                {(source.length > 0) && (
                  <>
                    { source[0] == "{Web page is not working}" ? (
                      <p className="response-text">
                        Reference :
                        <br/> 
                        <a>{source}</a>
                      </p>
                    ) : (
                      <p className="response-text">
                        Reference :
                        <br/>
                        <a href={source} target="_blank" style={{textDecoration:'none'}} >{source}</a>
                      </p>
                    )}
                  </>
                )} 

              </div>

              <div className="response-options" >
                <img className="options-icon" onClick={optionCopy} src={copyIMG} alt="copy" />
                <img className="options-icon" onClick={handleAPI} src={regenerateIMG} alt="Regenerate" />
                <img className="options-icon" onClick={optionRate} src={rateIMG} alt="rate" />
                <img className="options-icon" onClick={optionShare} src={shareIMG} alt="share" />
              </div>

            </div>
       
            {/* this is the rating place */}
    
            <div className="rating-page" style={hoverStyle}> 
              <p className="rating-text">
                How much you trust our Model's generated response ?
              </p>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={value <= (hoverRating || rating) ? "active" : ""}
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                  >
                    &#9733;
                  </span>
                ))}
              </div>  
            </div>
  
          </>
        ) : result === "Please try to ask something related to to medical field... !" ? (
          <>
  
            <ToastContainer />
  
            {/* Modal for displaying the red alert message */}
            
            <div className="wrong">
              Please try to ask something related to medical field !
            </div>
  
          </>
        ) : (
          <>

            {/*  in this case, we havn't enter any info in the input text, so we show just a static text  */} 

            <ToastContainer />

          </>
        )
        }
  
        </div>

      )}
    </> 
  );
}

export default App;
