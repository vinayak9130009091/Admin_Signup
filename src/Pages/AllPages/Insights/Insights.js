// import React, { useEffect, useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { LoginContext } from "../../../Components/ContextProvider/Context";
// import { LuUserCircle2 } from "react-icons/lu";
// import '../../../Pages/AllPages/Insights/insights.css'
// import Users from '../../../Pages/AllPages/Insights/Users';
// import Card from '../../../Pages/AllPages/Insights/Card';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CardTwo from '../../../Pages/AllPages/Insights/CardTwo';
// import CardThree from '../../../Pages/AllPages/Insights/CardThree'
// import { SlCalender } from "react-icons/sl";
// import Sidebar from "../../../Components/Sidebar/Sidebar";
// import Navbar from "../../../Components/Navbar/Navbar";


// const Insights = () => {
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleIconClick = () => {
//     setCalendarOpen(!calendarOpen);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setCalendarOpen(false);
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   // const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
//   const itemsPerPage = 5;

//   // Function to filter data based on search term and selected date
//   const filteredData = Users.filter((row) => {
//     const searchTermMatch =
//       row.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

//     const dateMatch =
//       selectedDate === null || // if no date is selected, all dates should match
//       new Date(row.startDate).toDateString() === selectedDate.toDateString();

//     return searchTermMatch && dateMatch;
//   });

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);



//   //Data Mapping


//   const history = useNavigate();
//   const { logindata, setLoginData } = useContext(LoginContext);
//   //  console.log(logindata.ValidUserOne.email);

//   const [data, setData] = useState(false);
//   const DashboardValid = async () => {
//     let token = localStorage.getItem("usersdatatoken"  );
//     // Cookies.set("userToken", res.result.token); // Set cookie with duration provided
      

//     const res = await fetch("http://127.0.0.1:8080/common/login/verifytoken", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": token
//       }
//     });

//     const data = await res.json();
//     console.log(data.message);
//     if(data.message === "Invalid token")
//     {
//       console.log("logout");
//       history("/");
//     }else
//     {
//       console.log("user verify");
//       setLoginData(data);
//       history("/insights");

//     }
//     // if (data.status === 400 || !data) {
//     //   console.log("error page");
//     //   history("*");

//     // } else {
//     //   console.log("user verify");
//     //   setLoginData(data);
//     //   history("/insights");
//     // }
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       DashboardValid();
//       setData(true)
//     }, 2000)

//   }, []);

//   console.log(logindata);










//   return (
//     <>

//       <div className='app'>
//         {/* <Sidebar /> */}
//         <div className='navbar col-12'>



//           {/* <Navbar /> */}


//           <div style={{padding:'20px 0 0 20px'}}>
//             <div className='card-view-container col-12' >
//               <div className='card-view-title col-2' style={{ height: '50px' }}>
//                 <div className='title-one clo-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                   <h3 className='insights-title ' style={{ fontSize: '25px' }}>Insights</h3>
//                   <h6 className='edit-title ' style={{ fontSize: '12px', color: 'blue', flex: '1', marginLeft: '10px' }}>Edit Widgets</h6>
//                 </div>
//               </div>
//               <div className='card-view-subtittle col-12' style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
//                 <h3>Jobs</h3>
//                 <div className='select-users col-3' style={{ alignItems: 'center', display: 'flex' }} >
//                   <LuUserCircle2 />
//                   <select style={{ border: 'none', backgroundColor: 'var(--body-color)' }}>
//                     <option selected>All Members</option>
//                     <option>1</option>
//                     <option>1</option>
//                     <option>1</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="reportcard col-12" style={{ paddingRight: '20px', display: "flex", marginTop: '20px', gap: '30px' }}>
//                 <div className='card1 col-3' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
//                   <div className='card-info col-12' style={{ display: 'flex' }}>
//                     <Card task="Overdue" number="0" />
//                   </div>
//                 </div>
//                 <div className='card1 col-3' >
//                   <CardTwo task='Approaching deadline' number='0' option='Today' option1='Tomorow' option2='Day after Tomorow' option3='In a week' />
//                 </div>
//                 <div className='card1 col-3' >
//                   <CardThree task="No Activity" number="10" option='Over 3 days' option1='Over 1 week' option2='Over 1 month' />
//                 </div>
//                 <div className='card1 col-3' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
//                   <div className='card-info col-12' style={{ display: 'flex' }}>
//                     <Card task="Total" number="0" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='tasktable-container col-12' style={{ marginTop: '20px', paddingRight: '20px' }}>
//               <div className='task-header col-6' style={{ height: '50px', display: 'flex', gap: '25px', alignItems: 'center' }}>
//                 <h3>Task:to do</h3>
//                 <div style={{ display: 'flex', alignItems: 'center' }}><SlCalender onClick={handleIconClick} />
//                   {calendarOpen && (
//                     <DatePicker
//                       selected={selectedDate}
//                       onChange={handleDateChange}
//                       inline // To show the calendar inline
//                     />
//                   )}
//                   <select style={{ height: '20px', border: 'none', backgroundColor: 'var(--body-color)' }}>
//                     <option selected>Today</option>
//                     <option></option>
//                     <option></option>
//                   </select>
//                 </div>

//                 <div className='select-users col-3' style={{ alignItems: 'center', display: 'flex' }} >
//                   <LuUserCircle2 />
//                   <select style={{ border: 'none', backgroundColor: 'var(--body-color)' }}>
//                     <option selected>All Members</option>
//                     <option></option>
//                     <option></option>
//                     <option></option>
//                   </select>
//                 </div>
//               </div>
//               <div className='tasktable-container col-12' style={{ marginTop: '20px', display: 'flex', height: 'auto', gap: '30px' }}>
//                 {/* <div className='task-table col-9' > */}
//                 <div className='table-container col-9'>

//                   <div style={{ margin: '0 0 20px 0' }}>
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       style={{ padding: '10px', borderRadius: '10px', border: '2px', fon: '25px' }}
//                     />
//                   </div>

//                   <table className="my-table col-12 "  >
//                     <thead>
//                       <tr>
//                         <th>Task</th>
//                         <th>Client</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentItems.map((row) => (
//                         <tr key={row.id}>
//                           <td>{row.task}</td>
//                           <td>{row.client}</td>
//                           <td>{row.startDate}</td>
//                           <td>{row.endDate}</td>
//                           <td>{row.status}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {/* Pagination */}
//                   <div className="pagination">
//                     {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
//                       <button key={index} onClick={() => paginate(index + 1)}>
//                         {index + 1}
//                       </button>
//                     ))}
//                   </div>

//                 </div>
//                 {/* </div> */}
//                 <div className='chart col-3' >
//                   <div className='card1 col-3' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
//                     <div className='card-info col-12' style={{ display: 'flex' }}>
//                       <Card task="Overdue" number="0" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Insights



import React from 'react'

const Insights = () => {
  return (
    <div>
      nbjhfguytgfuihfbcafgoadukljmn325641651
    </div>
  )
}

export default Insights
