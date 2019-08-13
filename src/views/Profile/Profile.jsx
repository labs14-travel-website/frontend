import React, { useState, useEffect } from "react";
// import feature from "../../utils/flaggie";

function Profile() {
    const [flags, setFlags] = useState({});
    const [loading, setLoading] = useState(true);
    // const Feature = feature(flags, loading);

    useEffect(() => {
        const getFlags = async () => {
            const promise = new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        button: false, // false will remove the button element from being clickable
                        click: false, // if button true but click false, this means the code inside the callback will not render
                        hello: false // the switch feature will switch between 2 JSX elements
                    });
                }, 500);
            });

            setFlags(await promise);
            setLoading(false);
        };

        getFlags();
    }, []);

    // const handleClick = Feature.fn("click", () => {
    //     console.log("Feature Clickable?");
    // });

    return (
        <div>
            <h1>Nguyen Vo</h1>
            <h2>Favorites</h2>


            {/* <Feature.Switch flag="hello">
                <>
                    <p>Hello</p>
                    <b>World</b>
                </>
                <div>
                    <p>Hello</p>
                    <b>React</b>
                </div>
            </Feature.Switch>
            <Feature.Toggle flag="button">
                <div>Button</div>
                <input type="button" value="One Two" onClick={handleClick} />
            </Feature.Toggle> */}
        </div>
    );
}

export default Profile;
