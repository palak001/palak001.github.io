import React, { useEffect, useState } from "react";
import Flower from "./Flower";
import "./Header.css";

const Header = (props) => {
    return (
        <div className="header">
            <div className="about_me_1" onClick={props.onTitleChange}>
                <p style={{ cursor: "pointer" }}>{props.option}</p>
            </div>
            <Flower value="flower-top-svg-container" />
        </div>
    );
};

export default Header;
