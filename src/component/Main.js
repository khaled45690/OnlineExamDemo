import React, { Component } from 'react';
import {Link} from "react-router-dom";
import image from "../img/slider/MainPhoto.jpg"
import Button from '@material-ui/core/Button';
class Main extends Component {

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

    render() {
        return (
            <div className="Main" >
                <div className="slider-area">
                    <div className="preview-2">
                        <div id="nivoslider" className="slides ">
                            <img src={image} className="size" alt="" title="slider-1-caption1" />
                        </div>
                        <div id="slider-1-caption1" className="slider-position txt">
                            <div className="banner-content slider-1">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="text-content-wrapper">
                                                <div className="text-content">
                                                    <h1 className="title1 wow fadeInUp underline" data-wow-duration="2000ms" data-wow-delay="0s">نموذج الأمتحان  </h1>
                                                    <p className="sub-title wow fadeInUp hidden-sm hidden-xs" data-wow-duration="2900ms" data-wow-delay=".5s">تطوير نظام التقدير والتقييم والتصحيح الإلكترونى لما يقرب من 125 مليون اختبار عبر شبكة الإنترنت "On Line" على مدار أربع سنوات. </p>
                                                    <div className="banner-readmore wow fadeInUp" data-wow-duration="3600ms" data-wow-delay=".6s">
                                                        <Link to ="signin-student" ><Button className="LOGBTN">دخول الطلاب</Button></Link>
                                                        <Link to ="signin-teacher"><Button  className="LOGBTN"> دخول المدرس </Button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="about-area">
                    <div className="container">
                        <div className="row">
                            <div className="reposi">
                                <div className="about-container">
                                    <h3>ما موقعنا ؟</h3>
                                    <p>تطوير نظام التقدير والتقييم والتصحيح الإلكترونى لما يقرب من 125 مليون اختبار عبر شبكة الإنترنت "On Line" على مدار أربع سنوات.</p>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;