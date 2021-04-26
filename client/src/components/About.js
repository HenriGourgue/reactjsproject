import React, { useState, useEffect } from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          favorites: [],
          done: false
        };
    }

    render() {
        return (
            <div>
                <h1>A propos :</h1>
            </div>
        );
    }
}

export default About;