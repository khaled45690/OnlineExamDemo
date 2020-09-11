import React, { Component } from 'react';
import { Link } from "react-router-dom";
import image from "../img/icon/cap-dark.jpg"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



import Cookies from 'universal-cookie';
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory({
    forceRefresh: true
});



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
      appBar: {
        top: 'auto',
        bottom: 0,
      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
    root: {
      background: props =>
        props.color === 'red'
          ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: props =>
        props.color === 'red'
          ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
          : '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      height: 35,
      padding: '0 30px',
      margin: 8,     
    },
  });
  
  function MyButton(props) {
    const { color, ...other } = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />;
  }



MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
  };

class Header extends Component {




    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
             server: '/',
            returned: '',
            user_id: '',
            Categorys: []
        }
    }


    Header = () => {
        const cookies = new Cookies();
        console.log(cookies.get('AccountType'));
        let AccountType = cookies.get('AccountType');
        if (AccountType === "Student") {
            return (
                <div className="Header">
                    <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                        < Link to="/"  className="current"> <MyButton color="blue"  var1="i did it" >
                         <strong className="current-fontsize"  > الرئيسيه </strong>
                        </MyButton> </Link>
                        < Link to="/Student-Profile"  className="current"> <MyButton  color="blue" var1="i did it" >
                         <strong className="current-fontsize"  > الصفحه الشخصيه </strong>
                        </MyButton> </Link>
                        < div className="current" onClick={this.SignOut} > <MyButton   color="blue"  var1="i did it">
                         <strong  className="current-fontsize"  > تسجيل خروج </strong>
                        </MyButton> </div>
                    </Tabs>
                    <div className="logo" >
                            <h1 >CloudExam</h1>
                        </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
                </div>
            );
        } else if (AccountType === "Teacher") {
            return (
                <div className="Header">
                    <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                        < Link to="/"  className="current"> <MyButton color="blue"  var1="i did it" >
                         <strong className="current-fontsize"  > الرئيسيه </strong>
                        </MyButton> </Link>
                        < Link to="/Teacher-Profile"  className="current"> <MyButton  color="blue" var1="i did it" >
                         <strong className="current-fontsize"  > الصفحه الشخصيه </strong>
                        </MyButton> </Link>
                        <div className="current"  onClick={this.SignOut} > <MyButton color="blue"  var1="i did it">
                         <strong className="current-fontsize"  > تسجيل خروج </strong>
                        </MyButton> </div>
                    </Tabs>
                    <div className="logo"  >
                            <h1 >CloudExam</h1>
                        </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
                </div>
            );
        } else {
            return (
                <div className="Header">
                    <CssBaseline />
            <AppBar>
                <Toolbar>
                <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                < Link to="/"> <MyButton color="blue"  var1="i did it" >
                         <strong className="current-fontsize"  > الرئيسيه </strong>
                        </MyButton> </Link>
                        </Tabs>
                    <div className="logo" style={{display:"flex"}}>
                            <h1>CloudExam</h1>
                        </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
                </div>
            );
        }
    }





    DesignPurpose = () => {
    
        return (<div>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                        < Link to="/"> <MyButton color="blue"  var1="i did it" >
                         <strong className="current-fontsize"  > الرئيسيه </strong>
                        </MyButton> </Link>
                        < Link to="/Teacher-Profile"> <MyButton  color="blue" var1="i did it" >
                         <strong className="current-fontsize"  > الصفحه الشخصيه </strong>
                        </MyButton> </Link>
                        < Link to="/"> <MyButton   color="blue"  var1="i did it">
                         <strong className="current-fontsize"   > تسجيل خروج </strong>
                        </MyButton> </Link>
                    </Tabs>
                </Toolbar>
            </AppBar>
          
            <Toolbar />
        </div>
        );
    }


    SignOut = (e) => {
        console.log("enteeeereeeeed");
        const cookies = new Cookies();
        cookies.remove('AccountType' , { path: '/' });


        setTimeout(() => {
            history.push('/');
        }, 1000);
      
    }
    render() {
        return (<div>
            {/* {this.Header()} */}
            {this.DesignPurpose()}
        </div>)
    }
}

export default Header;