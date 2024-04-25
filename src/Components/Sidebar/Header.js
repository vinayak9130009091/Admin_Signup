import React, { useState } from 'react'
import './header.css'
import { IoSearch } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
// import { IoMdClose } from "react-icons/io";
import NewSidebar from './NewSidebar';
const Header = () => {
    const [contactForm, setContactForm] = useState(false);
    const [accountform, setAccountForm] = useState(false);
    const [isNewSidebarOpen, setIsNewSidebarOpen] = useState(false);
    const toggleNewSidebar = () => {
        setIsNewSidebarOpen(!isNewSidebarOpen);
    };
    const handleFormClose = () => {
        setIsNewSidebarOpen(false);
    };
    const handleAddNewCompanyClick = () => {
        setContactForm(!contactForm);
    };
    const handleAddAccount = () => {
        setAccountForm(!accountform);
    };

    const [newSearchOpen, setNewSearchOpen] = useState(false);

    const toggleNewSearch = () => {
        setNewSearchOpen(!newSearchOpen);

    }
    const handleSearchClose = () => {
        setNewSearchOpen(false);



    }
    return (
        <>

            <div className='header-container' style={{ padding: '20px' }}>
                <div className='header-btns'>
                    <FiPlusCircle className='add-icon' onClick={toggleNewSidebar} />
                    <IoSearch className='search-icon' onClick={toggleNewSearch} />
                </div>

                <div className={`new-sidebar-container ${isNewSidebarOpen ? "new-sidebar" : ""}`}>
                    <div className="new-sidebar">
                        {/* <div className="new-sidebar-header" style={{ backgroundColor: '#E5E4E2' }} >
                            <p style={{ padding: '10px' }}>New Sidebar Content</p>
                            <IoMdClose style={{ cursor: 'pointer', fontSize: '25px', margin: '5px' }} onClick={handleFormClose} />
                        </div> */}
                        <NewSidebar account={handleAddAccount} formclose={handleFormClose} contact={handleAddNewCompanyClick} />
                    </div>
                </div>
                <div className={`new-search-container ${newSearchOpen ? "new-search" : ""}`}>
                    <div className="header_title">
                        <button type="button" onClick={handleSearchClose}>
                            <RxCross2 />
                        </button>
                        <div className="title">search</div>
                    </div>
                    <div className="content">
                        <div className="company-content">

                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Header