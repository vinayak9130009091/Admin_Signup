// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './newsidebar.css';
// import newSidebarItems from './newSidebarItems';

// const NewSidebar = () => {
//   const [activeForm, setActiveForm] = useState(null);

//   const handleItemClick = (index) => {
//     setActiveForm(index);
//   };

//   const handleCloseForm = () => {
//     setActiveForm(null);
//   };

//   return (
//     <>
//       <div className="content">
//         <div className="content-list">
//           {newSidebarItems.map((items, index) => (
//             <li className="side-link" key={index}>
//               <Link  onClick={() => handleItemClick(index)}>
//                 <items.icon className="new-icon" />
//                 <span className="text nav-text">{items.text}</span>
//               </Link>
//             </li>
//           ))}
         
//         </div>
//       </div>

//       {activeForm !== null && (
//         <div className="right-sidebar">
//           <div className="right-sidebar-header">
//             <h2>{newSidebarItems[activeForm].text} Form</h2>
//             {React.createElement(newSidebarItems[activeForm].formComponent)}
//             <button onClick={handleCloseForm}>Close</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NewSidebar;

import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { SlEnvolope } from "react-icons/sl";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { CgFolderAdd } from "react-icons/cg";
import { GoBook } from "react-icons/go";
import { LiaFolderSolid } from "react-icons/lia";
import { CiMemoPad } from "react-icons/ci";
import { VscNewFolder } from "react-icons/vsc";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuStickyNote } from "react-icons/lu";
import { IoIosPaper } from "react-icons/io";
import { MdMoreTime } from "react-icons/md";
import { PiSuitcaseSimpleBold } from "react-icons/pi";

import { FaPaperPlane } from "react-icons/fa";
import "./newsidebar.css";
import { Link } from "react-router-dom";

function NewSidebar({ account, formclose, contact }) {
  return (
    <div>
      <div className="header_title">
        <div className="new-title">
          {" "}
          <HiOutlinePlus className="plus" />
          New Sidebar Content
        </div>
        <button type="button" onClick={() => formclose()}>
          <RxCross2 />
        </button>
      </div>
      <div className="content">
        <div className="content-list">
          <li className="side-link">
            <Link to="#">
              <AiOutlineUser className="new-icon" />
              <span class="text nav-text" onClick={() => account()}>
                Account
              </span>
            </Link>
          </li>
          <li className="side-link">
           <Link to="#">
              <SlEnvolope className="new-icon" />
              <span class="text nav-text" onClick={() => contact()}>
                Contact
              </span>
             </Link>
          </li>
          <hr />
          <li className="side-link">
          <Link to="#">
              <HiOutlineDocumentPlus className="new-icon" />
              <span class="text nav-text">Document</span>
           </Link>
          </li>
          <li className="side-link">
          <Link to="#">
              <CgFolderAdd className="new-icon" />
              <span class="text nav-text">Folder</span>
             </Link>
          </li>
          <li className="side-link">
          <Link to="#">
              <GoBook className="new-icon" />
              <span class="text nav-text">Page</span>
            </Link>
          </li>
          <hr /> 
          <li className="side-link">
            <Link to="#">
              <LiaFolderSolid className="new-icon" />
              <span class="text nav-text">Proposal</span>
             </Link>
          </li>
          <li className="side-link">
         <Link to="#">
              <FaPaperPlane className="new-icon" />
              <span class="text nav-text">Chat</span>
            </Link>
          </li>
          <li className="side-link">
          <Link to="#">
              <CiMemoPad className="new-icon" />
              <span class="text nav-text">Organizer</span>
             </Link>
          </li>
          <hr />
          <li className="side-link">
          <Link to="#">
              <VscNewFolder className="new-icon" />
              <span class="text nav-text">Invoice</span>
           </Link>
          </li>
          <li className="side-link">
            <Link to="#">
              <RiBillLine className="new-icon" />
              <span class="text nav-text">Payment</span>
             </Link>
          </li>
          <hr />
          <li className="side-link">
            <Link to="#">
              <MdOutlineAlternateEmail className="new-icon" />
              <span class="text nav-text">Email</span>
             </Link>
          </li>
          <li className="side-link">
         <Link to="#">
              <LuStickyNote className="new-icon" />
              <span class="text nav-text">Note</span>
              </Link>
          </li>
          <li className="side-link">
            <Link to="#">
              <IoIosPaper className="new-icon" />
              <span class="text nav-text">Task</span>
             </Link>
          </li>
          <li className="side-link">
            <Link to="#">
              <MdMoreTime className="new-icon" />
              <span class="text nav-text">Time Entry</span>
             </Link>
          </li>
          <li className="side-link">
            <Link to ="/AddJobs">
              <PiSuitcaseSimpleBold className="new-icon" />
              <span class="text nav-text" >Job</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default NewSidebar;


