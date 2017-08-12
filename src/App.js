import React, { Component } from 'react';
import request from 'request'
import './App.css';
import './form.css';
import { BootstrapTable, TableHeaderColumn,InsertButton } from 'react-bootstrap-table';



/*
*
*
*
*
get the "getToken" out of coment and change the token variable to the null
*
*
*
*/
 var token = null;
 let _rows = new Array();
 let update = new Array();
 let added = new Array();
var massege = "";

 var column = {
       id:'',
       name  : '',
       lastname : '',
       email : '',
      
     }
 const address = 'http://supermarket.nikmodern.com/backend/web';
const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true,
   afterSaveCell:onAfterSaveCell,
};



  function onAfterSaveCell(id, Name, lname,email) {
   var key = true;
   for(var i=0 ;i<update.length;i++){
      if(update[i].id ==  id["id"]){
        update[i].name = id["name"];
         update[i].lastName= id["lastname"];
         update[i].email = id["email"];
         key = false;
         break;
      }
    }
    if(key){
    update.push({
id : id["id"],
name : id["name"],
lastName : id["lastname"],
email : id["email"],
    })
    }
  // List.massege("to save change please press save button");
  }

 function saveUpdate(e){
   var xmlHttp = new XMLHttpRequest();
   var forms;
   //List.massege("");
   massege = "";
   for(var i = 0; i < update.length;i++){
    //alert(update[i].id);
     forms ='_format=json&user[fname]='+update[i].name+'&user[lname]='+update[i].lastName + '&user[email]='+update[i].email+
    '&user[country]=100';
 xmlHttp.open("PUT", address + '/api/user/'+update[i].id, false );
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Authorization",token);
    xmlHttp.send(forms); 
     alert( xmlHttp.status);
   // alert(xmlHttp.response);
   }
  update = new Array();
e.preventDefault();
 }















 class List extends Component {
   constructor(props) {
    super(props);
    this.state ={name :'',lastName : '',email : '',pass : '',conpass :'',form : '',delete : '',id :''};
    this.setState = this.setState.bind(this);
    this.remove =this.remove.bind(this);
    
   }




   submit(e){
 var forms = 'user[fname] ='+this.state.name +'&user[lname] = '+this.state.lastname + '&user[email] = '+this.state.email+
    '&user[plainPassword][first]='+this.state.pass+
    '&user[plainPassword][second]='+this.state.conpass+'&user[country] =100';
   try{
     var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", address + '/api/user', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(forms);
    if(xmlHttp.onerror != null)
    alert( "error on filter" +xmlHttp.onerror);
    alert(xmlHttp.statusText);
    //alert( xmlHttp.status);
    this.setState({jsonSUB :JSON.parse(xmlHttp.response)});
    this.setState({form : ''});
   // App.setButton();
    this.setState({form : ''});
}
catch(e){
  alert(e);
}
e.preventDefault();
  }//  handleSubmit



handlClick(onClick){
var Form =<form   onSubmit= {(e)=>{this.submit(e)}}>
 <h5> name :</h5>
  <input type="text" name  = "name"   value={this.state.value} onChange={(event)=>{ this.setState({name: event.target.value});}} />
  <br/>
  <h5> 
  last Name :
  </h5>
  <input type="text" name  = "lastName"   value={this.state.value} onChange={(event)=>{ this.setState({lastName: event.target.value});}} />
  <br/>
  <h5>
  email :
  </h5>
  <input type="text" name  = "email"   value={this.state.value} onChange={(event)=>{ this.setState({email: event.target.value});}} />
  <br/>
  <h5>
  password:
  </h5>
  <input type="password" name  = "password"   value={this.state.value} onChange={(event)=>{ this.setState({pass: event.target.value});}} />
  <br/>
  <h5>
  confirm password :
  </h5>
  <input type="password" name  = "conPassword"   value={this.state.value} onChange={(event)=>{ this.setState({conpass: event.target.value});}} />
  <br/>
  <input type = "submit" name = "SUBMIT"/>
  </form>

this.setState({form : Form})
}

remove(e){
  try{
     var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", address + '/api/user/'+this.state.id+'/disable', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Authorization",token);
    xmlHttp.send();
   // alert( "error on remove" + xmlHttp.onerror);
    if( xmlHttp.status == 204)
    alert( "disabling done");
   
}  
catch(e){
  alert(e);
}
e.preventDefault();
}
removeForm(e){
  var Form =
  <div > 
    <form onSubmit ={()=>{this.remove(e)}}>
    id:
    <br/>
     <input type="text"  name = "email"   value={this.state.value} onChange={(event)=>{ this.setState({id: event.target.value});}} />
     <br/>
     <input type = "submit" name = "SUBMIT"/>
    </form>
    </div>
  this.setState({form : Form})
}

  render(){
    return(
      <div>
       <InsertButton
       id = "add"
      btnText='add'
      btnContextual='btn-warning'
      className='my-custom-class'
      btnGlyphicon='glyphicon-edit'
       onClick={ (onClick) => this.handlClick(onClick) }
    />
     <br/>
    <br/>
     <br/>
    <br/>
   <BootstrapTable  data = {_rows} cellEdit={cellEditProp} striped hover condensed options={ { noDataText: 'press load button to see list' } } >
      <TableHeaderColumn dataField="id" dataAlign='center' width= "50" isKey={true} editable={ false }>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataAlign='center'width= "150" columnTitle filter={ { type: 'TextFilter', delay: 1000 }}>Name</TableHeaderColumn>
      <TableHeaderColumn dataField="lastname" dataAlign='center'width= "150" columnTitle filter={ { type: 'TextFilter', delay: 1000 }}>lastName</TableHeaderColumn>
      <TableHeaderColumn dataField="email" dataAlign='center'width= "200" columnTitle filter={ { type: 'TextFilter', delay: 1000 }}>Email</TableHeaderColumn>
  </BootstrapTable>
   <button id= "save" onClick ={(e)=>{saveUpdate(e)}} > save</button>
 <InsertButton
       id = "delete"
      btnText='delete'
      btnContextual='btn-warning'
      className='my-custom-class'
      btnGlyphicon='glyphicon-edit'
       onClick={ (onClick) => this.removeForm(onClick)}/>
   <p>
     {this.state.massege}
     </p>
  <div class = "d">
    {this.state.form}
    </div>
  </div>
    );
}
}








