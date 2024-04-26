import React, { useState, useEffect } from "react";
// import accounts from "./AccountDumy"; // Importing dummy data
import "./accountsdata.css"; // Importing CSS file
import { RiDeleteBin5Line } from "react-icons/ri"; // Importing delete icon
import DropdownMenu from "./FilterDropdown"; // Importing dropdown menu component
import ReactPaginate from "react-paginate";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
const ITEMS_PER_PAGE = 5;
const AccountsData = () => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const columns = ["Client Type", "Tags", "Team", "Pipeline and Stages", "Invoices"];
  // Fetching data from server on component mount
  useEffect(() => {
    // Fetching contact data
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://68.251.138.233:8080/common/contact/contactlist/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setContacts(result.contactlist);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to delete a contact
  const handleDelete = (_id) => {
    // Sending DELETE request
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://68.251.138.233:8080/common/contact/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  // Function to handle checkbox changes
  const handleRecordCheckboxChange = (id) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        return prevSelectedContacts.filter((contactId) => contactId !== id);
      } else {
        return [...prevSelectedContacts, id];
      }
    });
  };

  // Function to handle master checkbox change
  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allcontactIds = contacts.map((contact) => contact.id);
      setSelectedContacts(allcontactIds);
    } else {
      setSelectedContacts([]);
    }
  };

  // Filtering contacts based on search text
  const filteredContacts = contacts.filter((contact) => (contact.Name && contact.Name.toLowerCase().includes(filter.toLowerCase())) || (contact.Email && contact.Email.toLowerCase().includes(filter.toLowerCase())) || (contact.phoneNumber instanceof Array && contact.phoneNumber.some((number) => number && number.toLowerCase().includes(filter.toLowerCase()))) || (contact.Tags && contact.Tags.some((tagArray) => tagArray.some((tag) => tag.tagName && tag.tagName.toLowerCase().includes(filter.toLowerCase())))));

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);

  // Calculate index range for the current page
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredContacts.length);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // Rendering
  return (
    <div style={{ padding: "20px" }}>
      {/* <div style={{ marginLeft: "20px", width: "25%", height: "10px", padding: "15px 10px", borderRadius: "20px" }}>
        <DropdownMenu columns={columns} />
      </div> */}

      <div style={{ position: "relative", textAlign: "right", padding: "0.5rem 1rem", background: "var(--table-tr-background)" }}>
        <input className="searchText" type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search" style={{ fontSize: "14px", padding: "4px 8px", borderRadius: "5px" }} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectAll} onChange={handleCheckboxChange} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Company Name</th>
              <th>Tags</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.slice(startIndex, endIndex).map((contact) => (
              <tr key={contact.id}>
                <td>
                  <input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={() => handleRecordCheckboxChange(contact.id)} />
                </td>
                <td>{contact.Name}</td>
                <td>{contact.Email}</td>
                <td>{contact.phoneNumber ? contact.phoneNumber.map((number, index) => <div key={index}>{number}</div>) : <span> </span>}</td>
                <td>{contact.companyName}</td>
                <td>
                  {/* {contact.Tags &&
                    contact.Tags.map((tagArray) => (
                      <div key={tagArray[0]._id}>
                        {tagArray.map((tag) => (
                          <h5 key={tag._id} style={{ fontSize: "12px", padding: "2px 3px", backgroundColor: tag.tagColour, color: "#fff", borderRadius: "50px", textAlign: "center", marginBottom: "5px", }}>
                            {tag.tagName}
                          </h5>
                        ))}
                      </div>
                    ))} */}
                  {contact.Tags &&
                    contact.Tags.map((tagArray) => (
                      <div key={tagArray[0]._id}>
                        {tagArray.map((tag) => (
                          <h5
                            key={tag._id}
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
                            {tag.tagName && tag.tagName.length > 10 ? <span title={tag.tagName}>{tag.tagName.slice(0, 10)}...</span> : tag.tagName}
                          </h5>
                        ))}
                      </div>
                    ))}
                </td>
                <td style={{ color: "red" }}>
                  {" "}
                  <RiDeleteBin5Line onClick={(txt) => handleDelete(contact.id)} />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
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
  );
};

export default AccountsData;
