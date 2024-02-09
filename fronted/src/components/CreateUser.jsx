import axios from 'axios';
import {useEffect, useState } from 'react';

export default function CreateUser(){
  const [users, setUsers] = useState();
  const [username, setUsername] = useState();
   async function CallUsers(){
      const {data} = await axios.get("http://localhost:3000/api/users");
      setUsers(data);
   }
  useEffect(()=>{
    CallUsers();
  },[]);

  function onChangeUserName (e) {
      setUsername(e.target.value);
  }

  async function onSubmitUser(e){
    e.preventDefault();
    await axios.post('http://localhost:3000/api/users',{username: username});
    setUsername('');
    CallUsers();
  }
  async function deleteUser(id){
    await axios.delete('http://localhost:3000/api/users/'+id);
    CallUsers();
  }

  return (
    <section className="py-14 mx-auto">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-center lg:flex md:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="h-32 rounded-lg bg-gray-200">
                  <h2 className='uppercase text-center font-bold'>Crear Usuario</h2>
                  <form action="" onSubmit={onSubmitUser}>
                      <input type="text" value={username} onChange={onChangeUserName}/>
                      <button type='submit'>Guardar</button>
                  </form>
                </div>
                <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-rigth rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                  <th scope="col" className="px-6 py-3">
                                      Usuarios
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                                  {
                                    users?.map(user => (
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  key={user._id} onDoubleClick={() => deleteUser(user._id)}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                          {user.username}
                                        </th>
                                      </tr>)
                                    )
                                  }
                          </tbody>
                      </table>
                  </div>
                </div>
            </div>
        </div>
    </section>
  )
}