class App extends Component {
  constructor(props) {
    super(props);
this.state = { key : <List/> ,J : '',showText : "load"};
 var J ;
this.setState = this.setState.bind(this);
this.getData = this.getData.bind(this);
//this.getToken = this.getToken.bind(this);

     }
   setTable(j){
    // alert("sure 2" + j.result[0].id)
    for (let i = 0; i < j.count ; i++) {
      _rows.push({
        id: j.result[i].id ,
        name :j.result[i].fname, 
        lastname:j.result[i].lname,
        email: j.result[i].email,
        
      });
    }
  //  alert(JSON.stringify(_rows));
}  



    getData(e){
        _rows = new Array();
        this.setState({showText:"show"});
  var forms;
   forms ='?lname='+'&lname='+'&email=';
   forms += '&country=100&limit=100 &offset=1&order=id&direction=DESC';
  try{
     var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", address + '/api/user', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Authorization",token);
    xmlHttp.send(forms);
    if(xmlHttp.onerror != null)
   // alert( "error on filter" +xmlHttp.onerror);
    alert("data code : " + xmlHttp.status);
   // alert(xmlHttp.response);
    this.J = JSON.parse(xmlHttp.response) ;
    //alert("sure" + this.J.count);
     this.setTable(this.J);
      this.setState({key : <List/>});
      this.setState({showText : "reload"});
  }
     catch(e){
    alert("cant filter because : " + e  + "body is :" + xmlHttp.response);
  }
   e.preventDefault();
}//getData







  getToken(){
try{
  request.post({url: address +'/api/login_check', form: {_username:'info@nikmodern.com' ,_password : '123456789' }}, 
  function(err,httpResponse,body){
    if(err != null)
  alert("my error is :" + err );
else{
  try{
  token = JSON.parse(body).token;
  token = "Bearer " + token;
  }
catch(e){
  alert("error is :" + e + "  and the body is :" + body);
}
}

  alert("my respons : " + httpResponse.statusCode );
  //alert("my body is : "+ token);
 
  });
     }//try
catch(e){
  alert("my error on fetch data is : " + e);
}//catch
//prop.preventDefault();
}//getToken

setButton(){
 this.setState({showText: "show change"});
}
componentDidMount(){
this.getToken();
 
}

render(){
return(<div>
    <button  id = "show" onClick= {(e)=>{this.getData(e)}}>{this.state.showText}</button>
   
  <div>
    {this.state.key}
  
    </div>
    </div>
);
}

}


export default App;