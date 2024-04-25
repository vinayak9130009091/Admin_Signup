import React, { useState } from 'react'
import { SlCalender } from "react-icons/sl";
import { LuUserCircle2 } from "react-icons/lu";
import DatePicker from 'react-datepicker';
import Users from '../../../Pages/AllPages/Insights/Users';
import '../../../Pages/AllPages/Insights/todo.css'
import 'react-datepicker/dist/react-datepicker.css';
const Todo = () => {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleIconClick = () => {
        setCalendarOpen(!calendarOpen);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCalendarOpen(true);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    // const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
    const itemsPerPage = 5;
  
    // Function to filter data based on search term and selected date
    const filteredData = Users.filter((row) => {
      const searchTermMatch =
        row.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  
      const dateMatch =
        selectedDate === null || // if no date is selected, all dates should match
        new Date(row.startDate).toDateString() === selectedDate.toDateString();
  
      return searchTermMatch && dateMatch;
    });
  
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Function to handle date selection
    // const handleDateSelect = (date) => {
    //   setSelectedDate(date);
    // };
  
    return (
        <>
            <div className='todo-task col-12' style={{ display: 'flex' }}>
                <div className='todo-task-title col-4' >
                    <div className='title-container col-12' style={{ display: 'flex' }}>
                        <h3 className='col-4'>Task : todo</h3>
                        <div className='task-date col-4' style={{ display: 'flex', paddingTop: '5px' }}><SlCalender onClick={handleIconClick} />
                            {calendarOpen && (
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    inline // To show the calendar inline
                                />
                            )}
                            <select style={{ height: '20px', border: 'none', backgroundColor: 'var(--body-color)' }}>
                                <option selected>Today</option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                        <div className='select-users col-4' style={{ alignItems: 'center', textAlign: 'center', display: 'flex' }} >
                            <LuUserCircle2 />
                            <div className='col-12'>
                                <select style={{ border: 'none', backgroundColor: 'var(--body-color)' }}>
                                    <option selected>All Members</option>
                                    <option></option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='tables-container col-12'>
                <div className='task-table col-9' style={{ marginTop: '30px' }}>
                    <div className='table-container col-12'>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {/* Date Picker */}
                                {/* <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateSelect}
                                    dateFormat="yyyy-MM-dd"
                                    // placeholderText="Select Date"
                                /> */}
                            </div>
                            <table className="my-table">
                                <thead>
                                    <tr>

                                        <th>Task</th>
                                        <th>Client</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.task}</td>
                                            <td>{row.client}</td>
                                            <td>{row.startDate}</td>
                                            <td>{row.endDate}</td>
                                            <td>{row.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo