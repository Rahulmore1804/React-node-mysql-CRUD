import './App.css';
import{useState} from "react"
import axios from 'axios';

function App(){
  const [name,setname] = useState("")
  const [number,setnumber] = useState("")
  const [age,setage] = useState("")
  const [list,showlist]= useState([])
  const [newage, setNewage] = useState(0);
  
  function display1(){    
    axios.get("http://localhost:3001/b").then(function a(response){ 
    console.log("d")
    showlist(response.data)
    console.log(list)})
    console.log(list)
  }
  const updateEmployeeWage = (id_T1) => {
    axios.put("http://localhost:3001/update", { age: newage, id_T1: id_T1 }).then(
      (response) => {
        showlist(
          list.map((val) => {
            return val.id_T1 === id_T1
              ? {
                  id: val.id_T1,
                  name: val.name,
                  age: val.age,
                  number: val.number,
                }
              : val;
          })
        );
      }
    );
  };
  const deleteEmployee = (id_T1) => {
    axios.delete(`http://localhost:3001/delete/${id_T1}`).then((response) => {
      showlist(
        list.filter((val) => {
          return val.id_T1 !== id_T1;
        })
      );
    });

  };

  function changedname(e){
    setname(e.target.value)
  }
  function changednumber(e){
    setnumber(e.target.value)
  }
  function changedage(e){
    setage(e.target.value)
  }

  function display(){
  console.log("ss")
  console.log(name)
  axios.post("http://localhost:3001/a",{name :name, number :number, age :age}).then(function a(){console.log("dd")})
  }
  
  return(
    <>
      <div>
        <lable>  NAME :  </lable>
        <input type="text" onChange={changedname}/>
        <lable>  number :  </lable>
        <input type="number" onChange={changednumber}/>
        <lable>  age :</lable>
        <input type="number" onChange={changedage}/>
     
        <button onClick={display}> Fire </button>
        <button onClick={display1}> show </button>

        {list.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>number: {val.number}</h3>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="20..."
                  onChange={(event) => {
                    setNewage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id_T1) ;
                    display1();
                  }}
                >
                  {" "}
                  Update
                </button>

                <button 
                  onClick={() => {
                    deleteEmployee(val.id_T1);
                  }} 
                >
                  Delete
                </button>
              </div>
              </div>)})}
      </div>
    </>
  )
}


export default App;
