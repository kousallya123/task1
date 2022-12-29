import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminHome() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/admin/users",
            { headers: { "x-access-token": localStorage.getItem('token') } }
        ).then((response) => {

            if (response.data) {
                setUsers(response.data)
            }
            else {
                console.log("erorr");
            }
        })
    }, [])

    return (
        <div>
            <div>
                <h1 className='text-2xl text-blue-800 p-4 font-extrabold '>User Management</h1>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
                        <table class="min-w-full leading-normal ">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        SL NO:
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        USER-ID
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        USERNAME
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        EMAIL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((obj, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{obj._id}</td>
                                                    <td className="text-center">{obj.username}</td>
                                                    <td className="text-center">{obj.email}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
