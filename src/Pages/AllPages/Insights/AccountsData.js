import "./accountsdata.css";
import React, { useState, useRef, useEffect } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Select from "react-select";

const ITEMS_PER_PAGE = 15;
const MAX_LENGTH = 10; // Define your maximum length

const renderTag = (tag) => {
  let tagName = tag.tagName;
  if (tagName.length > MAX_LENGTH) {
    tagName = tagName.substring(0, MAX_LENGTH) + "...";
  }

  return (
    <h5
      style={{
        fontSize: "10px",
        padding: "2px 5px ",
        backgroundColor: tag.tagColour,
        color: "#fff",
        borderRadius: "10px",
        textAlign: "center",
        marginBottom: "5px",
      }}
    >
      {tagName}
    </h5>
  );
};
const AccountsData = () => {
  const [acc, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter, setFilter] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [inputText, setInputText] = useState("");
  // const [showDropdownhtml, setShowDropdownhtml] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  // const [uniqueTags, setUniqueTags] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showSelectTags, setShowSelectTags] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/account/accountdetailslist/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAccounts(result.accountlist);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/tag");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allAccountIds = acc.map((account) => account.id);
      setSelectedAccounts(allAccountIds);
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleRecordCheckboxChange = (accountId) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId));
    } else {
      setSelectedAccounts([...selectedAccounts, accountId]);
    }
  };

  function getUniqueValues(columnName) {
    return [...new Set(acc.map((item) => item[columnName]))];
  }

  const uniqueTypeValues = getUniqueValues("Type");

  const filteredAccounts = acc.filter((account) => {
    return Object.values(account).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    });
  });

  useEffect(() => {
    setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, shortcuts]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddShortcut = (shortcut) => {
    if (shortcut === "Type") {
      setInputText(shortcut);
      setShowSelect(true);
      setShowDropdown(false);
    } else if (shortcut === "Tags") {
      fetchData();
      setInputText(shortcut);
      setShowSelectTags(true);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const FilterList = [
      { title: "Client Type", isBold: false, value: "Type" },
      { title: "Tags", isBold: false, value: "Tags" },
    ];
    setShortcuts(FilterList);
  }, [selectedOption]);

  const UserInitials = ({ username }) => {
    const initials = username
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return initials;
  };
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);

  // Calculate index range for the current page
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredAccounts.length);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  //
  const calculateWidth = (label) => {
    const textWidth = label.length * 8;
    return Math.min(textWidth, 200);
  };

  const options = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "5px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",

      padding: "5px 8px",
      fontSize: "10px",
      width: `${calculateWidth(tag.tagName)}px`,
    },
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
      fontSize: state.data.customStyle.fontSize,
      padding: state.data.customStyle.padding,
      margin: state.data.customStyle.margin,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: "120px",
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
      fontSize: state.data.customStyle.fontSize,
      padding: state.data.customStyle.padding,
      margin: state.data.customStyle.margin,
    }),
    control: (provided) => ({
      ...provided,
      width: 200, // Width of the select box
    }),
  };

  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <>
      <div className="account-data-con" style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem", background: "var(--table-tr-background)" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "blue", fontSize: "14px" }} type="button" className="btn  add-shortcut-button" onClick={toggleDropdown}>
            <RiAddCircleLine className="add-shortcut-icon" /> Filter
          </button>

          <div>
            {showSelect && inputText === "Type" ? (
              <Select style={{ marginTop: "10px", width: "220px" }} options={getUniqueValues("Type").map((type) => ({ value: type, label: type }))} onChange={(selectedOption, e) => setFilter(selectedOption.label)}>
                {/* <option value="">All Types</option>
                {getUniqueValues('Type').map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))} */}
              </Select>
            ) : (
              showSelectTags &&
              inputText === "Tags" && (
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  {/* <div>
                    <label className="label">Tags:</label>
                  </div> */}
                  <div>
                    <Select
                      options={options}
                      value={selectedTag}
                      onChange={(selectedOption, e) => {
                        setSelectedTag(selectedOption);
                        setFilter(selectedOption.label);
                        console.log(selectedOption.label);
                      }}
                      placeholder="Select tags..."
                      isSearchable // Enable search
                      styles={customStyles}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div>
            {showDropdown && (
              <div className="dropdown" ref={dropdownRef} style={{ position: "absolute", left: "50px", width: "250px" }}>
                <div className="search-bar">
                  <input type="text" placeholder="Search shortcuts" value={searchTerm} onChange={handleSearchChange} />
                </div>

                <ul className="dropdown-list">
                  {filteredShortcuts.map((shortcut) => (
                    <div key={shortcut.title}>
                      <span style={{ fontWeight: shortcut.isBold ? "bold" : "normal", cursor: "pointer" }} onClick={() => handleAddShortcut(shortcut.value)}>
                        {shortcut.title}
                      </span>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div style={{}}>
            <input className="searchText" type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search" style={{ fontSize: "14px", padding: "4px 8px", borderRadius: "5px" }} />
          </div>
        </div>

        <div className="tableFixHead" style={{ maxHeight: "800px", overflowY: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <input type="checkbox" checked={selectAll} onChange={handleCheckboxChange} style={{ marginRight: "20px" }} /> Name
                </th>
                <th>Follow</th>
                <th>Type</th>
                <th>Invoices</th>
                <th>Credits</th>
                <th>Tasks</th>
                <th>Team</th>
                <th>Tags</th>
                <th>Proposals</th>
                <th>Unread Chats</th>
                <th>Pending Organizers</th>
                <th>Pending Signature</th>
                <th>Last Login</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {(filteredAccounts.length > 0 ? filteredAccounts.slice(startIndex, endIndex) : acc).map((account) => {
                const matchesFilter = (account.Name && account.Name.toLowerCase().includes(filter.toLowerCase())) || (account.Follow && account.Follow.toLowerCase().includes(filter.toLowerCase())) || (account.Type && account.Type.toLowerCase().includes(filter.toLowerCase())) || (account.Invoices && account.Invoices.toLowerCase().includes(filter.toLowerCase())) || (account.Credits && account.Credits.toLowerCase().includes(filter.toLowerCase())) || (account.Tasks && account.Tasks.toLowerCase().includes(filter.toLowerCase())) || (account.Team && account.Team.some((team) => team.username.toLowerCase().includes(filter.toLowerCase()))) || (account.Proposals && account.Proposals.toLowerCase().includes(filter.toLowerCase())) || (account.Unreadchats && account.Unreadchats.toLowerCase().includes(filter.toLowerCase())) || (account.Pendingorganizers && account.Pendingorganizers.toLowerCase().includes(filter.toLowerCase())) || (account.Pendingsignatures && account.Pendingsignatures.toLowerCase().includes(filter.toLowerCase())) || (account.Lastlogin && account.Lastlogin.toLowerCase().includes(filter.toLowerCase())) || (account.Tags && account.Tags.some((tag) => tag.tagName && tag.tagName.toLowerCase().includes(filter.toLowerCase())));

                if (matchesFilter) {
                  return (
                    <tr key={account.id}>
                      <td>
                        <Link to={`/accountsdash/overview/${account.id}`} className="acc-name">
                          {" "}
                          <input type="checkbox" checked={selectedAccounts.includes(account.id)} onChange={() => handleRecordCheckboxChange(account.id)} style={{ marginRight: "20px" }} />
                          {account.Name}
                        </Link>
                      </td>
                      <td>{account.Follow}</td>
                      <td>{account.Type}</td>
                      <td>{account.Invoices}</td>
                      <td>{account.Credits}</td>
                      <td>{account.Tasks}</td>

                      <td style={{ width: "90px" }}>
                        {account.Team &&
                          account.Team.map((team, index) => (
                            <div key={team.id} style={{ display: "inline-block", marginRight: "-5px" }}>
                              <div
                                style={{
                                  backgroundColor: "#267a1f",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  width: "20px",
                                  height: "20px",
                                  fontSize: "12px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                title={team.username}
                              >
                                {team.username && <UserInitials username={team.username} />}
                              </div>
                            </div>
                          ))}
                      </td>

                      <td>
                        {/* {account.Tags && account.Tags.map(tag => (
                         
                          <h5 style={{ fontSize: "10px", padding: "3px 10px", backgroundColor: tag.tagColour, color: "#fff", borderRadius: "10px", textAlign: "center", marginBottom: '5px',     }}>{tag.tagName}</h5>
                        ))} */}
                        {account.Tags && account.Tags.map((tag) => renderTag(tag))}
                      </td>
                      <td>{account.Proposals}</td>
                      <td>{account.Unreadchats}</td>
                      <td>{account.Pendingorganizers}</td>
                      <td>{account.Pendingsignatures}</td>
                      <td>{account.Lastlogin}</td>
                      <td> </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5} // Adjust this value as needed
          marginPagesDisplayed={2} // Adjust this value as needed
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: "pointer" }} />}
          nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: "pointer" }} />}
        />
      </div>
    </>
  );
};

export default AccountsData;
