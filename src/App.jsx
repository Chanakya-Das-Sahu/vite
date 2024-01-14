import React from 'react';
import axios from 'axios' ;
import {useState,useEffect} from 'react';
import {FaCut , FaEdit } from 'react-icons/fa';
const App = () =>{
  const[data,setData] = useState({name:'',email:'',password:''});
  const[list,setList] = useState([]);
  const[id,setId] = useState('');
  const[clicked,setClicked] = useState(false);
  const handleInputs = (e) =>{
     setData({...data,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/crud/data/get')
    .then((res)=>{setList(res.data);console.log(res.data)})
    .catch((err)=>{`failed during getting in frontend due to error ${err}`})
  })

  const handleAdd = () =>{
    axios.post('http://localhost:3000/crud/data/create',data)
    .then(()=>{`successfull from handleAdd frontend.`})
    .catch((err)=>{`unasuccessfull from handleAdd due to error ${err}`})
    setData({name:'',email:'',password:''})
  }

  const handleDelete = (id) =>{
    // console.log(id);
    axios.delete(`http://localhost:3000/crud/data/delete/${id}`)
    .then()
    .catch()
  }

  const handleSelect = (ele,id) =>{
     setId(id)
     setData(ele)
     setClicked(true)
  }
 
   const handleEdit = () =>{
    axios.put(`http://localhost:3000/crud/data/change/${id}`,data)
    .then()
    .catch()
    setClicked(false)
    setData({name:'',email:'',password:''});
   }
  // useEffect(()=>{
  // console.log("List :" ,list);
  // },[list])

  return(
    <>
    {list.length===0 ?
     (<h1>No Data</h1>)
    :(
       list.map((ele)=>(
       <tr key={ele._id}>
          <td>{ele.name}</td>
          <td>{ele.email}</td>
          <td>{ele.password}</td>
          <td><FaEdit onClick={()=>{handleSelect(ele,ele._id)}} /><FaCut onClick={()=>{handleDelete(ele._id)}}/></td>
        </tr>
       )))
    }

    <input type="text" name="name" value={data.name} onChange={(e)=>{handleInputs(e)}} placeholder="name" /><br/>
    <input type="text" name="email"value={data.email}  onChange={(e)=>{handleInputs(e)}} placeholder="email" /><br/>
    <input type="text" name="password" value={data.password} onChange={(e)=>{handleInputs(e)}} placeholder="password" /><br/>
{clicked===false ?
   ( <button onClick={handleAdd}>Add</button> )
  :
  (<FaEdit onClick={handleEdit} />)
  }
    </>
  )
}

export default App ;