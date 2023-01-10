import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin,
    faMedium,
} from "@fortawesome/free-brands-svg-icons";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainText from "./components/Palak.svg";

const App = () => {
    const [option, setOption] = useState("about me");
    const handleTitleChange = (e) => {
        if (option == "about me") {
            setOption("back");
        } else if (option == "back") {
            setOption("about me");
        }
    };

    return (
        <div className="App">
            <div className="horizontal">
                {option === "about me" ? (
                    <div id="sidebar" className="sidebar">
                        Made With 🌼 in React.js
                    </div>
                ) : (
                    <div></div>
                )}

                <div className="App_container">
                    <Header onTitleChange={handleTitleChange} option={option} />
                    <div className="text">
                        <div className="main_text">
                            <div className="main_text_svg_div">
                                {option === "about me" ? (
                                    <div>
                                        {/* <div className="sub_text_1">
                                            about me
                                        </div> */}
                                        <img
                                            src={MainText}
                                            className="main_text_svg"
                                        ></img>
                                        <div className="sub_text">
                                            @palak001 @thestelllar
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontFamily: "Cormorant",
                                            fontSize: "25px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <p className="about_me_text">
                                            Hi there! I am Palak. <br />I am a
                                            final-year Computer Science student
                                            from NIT Kurukshetra. I will join
                                            Microsoft as a Software Engineer in
                                            the summer of 2023. Apart from
                                            coding, I love reading books. My
                                            all-time favorite book is "Surely
                                            You Are Joking Mr. Feynman". I am
                                            also into maintaining my (almost)
                                            daily journal. I like calling it my
                                            Adventure Book. Though how
                                            adventurous is a quite subjective.{" "}
                                            <br /> <br />
                                            p.s. I apologize if these flowers
                                            are a bit too much for you. I just
                                            couldn’t resist having them.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="about_me_2" onClick={handleTitleChange}>
                            {option}
                        </div>
                        <div className="icons">
                            <div style={{ padding: "10px" }}>
                                <a
                                    href="https://github.com/thestelllar"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon
                                        icon={faGithub}
                                        color="#211f22"
                                    />
                                </a>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <a
                                    href="https://www.linkedin.com/in/palak001/"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        color="#211f22"
                                    />
                                </a>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <a
                                    href="https://medium.com/@palak001"
                                    target="_blank"
                                >
                                    <FontAwesomeIcon
                                        icon={faMedium}
                                        color="#211f22"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
