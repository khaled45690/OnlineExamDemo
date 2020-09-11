import React, { Component } from 'react';

import { SharedData } from '../../SharedData/Shareddata'
class HandelTheAnswer extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            x: 1,
            g: 0,
            question_names: {"MainQ1":'الاول',"MainQ2":"الثانى","MainQ3": "الثالث","MainQ4": "الرابع"},
            question_name: ['أ', "ب", "ج", "د"],
           
        }
    }

    imageURl = (e) => {
        var html = '<html>' +
            '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
            '<body>' +
            '<iframe src="' + e.target.src + '"></iframe>' +
            '</body></html>';
        var x = window.open();
        x.document.open();
        x.document.write(html);
        x.document.close();
        // window.open(e.target.src , "_blank");

    }

    handy = (e) => {
        if (e.target.value === '0') {
            this.QText.style.display = "block"
            this.Qimage.style.display = "none"
        } else {
            this.QText.style.display = "none"
            this.Qimage.style.display = "block"
        }

    }
    Loaded =()=>{
        console.log("Looooooooaded");
        
    }

    render() {
        return (
            <SharedData.Consumer>{(context) => {
                let {SetAnswer , ExamQ} = context
                let Exam = this.props.ExamInfo.Exam;
                let Examname = this.props.ExamInfo.Exam.name
                return (<div>
                    {/* this is the first loop to show the main questions in the exam page  */}
                    <div><h1 class="head text-center"> {Examname}</h1></div>
                    {Object.keys(Exam).map((key1, i) => {
                        if(this.props.check){
                            this.props.CheckFunc();
                            SetAnswer(Exam);
                        }
                        if(key1 === "name"){
                        }else{
                        let Var1 = Exam[key1];
                        return (<div>  <h2 class="head " style={{ textAlign: "right" , color:"blue" }}><b>السؤال {this.state.question_names[key1]}:-</b></h2>
                            {/* this is the second loop to show the questions in the exam page  */}
                            {

                                Object.keys(Var1).map((key2, i) => {
                                    let Var2 = Var1[key2]

                                    return (<div className="question_types" style={{ display: "block" }} on={this.Loaded}>
                                        <div className="question-form" style={{ display: "block" }} ref={(el) => { this.Fo = el }}>
                                            <h3 style={{color:"red"}}class="head">{ this.state.question_name[i] + " - " + Var2["QType"] }</h3>
                                            {
                                                Object.keys(Var2).map((key3, i) => {
                                                    if (key3 === "QType") {
                                                        //this to escape the QType variable that i don't want to use
                                                    } else {

                                                        // this for the other Qi variables that i use
                                                        let Var3 = Var2[key3]
                                                        let Var4 = Var3["Question"];
                                                        if (Var4) {
                                                            // this is to check if the question object is there
                                                            if (Var4["image"]) {
                                                                // this code for the image question if exists
                                                                if (Var3["choice"]) {
                                                                    // if the question of image has choices then this code will run
                                                                    let choice = Var3["choice"];

                                                                    return (<div>
                                                                        <a rel="" href={Var4["image"]} target='_blank'  rel="noopener noreferrer" > {i + "-"} <img  alt="" style={{ width: "80%", height: "100px" }} onClick={this.imageURl} src={Var4["image"]}></img></a>
                                                                        <div className="choiceflex">
                                                                            {Object.keys(choice).map((key, i) => {
                                                                                let choiceitem = choice[key];
                                                                                if (choiceitem["image"]) {
                                                                                    // if this choicese have images this code will run                                                                        
                                                                                    return (<div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                        <input className="choiceradio" type="radio"  name={key1 + " " + key2 + " " + key3} value="1" />
                                                                                        <a rel="" href={choiceitem["image"]} target='_blank'  rel="noopener noreferrer" ><img  alt="" class="form-control choice-input " onClick={this.imageURl} src={choiceitem["image"]}></img></a>
                                                                                    </div>)

                                                                                } else {
                                                                                    // if this choicese have text this code will run  
                                                                                    

                                                                                    return (
                                                                                        <div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                            <input className="choiceradio" type="radio"  name={key1 + " " + key2 + " " + key3} value="1" />
                                                                                            <h4 class="form-control choice-input " var1={key1} var2={key2} var3={this.props.subQ} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="1" var7="QType" >{choice[key]}</h4>

                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            })}
                                                                        </div>
                                                                    </div>)
                                                                } else {

                                                                    return (<div>
                                                                        <a rel="" href={Var4["image"]} target='_blank'  rel="noopener noreferrer" > {i + "-"} <img  alt="" style={{ width: "80%", height: "200px" }} onClick={this.imageURl} src={Var4["image"]}></img></a>
                                                                        {/* <fieldset style={{ width: "450px" }} >
                                                                            <label ><h3>{"- اختر طريقة اضافة الاجابة->"}</h3></label>
                                                                            <select onChange={(e) => { this.handy(e) }} className="myList1">
                                                                                <option value="0">نص</option>
                                                                                <option value="1">صورة</option>

                                                                            </select>
                                                                        </fieldset> */}
                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", marginTop: "20px" }} ref={(el) => { this.QText = el }}>
                                                                            <input type="text" class="form-control question-input " var1={key1} var2={key2} var3={this.props.subQ} var4="Question" var5={this.state.QName} var7="QType" placeholder="ادخل الالاجابة " />

                                                                        </div>
                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Qimage = el }}>
                                                                            <div style={{ display: "flex" }}>
                                                                                <h4 style={{ width: "400px", marginTop: "20px" }} class=""  >اضف صورة للسؤال بدل السؤال النصى:-></h4>
                                                                                <div class="box">
                                                                                    <input style={{ display: "none" }} var1={key1} var2={key2} var3={this.props.subQ} var4="Question" var5={this.state.QName} type="file" var7="QType" id={"AnswerStudent" + " " + key1 + " " + key2 + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                                                                    <label for={"AnswerStudent" + " " + key1 + " " + key2 + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>);

                                                                }
                                                            } else {
                                                                let Answer = Var3["Answer"]
                                                                let choice = Var3["choice"];
                                                                if (Answer) {
                                                                    let MainQ = key1
                                                                    let Q = key2
                                                                    let subQ = key3
                                                                    // this code will run if the answer is added to the exam
                                                                    if (Answer["sub1"]) {
                                                                       // this code will run if there is multiple answers like complete
                                                                        return (<div>
                                                                            <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                            <div className="choiceflex">
                                                                            {Object.keys(Answer).map((key, i) => {
                                                                               
                                                                                return (<div>
                                                                                    <input type="text" class="form-control complete-input " var1={MainQ} var2={Q} var3={subQ} var4="StudentAnswer" var5={Var2["QType"]} var6={key} var7="QType" onChange={ExamQ} placeholder="ادخل الالاجابة " />
                                                                                </div>)
                                                                                
                                                                            })}
                                                                            </div>
                                                                        </div>)
                                                                    } else if (choice) {
                                                                        return (<div>
                                                                            <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                            <div className="choiceflex">
                                                                                {Object.keys(choice).map((key, i) => {
                                                                                    let choiceitem =choice[key]; 
                                                                                    if (choiceitem["image"]) {
                                                                                        return (<div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                        <input className="choiceradio" type="radio"  name={key1 + " " + key2 + " " + key3} value="1" />
                                                                                        <a rel="" href={choiceitem["image"]} target='_blank'  rel="noopener noreferrer" ><img  alt="" class="form-control choice-input " onClick={this.imageURl} src={choiceitem["image"]}></img></a>
                                                                                    </div>)
                                                                                    }else{
                                                                                    return (<div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                        <input className="choiceradio" type="radio" name={key1 + " " + key2 + " " + key3} var1={MainQ} var2={Q} var3={subQ} var4="StudentAnswer" var5={Var2["QType"]} var7="QType" onChange={ExamQ} value={i+1} />
                                                                                        <h4 class="form-control choice-input " >{choice[key]}</h4>

                                                                                    </div>)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                })}
                                                                            </div>
                                                                        </div>)

                                                                    } else if (Answer === "true" || Answer === "false") {
                                                                        let MainQ = key1
                                                                        let Q = key2
                                                                        let subQ = key3
                                                                        // this code is for teur or false question as the form of the question will be different
                                                                        return (<div>
                                                                            <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                            <div style={{display:"flex"}} >
                                                                                <section>
                                                                                    <input type="radio" style={{marginTop:"10px"}} name={"name " + key1 + " " + key2 + " " + key3 } var1={MainQ} var2={Q} var3={subQ} var4="StudentAnswer" var5={Var2["QType"]} var7="QType" onChange={ExamQ}  value="true"/>
                                                                                    <b style={{marginRight:"10px"}}>صح</b>
                                                                                </section>
                                                                                <section style={{marginRight:"30px"}}>
                                                                                    <input type="radio" style={{marginTop:"10px"}} name={"name " + key1 + " " + key2 + " " + key3} var1={MainQ} var2={Q} var3={subQ} var4="StudentAnswer" var5={Var2["QType"]} var7="QType" onChange={ExamQ}  value="false"/>
                                                                                    <b style={{marginRight:"10px"}}>خطأ</b>
                                                                                </section>
                                                                            </div>

                                                                        </div>)
                                                                    } else {
                                                                        let MainQ = key1
                                                                        let Q = key2
                                                                        let subQ = key3
                                                                        // this code will run if it is normal question with normal text
                                                                        return (<div>
                                                                            <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                            {/* <fieldset style={{ width: "450px" }} >
                                                                            <label ><h3>{"- اختر طريقة اضافة الاجابة->"}</h3></label>
                                                                            <select onChange={(e) => { this.handy(e) }} className="myList1">
                                                                                <option value="0">نص</option>
                                                                                <option value="1">صورة</option>

                                                                            </select>
                                                                        </fieldset> */}
                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", marginTop: "20px" }} ref={(el) => { this.QText = el }}>
                                                                            <input type="text" class="form-control question-input " var1={MainQ} var2={Q} var3={subQ} var4="StudentAnswer" var5={Var2["QType"]} var7="QType" onChange={ExamQ} placeholder="ادخل الالاجابة " />

                                                                        </div>
                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Qimage = el }}>
                                                                            <div style={{ display: "flex" }}>
                                                                                <h4 style={{ width: "400px", marginTop: "20px" }} class=""  >اضف صورة للسؤال بدل السؤال النصى:-></h4>
                                                                                <div class="box">
                                                                                    <input style={{ display: "none" }} var1={key1} var2={key2} var3={this.props.subQ} var4="Question" var5={this.state.QName} type="file" var7="QType" id={"AnswerStudent" + " " + key1 + " " + key2 + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                                                                    <label for={"AnswerStudent" + " " + key1 + " " + key2 + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                                                                </div>

                                                                            </div>
                                                                        </div>
                                    

                                                                        </div>)
                                                                    }

                                                                } else {
                                                                    return (<div>
                                                                        <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                        <h3> لقد نسيت وضع اجابة ارجوك عد و ضعها </h3>

                                                                    </div>)

                                                                }

                                                            }
                                                        } else {

                                                        }
                                                    }
                                                }
                                                )

                                            }
                                            <div class="form-group">
                                            </div>
                                        </div>
                                    </div>);
                                })

                            }
                        </div>);
            }})}
                </div>);

            }}</SharedData.Consumer>
        );
    }
}

export default HandelTheAnswer;