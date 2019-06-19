import React, { Component } from "react";
import Motors from "./Motors";

import AnotherStuff from "./AnotherStuff";
import "./style.css";

class ForumMain extends Component {
  render() {
    return (
      <div className="forum">
        <table>
          <tbody>
            <tr>
              <th>Forum</th>
              <th>Themes</th>
              <th>Messages</th>
              <th>The Last Message</th>
            </tr>
            <tr>
              <th>Motors</th>
            </tr>
            <Motors />
            <tr>
              <th>Another Stuff</th>
            </tr>
            <AnotherStuff />
          </tbody>
        </table>
      </div>
    );
  }
}

export default ForumMain;
