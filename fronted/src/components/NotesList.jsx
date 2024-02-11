import {useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import { Link } from "react-router-dom";

export default function NoteList(){
  const [notas, setNotas] = useState();
   async function CallNotas(){
      const {data} = await axios.get("http://localhost:3000/api/notes");
      setNotas(data);
      console.log(data);
   }
  useEffect(()=>{
    CallNotas();
  },[]);

  async function BorrarNota(id){
    await axios.delete('http://localhost:3000/api/notes/'+id);
    CallNotas();
  }
  return (
    <div className="mx-auto container py-20 px-6">

<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {
        notas?.map((nota)=>
          (     
            <div className="relative  w-full h-64 flex flex-col justify-between bg-red-300 rounded-lg border border-red-300 mb-6 py-5 px-4" key={nota._id}>
              <div className="absolute right-4 top-4 cursor-pointer" onClick={()=> BorrarNota(nota._id)} >
                X
              </div>
              <div className='top-3'>
                <h3 className="text-gray-800 leading-7 font-bold w-11/12">{nota.title}</h3>
                <p className="text-slate-950 text-sm">{nota.content}</p>
              </div>
              <div className='w-full flex flex-col items-start'>
                <div className="mb-3 border border-gray-800 rounded-full px-3 py-1 text-gray-800 text-xs flex items-center" aria-label="Due on" role="contentinfo">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                <p className="ml-2">{nota.author}</p>
                </div>
                <div className="flex items-center justify-between text-gray-800 w-full">
                  <p className="text-sm">{format(nota.date)}</p>
                  <Link to={'/edit/'+nota._id} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-red-300 focus:ring-black" aria-label="edit note" role="button">
                    <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                    </svg>
                 </Link>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
    </div>
  )
}

/*<button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-00 dark:focus:ring-red-800'
onClick={()=> BorrarNota(nota._id)}>Borrar</button>*/