import { BsGraphUpArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import Graph from "../../Component/Graph"
import CricalGraph from "../../Component/CricalGraph"
import image from "../../assets/images/1.jpg"
import image1 from "../../assets/images/2.jpg"
import image2 from "../../assets/images/3.jpg"
import "./Admin.css"
export default function Dashboard() {
    const users=[
        {
            id:1,
            name:"Ali Raza",
            email:"alirazayousaf420@gmail.com",
            role:"Admin",
            avtar:image
        },
          {
            id:2,
            name:"Olivia",
            email:"Olivia12@gmail.com",
            role:"User",
            avtar:image1
        },
          {
            id:3,
            name:"Isabella",
            email:"Isabellampel@gmail.com",
            role:"user",
            avtar:image2
        }
    ]
  return (
    <>
      <section>
        <container>
          <div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center space-between gap-3 dashboard-card-main">
                <Link to="/admin/addcourses">
              <div className="w-48 bg-green-100 h-20 rounded-lg border border-2-red-200 flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="flex justify-between items-center gap-3 ">
                  <h1 className="text-2xl font-bold">Total User</h1>
                  <span className="text-2xl font-bold text-green-600 drop-shadow-2xl"><BsGraphUpArrow /></span>
                </div>
                <div className="text-xl font-bold">50</div>
               
              </div>
               </Link>
              <div className="w-48 bg-green-100 h-20 rounded-lg border border-2-red-200 flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="flex justify-between items-center gap-3 ">
                  <h1 className="text-2xl font-bold">Active User</h1>
                  <span className="text-2xl font-bold text-green-600 drop-shadow-2xl"><BsGraphUpArrow /></span>
                </div>
                <div className="text-xl font-bold">30</div>
              </div >
               <div className="w-48 bg-green-100 h-20 rounded-lg border border-2-red-200 flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="flex justify-between items-center gap-3">
                  <h1 className="text-2xl font-bold">Total Courses</h1>
                  <span className="text-2xl font-bold text-green-600 drop-shadow-2xl"><BsGraphUpArrow /></span>
                </div>
                <div className="text-xl font-bold">13</div>
              </div>
               <div className="w-48 bg-green-100 h-20 rounded-lg border border-2-red-200 flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="flex justify-between items-center gap-3">
                  <h1 className="text-2xl font-bold">Total Blog</h1>
                  <span className="text-2xl font-bold text-green-600 drop-shadow-2xl"><BsGraphUpArrow /></span>
                </div>
                <div className="text-xl font-bold">10</div>
              </div>
            </div>
            {/* Section is a graph  */}
            <div className=" w-full flex items-center justify-between gap-10  dashboard-graph-main">
                <div className=" w-1/2 h-60 flex items-center justify-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer ">
                <Graph />
                
                
                </div>
                <div className=" w-1/2 h-60 flex items-center justify-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <CricalGraph percentage={70}  />
                </div>
            </div>
             {/* graph section his end */}
                {/* start a table section here */}
                <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-lg dashboard-table-main">
      <table className=" min-w-full table-auto border-collapse border border-gray-200 cursor-pointer">
        <thead className="bg-green-300">
          <tr>
            <th className="dashboard-table-head text-left">Sr#</th>
            <th className="dashboard-table-head text-left">Name</th>
            <th className="dashboard-table-head text-left">Email</th>
            <th className="dashboard-table-head text-left">Role</th>
            <th className="dashboard-table-head text-left">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b bg-green-100 transition-colors duration-200"
            >
              <td className="dashboard-table-sr">{index + 1}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4">
                <div className="relative w-12 h-12">
                  <img
                    src={user.avtar}
                   
                    className="w-10 h-10 rounded-full border-2 border-white hover:scale-125 transition-transform duration-300"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
        </container>
      </section>
    </>
  );
}
