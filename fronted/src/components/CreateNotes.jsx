import axios from "axios";
import {useState,useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams,useNavigate } from "react-router-dom";

export default function CreateNote(){

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [author,setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date,setDate] = useState(new Date());
  const [edit,setEdit] = useState(false);
  const noteId = useParams().id;

  async function dataNote(){
    if(noteId){
      const res = await axios.get("http://localhost:3000/api/notes/" + noteId);
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setContent(res.data.content);
      setDate(new Date(res.data.date));
    }
  }

  useEffect(()=>{
    dataNote();
  },[noteId]);
  async function CallUsers(){
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data.map(user=> user.username));
      setAuthor(res.data[0].username);
   }
  useEffect(()=>{
    CallUsers();
  },[]);

  async function onSubmit(e){
    e.preventDefault();
      const newNote = {
      title : title,
      content: content,
      author : author,
      date: date
    }
    if(noteId){
      await axios.put("http://localhost:3000/api/notes/"+noteId,newNote);  
    }else{
      await axios.post("http://localhost:3000/api/notes",newNote);  
    }
    navigate('/');
  }

  function onChangeDate(date){
    setDate(date);
  }
  return (
    <div className="flex justify-center mx-auto max-h-screen">
      <form className="m-10 w-96 bg-white shadow-md rounded px-4 pt-6 pb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label id="Title" className="block text-gray-700 text-sm font-bold text-center text-xl mb-2"></label>
        </div>
        <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Author: 
        </label>
        </div>
        <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
        </span>
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" 
          name="author" 
          onChange={(e)=>setAuthor(e.target.value)}>
          {
          users?.map(user=> 
              <option className="mx-auto px-4" key={user} value={user}>
                  {user}
              </option>
            )
          }
        </select>
        </div>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
          Title:
        </label>
        <input className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text" 
        placeholder="Title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nota: 
        </label>
          <textarea rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="content" onChange={(e)=>setContent(e.target.value)}
          value={content}></textarea>
      </div>
      <div className="mt-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha: 
        </label>
        <DatePicker 
        selected={date}
        onChange={onChangeDate}
        value={date}
        />
      </div >
      <div className="flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">Guardar Nota</button>
      </div>
      </form>
    </div>
  )
}