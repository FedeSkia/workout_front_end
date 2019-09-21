import React from "react";
import PropTypes from "prop-types";

const Label = ({ text }) => {
    const [backgroundColour, setBackgroundColour] = React.useState("inherit");
    const updateTimer = React.useRef(null);
    console.log("Rendering Label backgorund color:");
    console.log(backgroundColour);

    function setUpdate() {
        console.log("setUpdate");
        setBackgroundColour("#9b34ee");
        updateTimer.current = setTimeout(() => {
            setBackgroundColour("inherit");
            updateTimer.current = null;
        }, 1000);
    }

    React.useEffect(() => {
        console.log("useEffect");
        return () => {
            if (updateTimer.current) {
                clearTimeout(updateTimer.current);
            }
        };
    }, []);

    React.useEffect(() => {
        console.log("useEffect");
        if (!updateTimer.current) setUpdate();
    }, [text]);

    return (
        <span className="label-text" style={{ backgroundColor: backgroundColour }}>
            {text}
        </span>
    );
};

Label.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Label;
