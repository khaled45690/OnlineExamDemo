import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Footer extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
              server: ' http://localhost:3001/',
            returned: '',
            user_id: '',
            Categorys:[]
        }
    }

    render() {
         
        return (

                <footer class="footer">
                <div className="footerdiv">
                <div>
                <p className="footerp"> this website is still under development,</p>
                <a href = "https://www.facebook.com/khaled45690"><p className="footerp"> development copyright &copy; is for Khaled Saad</p></a>
                </div>
                </div>
  
                </footer>



        );
    }
}

export default Footer;