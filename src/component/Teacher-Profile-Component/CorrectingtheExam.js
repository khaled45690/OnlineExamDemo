import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { SharedData } from '../../SharedData/Shareddata'
import { createBrowserHistory } from 'history'
import { resolve } from 'react-equation';
export const history = createBrowserHistory({
  forceRefresh: true
});
class HandelTheAnswer extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
             server: '/',
            x: 1,
            g: 0,
            question_names: { "MainQ1": 'الاول', "MainQ2": "الثانى", "MainQ3": "الثالث", "MainQ4": "الرابع" },
            question_name: ['أ', "ب", "ج", "د"],
            ExamInfo: {},
            check: false ,
            degree:0 ,
            total:0,
            TrueCheck:true

        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        let AnswerId = cookies.get('AnswerId');
        fetch(this.state.server + "GetAnswer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(AnswerId)
        }).then((result) => { return result.json(); }).then((result) => {
            console.log(result);
            let Exam = result.Exam
            Promise.all(
                Object.keys(result.Exam).map((key1 , p1)=>{
                 
                    return(
                        new Promise(function(resolve){
                            let Var1 = Exam[key1]
                            resolve(Object.keys(Var1).map((key2 , p2)=>{
                                return(new Promise(function(resolve){
                                    let Var2 = Var1[key2]

                                    resolve(Object.keys(Var2).map((key3 , p3)=>{
                                        let Var3 = Var2[key3]
                                        return( new Promise(function(resolve){
                                            if(key3 === "QType" || key3 === "CorrectionType"){
                                                resolve("done")
                                            }else{
                                                resolve(Object.keys(Var3).map((key4 , p4)=>{
                                                    return(
                                                        new Promise(function(resolve){
                                                            console.log(Var3["choice"]);
                                                            
                                                            if(Var3["choice"]){

                                                                console.log(Var3["Answer"] + " "+ Var3["StudentAnswer"]);
                                                                console.log(Var3["Answer"] === Var3["StudentAnswer"]);
                                                                
                                                                if(Var3["Answer"] === Var3["StudentAnswer"]){
                                                                    let Exam = result.Exam
                                                                    let Var1 = Exam[key1]
                                                                    let Var2 = Var1[key2]
                                                                    let Var3 = Var2[key3]
                                                                    result = {...result , Exam :{...result.Exam , 
                                                                    [key1] : {...Var1 , [key2] : {...Var2 , [key3] : {...Var3 , ["GivenDegree"] : Var3["degree"]}}}}}
                                                                    resolve (result)
                                                                }else{
                                                                    let Exam = result.Exam
                                                                    let Var1 = Exam[key1]
                                                                    let Var2 = Var1[key2]
                                                                    let Var3 = Var2[key3]
                                                                    result = {...result , Exam :{...result.Exam , 
                                                                    [key1] : {...Var1 , [key2] : {...Var2 , [key3] : {...Var3 , ["GivenDegree"] : 0}}}}}
                                                                    resolve (result)
                                                                }
                                                          
                                                            }else if(Var3["Answer"] === "true" || Var3["Answer"] === "false"){
                                                                console.log(Var3["Answer"] + " "+ Var3["StudentAnswer"]);
                                                                console.log(Var3["Answer"] === Var3["StudentAnswer"]);
                                                                console.log(key3);
                                                                
                                                                if(Var3["Answer"] === Var3["StudentAnswer"]){
                                                                    console.log("entereeeeeeeeeeeeeeeeeeedddd");
                                                                    let Exam = result.Exam
                                                                    let Var1 = Exam[key1]
                                                                    let Var2 = Var1[key2]
                                                                    let Var3 = Var2[key3]
                                                                    result = {...result , Exam :{...result.Exam , 
                                                                    [key1] : {...Var1 , [key2] : {...Var2 , [key3] : {...Var3 , ["GivenDegree"] : Var3["degree"]}}}}}
                                                                    resolve (result)
                                                                    console.log(result);
                                                                    
                                                                
                                                                }else{
                                                                    let Exam = result.Exam
                                                                    let Var1 = Exam[key1]
                                                                    let Var2 = Var1[key2]
                                                                    let Var3 = Var2[key3]
                                                                    
                                                                    result = {...result , Exam :{...result.Exam , 
                                                                    [key1] : {...Var1 , [key2] : {...Var2 , [key3] : {...Var3 , ["GivenDegree"] : 0}}}}}
                                                                    resolve (result)
                                                                    console.log(result);
                                                                }
                                                            }
                                                        })
                                                    )
                                                }))
                                                
                                            }
                                        
                                        }))
                                    }))
                                }))
                            }))
                        }).then((data)=>{
                            console.log(result);
                            
                            this.setState({
                                ExamInfo: result,
                                check: true,
                            })
                        })
                    )
                    

                })
            )

        })
    }
    tagraba =()=>{
        console.log("the waited time has finished");
        
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
    Loaded = () => {
        console.log("Looooooooaded");

    }

    CheckFunc = () => {
        console.log("Check has been turned to false");

        this.setState({
            check: false
        })
    }
    button = (Exam) => {

        return (<button className="ExamChecking" onClick={() => { this.CheckForAnswerMissing(Exam) }}>تسجيل النتيجة</button>)
    }


    CheckForAnswerMissing = (Exam) => {
        let data = Promise.all(
            Object.keys(Exam).map((key1, p1) => {
                if (key1 === "name") {

                } else {
                    let Var1 = Exam[key1]
                    return (new Promise((resolve) => {
                        resolve(Object.keys(Exam[key1]).map((key2, p2) => {
                            let Var2 = Var1[key2];
                            return new Promise((resolve) => {
                                Object.keys(Var2).map((key3, p3) => {
                                    if (key3 === "CorrectionType" || key3 === "QType") {

                                    } else {
                                        let Var3 = Var2[key3]
                                        resolve(Object.keys(Var3).map((key4, p4) => {
                                            return (new Promise((resolve) => {
                                                let Var4 = Var3[key4]
                                                console.log(key4);
                                                console.log(Var3["GivenDegree"]);

                                                if (Var3["GivenDegree"]) {
                                                    
                                                    if(Var3["GivenDegree"] <= Var3["degree"]){
                                                        this.setState((prevstate) => ({
                                                            err: { ...prevstate.err, [key3]: "clear" }
                                                        }))
                                                        resolve("done");
                                                    }
                                               
                                                    console.log();

                                                } else {
                                                    resolve([key1, key2, key3]);
                                                    this.setState((prevstate) => ({
                                                        err: { ...prevstate.err, [key3]: "something missing" }
                                                    }))
                                                }
                                            })
                                            )
                                        }))
                                    }

                                })
                            })
                        }))
                    }
                    ))
                }

            })
        )


        data.then((data) => {
            console.log(data);
            console.log(this.state.err);
            let x = Object.keys(this.state.err).map((key, p) => {
                if (this.state.err[key] === "clear") {
                    return true
                } else {
                    return false
                }
            })
            if (x.every(o => o === true)) {
   
                let Rdata = Promise.all(
                    Object.keys(Exam).map((key1, p1) => {
                        if (key1 === "name") {
        
                        } else {
                            let Var1 = Exam[key1]
                            return (new Promise((resolve) => {
                                resolve(Object.keys(Exam[key1]).map((key2, p2) => {
                                    let Var2 = Var1[key2];
                                    return new Promise((resolve) => {
                                        Object.keys(Var2).map((key3, p3) => {
                                            if (key3 === "CorrectionType" || key3 === "QType") {
        
                                            } else {
                                                let Var3 = Var2[key3]
                                                resolve(Object.keys(Var3).map((key4, p4) => {
                                                    return (new Promise((resolve) => {
                                                       
                                                        console.log(key4);
                                                        console.log(Var3["StudentAnswer"]);
                                                        if(key4 === "GivenDegree"){
                                                            let Var4 = Var3["degree"]
                                                            let Var5 =  Var3["GivenDegree"]
                                                            if(Var4["sub1"]){
                                                                resolve(Object.keys(Var4).map((key5 , P5)=>{
                                                                    return(new Promise((resolve)=>{
                                                                        if(Var5[key5] <= Var4[key5]){
                                                                            this.setState((prevstate) => ({
                                                                                degree: (parseFloat(prevstate.degree) + parseFloat(Var5[key5])) , 
                                                                                total : (parseFloat(prevstate.total) + parseFloat(Var4[key5]))
                                                                            }) , ()=>{
                                                                                resolve("done")
                                                                            })
                                                                        }
                                                                
                                                                    }))
                                                                }))
                                                            }else{
                                                                console.log(Var4);
                                                                
                                                                this.setState((prevstate) => ({
                                                                    degree: (parseFloat(prevstate.degree) + parseFloat(Var5)) , 
                                                                    total : (parseFloat(prevstate.total) + parseFloat(Var4))
                                                                }) , ()=>{
                                                                    resolve("done")
                                                                })
                                                            }
                                                        }
                                                       

                                                       
                                                    })
                                                    )
                                                }))
                                            }
        
                                        })
                                    })
                                }))
                            }
                            ))
                        }
        
                    })
                )
   
                Rdata.then(()=>{
                    console.log(this.state.degree + " " + this.state.total);
                    console.log(parseFloat((this.state.degree / this.state.total)*100).toFixed(2));
                    console.log(this.state.ExamInfo);
                    
                    const cookies = new Cookies();
                    let UserId = cookies.get('UserId');
                    let UserName = cookies.get('UserName');
                    let data = {
                        ExamId: this.state.ExamInfo.ExamId,
                        AnswerId:this.state.ExamInfo._id ,
                        SubjectName: this.state.ExamInfo.SubjectName,
                        academic_year: this.state.ExamInfo.academic_year,
                        Exam: Exam,
                        StudentId: this.state.ExamInfo.StudentId,
                        TeacherId: this.state.ExamInfo.TeacherId,
                        StudentName: this.state.ExamInfo.StudentName,
                        Examname: this.state.ExamInfo.Examname,
                        DegreePercentage: parseFloat((this.state.degree / this.state.total)*100).toFixed(2),
    
                    }
    
                        history.push('/Teacher-Profile');

                    console.log(data);
    
                    fetch(this.state.server + "SaveResult", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    }).then((result) => { return result.json(); }).then((result) => {
                        console.log(result);
                    })

                })
   

            }


        })

    }


    render() {
        return (
            <SharedData.Consumer>{(context) => {
                let { SetAnswer, ExamQ , Exam , ExamQuestion} = context
                let Examz = this.state.ExamInfo.Exam;
                let Examname = this.state.ExamInfo.name
                if (Examz) {
                    return (
                        <section className="color-white" >
                            <div class="container">
                                <div class="row ask" >
                                    <div class="board" style={{ marginTop: "10px", marginBottom: "5px" }}>
                                        <div ref={(el) => { this.ShowingExam = el }}  >
                                            <div>
                                                {/* this is the first loop to show the main questions in the exam page  */}
                                                <div><h1 class="head text-center"> {Examname}</h1></div>
                                                {Object.keys(Examz).map((key1, i) => {
                                                    if (this.state.check) {
                                                        this.CheckFunc();
                                                        SetAnswer(Examz);
                                                    }
                                                    if (key1 === "name") {
                                                    } else {
                                                        let Var1 = Examz[key1];
                                                        return (<div>  <h2 class="head " style={{ textAlign: "right", color: "blue" }}><b>السؤال {this.state.question_names[key1]}:-</b></h2>
                                                            {/* this is the second loop to show the questions in the exam page  */}
                                                            {

                                                                Object.keys(Var1).map((key2, i) => {
                                                                    let Var2 = Var1[key2]

                                                                    return (<div className="question_types" style={{ display: "block" }} on={this.Loaded}>
                                                                        <div className="question-form" style={{ display: "block" }} ref={(el) => { this.Fo = el }}>
                                                                            <h3 style={{ color: "red" }} class="head">{this.state.question_name[i] + " - " + Var2["QType"]}</h3>
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
                                                                                                        <a rel="" href={Var4["image"]} target='_blank' rel="noopener noreferrer" > {i + "-"} <img alt="" style={{ width: "80%", height: "100px" }} onClick={this.imageURl} src={Var4["image"]}></img></a>
                                                                                                        <div className="choiceflex">
                                                                                                            {Object.keys(choice).map((key, i) => {
                                                                                                                let choiceitem = choice[key];
                                                                                                                if (choiceitem["image"]) {
                                                                                                                    // if this choicese have images this code will run                                                                        
                                                                                                                    return (<div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                                                        <input className="choiceradio" type="radio" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="1" />
                                                                                                                        <a rel="" href={choiceitem["image"]} target='_blank' rel="noopener noreferrer" ><img alt="" class="form-control choice-input " onClick={this.imageURl} src={choiceitem["image"]}></img></a>
                                                                                                                    </div>)

                                                                                                                } else {
                                                                                                                    // if this choicese have text this code will run  


                                                                                                                    return (
                                                                                                                        <div className="choicediv" style={{ marginTop: "20px" }}>
                                                                                                                            <input className="choiceradio" type="radio" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="1" />
                                                                                                                            <h4 class="form-control choice-input " var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="1" var7="QType" >{choice[key]}</h4>

                                                                                                                        </div>
                                                                                                                    )
                                                                                                                }

                                                                                                            })}
                                                                                                        </div>
                                                                                                    </div>)
                                                                                                } else {

                                                                                                    return (<div>
                                                                                                        <a rel="" href={Var4["image"]} target='_blank' rel="noopener noreferrer" > {i + "-"} <img alt="" style={{ width: "80%", height: "200px" }} onClick={this.imageURl} src={Var4["image"]}></img></a>
                                                                                                        <fieldset style={{ width: "450px" }} >
                                                                                                            <label ><h3>{"- اختر طريقة اضافة الاجابة->"}</h3></label>
                                                                                                            <select onChange={(e) => { this.handy(e) }} className="myList1">
                                                                                                                <option value="0">نص</option>
                                                                                                                <option value="1">صورة</option>

                                                                                                            </select>
                                                                                                        </fieldset>
                                                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", marginTop: "20px" }} ref={(el) => { this.QText = el }}>
                                                                                                            <input type="text" class="form-control question-input " var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Question" var5={this.state.QName} var7="QType" placeholder="ادخل الالاجابة " />

                                                                                                        </div>
                                                                                                        <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Qimage = el }}>
                                                                                                            <div style={{ display: "flex" }}>
                                                                                                                <h4 style={{ width: "400px", marginTop: "20px" }} class=""  >اضف صورة للسؤال بدل السؤال النصى:-></h4>
                                                                                                                <div class="box">
                                                                                                                    <input style={{ display: "none" }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Question" var5={this.state.QName} type="file" var7="QType" id={"AnswerStudent" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                                                                                                    <label for={"AnswerStudent" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

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
                                                                                                                    let Answer = Var3["Answer"];
                                                                                                                    let StudentAnswer = Var3["StudentAnswer"];
                                                                                                                    let degree = Var3["degree"];
                                                                                                                    console.log(Answer[key]);
                                                                                                                    let MainQ = key1
                                                                                                                    let Q = key2
                                                                                                                    let subQ = key3

                                                                                                                    return (<div>
                                                                                                                        <h4 style={{ display: "flex" }}>{"اجابة المدرس هى:->  " + Answer[key]}</h4>

                                                                                                                        <h4 style={{ display: "flex" }}>{"اجابة الطالب هى:->  " + StudentAnswer[key]}</h4>
                                                                                                                        <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + degree[key]}</h4>
                                                                                                                        <div style={{display:"flex"}}>
                                                                                                                        <label ><h4>اختر الدرجة-></h4></label>
                                                                                                                        <fieldset style={{ width: "120px" }} >
                                                                                                                            <select var1={MainQ} var2={Q} var3={subQ} var4="GivenDegree" var5={Var2["QType"]} var6={key} var7="QType" onChange={ExamQ} className="myList">
                                                                                                                                <option value="0">0</option>
                                                                                                                                <option value="0.5">0.5</option>
                                                                                                                                <option value="1">1</option>
                                                                                                                                <option value="1.5">1.5</option>
                                                                                                                                <option value="2">2</option>
                                                                                                                                <option value="2.5">2.5</option>
                                                                                                                                <option value="3">3</option>

                                                                                                                            </select>
                                                                                                                        </fieldset> </div>
                                                                                                                    </div>)

                                                                                                                })}
                                                                                                            </div>
                                                                                                        </div>)
                                                                                                    } else if (choice) {
                                                                                                        if(Var3["Answer"] === Var3["StudentAnswer"]){
                                                                                                            let degree = Var3["degree"];
                                                                                                            let MainQ = key1
                                                                                                            let Q = key2
                                                                                                            let subQ = key3
                                                                                                            // setTimeout(() => {
                                                                                                            //     ExamQuestion(MainQ , Q , subQ , "GivenDegree" , Var2["QType"] , "QType" , degree);
                                                                                                            // }, 5000);
                                                                                                            return (<div>
                                                                                                                <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة المدرس هى" + Var3["Answer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة الطالب هى" + Var3["StudentAnswer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + Var3["degree"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"الدرجة المعطاه هى :->  " + Var3["degree"]}</h4>
    
                                                                                                            </div>)
                                                                                                        }else{
                                                                                                            let MainQ = key1
                                                                                                            let Q = key2
                                                                                                            let subQ = key3
                                                                                                            // setTimeout(() => {
                                                                                                            //     ExamQuestion(MainQ , Q , subQ , "GivenDegree" , Var2["QType"] , "QType" , "0");
                                                                                                            // }, 5000);
                                                                                                           
                                                                                                            return (<div>
                                                                                                                <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة المدرس هى" + Var3["Answer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة الطالب هى" + Var3["StudentAnswer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + Var3["degree"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }} onTimeUpdate={this.tagraba}>{"الدرجة المعطاه هى :->  " + "0"}</h4>
                                                                                                                <div ></div>
    
                                                                                                            </div>)
                                                                                                        }

                                                                                                    } else if (Answer === "true" || Answer === "false") {
                                                                                                        // this code is for teur or false question as the form of the question will be different
                                                                                                        console.log(Var3["Answer"] === Var3["StudentAnswer"]);
                                                                                                        if(Var3["Answer"] === Var3["StudentAnswer"]){
                                                                                                            let degree = Var3["degree"];
                                                                                                            let MainQ = key1
                                                                                                            let Q = key2
                                                                                                            let subQ = key3
                                                                                                            // setTimeout(() => {
                                                                                                            //     ExamQuestion(MainQ , Q , subQ , "GivenDegree" , Var2["QType"] , "QType" , degree);
                                                                                                            // }, 5000);
                                                                                                            return (<div>
                                                                                                                <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة المدرس هى" + Var3["Answer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة الطالب هى" + Var3["StudentAnswer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + Var3["degree"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"الدرجة المعطاه هى :->  " + Var3["degree"]}</h4>
    
                                                                                                            </div>)
                                                                                                        }else{
                                                                                                            let MainQ = key1
                                                                                                            let Q = key2
                                                                                                            let subQ = key3
                                                                                                            // setTimeout(() => {
                                                                                                            //     ExamQuestion(MainQ , Q , subQ , "GivenDegree" , Var2["QType"] , "QType" , "0");
                                                                                                            // }, 5000);
                                                                                                           
                                                                                                            return (<div>
                                                                                                                <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة المدرس هى" + Var3["Answer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"اجابة الطالب هى" + Var3["StudentAnswer"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + Var3["degree"]}</h4>
                                                                                                                <h4 style={{ display: "flex" }} onTimeUpdate={this.tagraba}>{"الدرجة المعطاه هى :->  " + "0"}</h4>
                                                                                                                <div ></div>
    
                                                                                                            </div>)
                                                                                                        }
                                                                                                        

                                                                                                    } else {
                                                                                                        let degree = Var3["degree"];
                                                                                                        let MainQ = key1
                                                                                                        let Q = key2
                                                                                                        let subQ = key3
                                                                                                        // this code will run if it is normal question with normal text
                                                                                                        return (<div>
                                                                                                            <h4 style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: i + " ) " + Var3["Question"] }}></h4>
                                                                                                            <h4 style={{ display: "flex" }}>{"اجابة المدرس هى" + Var3["Answer"]}</h4>
                                                                                                            <h4 style={{ display: "flex" }}>{"اجابة الطالب هى" + Var3["StudentAnswer"]}</h4>
                                                                                                            <h4 style={{ display: "flex" }}>{"تذكر ان الدرجة هى :->  " + degree}</h4>
                                                                                                            <div style={{display:"flex"}}>
                                                                                                                        <label ><h4>اختر الدرجة-></h4></label>
                                                                                                                        <fieldset style={{ width: "120px" }} >
                                                                                                                            <select var1={MainQ} var2={Q} var3={subQ} var4="GivenDegree" var5={Var2["QType"]}  var7="QType"  onChange={ExamQ} className="myList">
                                                                                                                                <option value="0">0</option>
                                                                                                                                <option value="0.5">0.5</option>
                                                                                                                                <option value="1">1</option>
                                                                                                                                <option value="1.5">1.5</option>
                                                                                                                                <option value="2">2</option>
                                                                                                                                <option value="2.5">2.5</option>
                                                                                                                                <option value="3">3</option>

                                                                                                                            </select>
                                                                                                                        </fieldset> </div>



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
                                                    }
                                                })}
                                            </div>
                                            <div style={{ height: "50px" }}>
                                                {this.button(Exam)}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
            }}</SharedData.Consumer>
        );
    }
}

export default HandelTheAnswer;