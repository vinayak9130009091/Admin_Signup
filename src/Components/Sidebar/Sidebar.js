import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";
import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars, FaMoon, FaSun } from "react-icons/fa";

import logo from "../../img/logo.svg";
import { menuItems } from "./menuItems";

import { IoIosLogOut } from "react-icons/io";

import Switch from "react-switch";
import { LoginContext } from "../ContextProvider/Context";
import { useNavigate } from "react-router-dom";
import NewSidebar from "./NewSidebar";
import { IoSearch } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import CreateContact from "../../Pages/AllPages/Insights/Contact";
import CreateAccount from "../../Pages/AllPages/Insights/CreateAccount";

import Cookies from "js-cookie";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setOpenSubMenu(null);
  };
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleLogout = () => {};

  //Logout

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token)

    const res = await fetch("http://68.251.138.233:8080/common/login/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 200) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      Cookies.remove("userToken");
      setLoginData(false);

      history("/login");
    } else {
      console.log("error");
    }
  };

  const [theme, setTheme] = useState("light-theme");
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [data, setData] = useState(false);
  const [loginsData, setloginsData] = useState("");
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // Cookies.set("userToken", res.result.token); // Set cookie with duration provided
    // console.log(token);

    const res = await fetch("http://68.251.138.233:8080/common/login/verifytoken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log(token);

    const data = await res.json();
    console.log(data);
    if (data.message === "Invalid token") {
      // console.log("error page");
      navigate("/login");
    } else {
      console.log("user verify");
      setLoginData(data);
      setloginsData(data.user.id);
      navigate("/");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState("");

  const fetchUserData = async () => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("http://68.251.138.233:8080/common/user/" + loginsData, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("id", result);
        setUserData(result.email);
        setUsername(result.username);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
  };
  const handleSearchClose = () => {
    setNewSearchOpen(false);
  };
  const handleContactClose = () => {
    setContactForm(false);
  };

  return (
    <div className="grid-container">
      <header className="header">
        <div className="header-container" style={{ padding: "20px" }}>
          <div className="header-btns">
            <FiPlusCircle className="add-icon" onClick={toggleNewSidebar} />
            <IoSearch className="search-icon" onClick={toggleNewSearch} />
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
              <div className="company-content"></div>
            </div>
          </div>
        </div>
      </header>
      <section className={`sidebar  ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content" style={{ width: "250px" }}>
          <div className="toggle">
            <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
          </div>
        </div>
        <div className="sidebar-content-items">
          <div className="logo-container" style={{ display: "flex", gap: "20px", margin: "25px 0 0 10px", alignItems: "center" }}>
            <span className="image">
              <img src={logo} alt="" style={{ width: "40px", height: "40px" }} />
            </span>
            <div className="text hidden-text">
              <span className="name">SNP</span>
              <h6 style={{ color: "blue" }}>{username}</h6>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="menu-bar">
              <div className="menus">
                <ul className="menu">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <div className="menu-item">
                        <Link to={item.path} className="menu-link" onClick={() => toggleSubMenu(index)}>
                          <i onClick={toggleSidebar} className="menu-icon">
                            {item.icon}
                          </i>
                          <span className="hidden-text">{item.title}</span>
                          {item.submenus && (openSubMenu === index ? <FaAngleUp className="submenu-toggle" /> : <FaAngleDown className="submenu-toggle" />)}
                        </Link>
                        {item.submenus && openSubMenu === index && (
                          <ul className="submenu">
                            {item.submenus.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={subItem.path} className="submenu-link">
                                  <i className="submenu-icon">{subItem.icon}</i>
                                  <span className="hidden-text">{subItem.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bottom-content">
              <ul>
                <li>
                  <Link to="#" className="logout-link">
                    <IoIosLogOut className="logout-icon" style={{ marginRight: "5px" }} />
                    <span
                      className="hidden-text"
                      onClick={() => {
                        logoutuser();
                      }}
                    >
                      <h6>{userData}</h6>
                    </span>
                  </Link>
                </li>
                <li className="theme-mode-toggle">
                  <span style={{ fontSize: "20px" }}>{theme === "light-theme" ? <FaMoon className="mode-icon" /> : <FaSun className="mode-icon" />}</span>
                  <span className="hidden-text" style={{ marginLeft: "15px" }}>
                    {theme === "light-theme" ? " dark-theme" : "light-theme"}
                  </span>
                  <Switch onChange={toggleTheme} checked={theme === "dark-theme"} onColor="#007bff" offColor="#ccc" uncheckedIcon={false} checkedIcon={false} height={20} width={40} className="mode-switch" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar-toggle-btn">
          <FaBars />
        </div>
      </section>
      <main className="main" style={{ height: "92vh", overflowY: "auto" }}>
        <div className={`contact-container col-4  ${contactForm ? "contact-open" : ""}`}>
          <CreateContact handleContactClose={handleContactClose} />
        </div>

        {/* Account info */}
        <div className={`account-container col-4  ${accountform ? "account-open" : ""}`}>
          <CreateAccount handleAddAccount={handleAddAccount} />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
