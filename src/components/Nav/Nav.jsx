import React from "react";

export default class Nav extends React.Component {
    render () {
        return (
            <nav className="nav">
              <label className="site-title">
                NFCONTROL
              </label>
              <ul>
                <a href="https://nokerr21.github.io/nfcontrol/">About</a>
              </ul>
            </nav>
        );
    }
}