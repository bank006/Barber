import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Booking(user) {
    // console.log(user.user.user._id)
    const [bookinghis, setbookinghis] = useState([])
    const iduser = user.user.user._id
    useEffect(() => {
        axios.get(`http://localhost:3000/api/getbookingbyid/${iduser}`)
            .then(res => {
                setbookinghis(res.data)
            }).catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <div className="container mx-auto p-4 ">
            <div className='h-full cursor-pointer'>
                <h2 className="text-2xl font-semibold mb-4">ประวัติการจอง</h2>
                {bookinghis.length >0 &&
                    <table className="table-auto w-full border border-gray-200 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">วันที่</th>
                                <th className="px-4 py-2 border">เวลา</th>
                                <th className="px-4 py-2 border">ช่างตัดผม</th>
                                <th className="px-4 py-2 border">บริการ</th>
                                <th className="px-4 py-2 border">ราคา</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookinghis.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-4 py-2 border">{booking.date}</td>
                                    <td className="px-4 py-2 border">{booking.time}</td>
                                    <td className="px-4 py-2 border flex items-center">
                                        <img
                                            src={booking.imgmbarber}
                                            alt={booking.namembarber}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        {booking.namembarber}
                                    </td>
                                    <td className="px-4 py-2 border">{booking.nameservice}</td>
                                    <td className="px-4 py-2 border">{booking.price} บาท</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {bookinghis.length==0 &&
                    <div className='flex justify-center items-center h-screen pb-[200px]'>
                        <p>ไม่มีประวัติการจอง</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Booking