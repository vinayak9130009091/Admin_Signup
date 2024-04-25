import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./tagcreate.css";
// import { TfiPencilAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
// import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import ReactPaginate from 'react-paginate';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const TagCreate = () => {

    const navigate = useNavigate();
    const updateTag = () => { };
    const [isTagFormOpen, setIsTagFormOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [isNewTagFormOpen, setIsNewTagFormOpen] = useState(false)
    const colors = ["#EE4B2B", "#FFAC1C", "#32CD32", "#008000", "#0000FF", "#BF40BF", "#F72798"];

    const [Save, setSave] = useState(false);
    // const [Cnsl,setCnsl]=useState(false);



    const handleSaveClick = () => {
        setSave(!Save)
    }

    const calculateWidth = (label) => {
        const textWidth = label.length * 8;
        return Math.min(textWidth, 200);
    };

    const [tagid, settagidData] = useState();
    const handleEdit = async (_id) => {

        setGetId(_id)

        setOpenMenuId(false)
        setIsTagFormOpen(!isTagFormOpen);

        const response = await fetch('http://68.251.138.233:8080/common/tag/' + _id);

        if (!response.ok) {
            throw new Error('Failed to fetch job data');
        }
        const data = await response.json();
        settagidData(data.tag)
        setInputValue(data.tag.tagName)

        const newOptions = generateOptions(data.tag.tagName);
        setOptions(newOptions);


        if (tagid && tagid) {

            const tags = tagid.map(tag => ({
                value: tag._id,
                label: tag.tagName,
                colour: tag.tagColour,

                customStyle: {
                    backgroundColor: tag.tagColour,
                    color: "#fff",
                    borderRadius: "8px",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: "5px",
                    padding: "2px,8px",

                    fontSize: '10px',
                    width: `${calculateWidth(tag.tagName)}px`,
                    margin: '7px'
                },
            }));

            setSelectedOption(tags);
        }


    };



    const handleFormClose = () => {
        setIsTagFormOpen(false);
    };
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };



    const handleInputChange = (inputValue) => {
        setInputValue(inputValue);
        const newOptions = generateOptions(inputValue);
        setOptions(newOptions);
    };

    const generateOptions = (inputValue) => {
        return colors.map((tagColour, index) => ({
            //   value: ${inputValue.toLowerCase()}-${index},
            value: `${inputValue.toLowerCase()}-${index}`,
            tagName: inputValue,
            tagColour: tagColour,
        }));
    };

    const handleUpdatesumbit = () => {
        if (selectedOption) {
            const { tagName: tagName, tagColour } = selectedOption;
            // console.log("Submitted name:", tagName);
            // console.log("Submitted color:", tagColour);

            // Send API data
            UpdatedTag(tagName, tagColour);
        }
        // console.log("Submitted data:", selectedOption);
    };


    const handleSubmit = () => {
        if (selectedOption) {
            const { tagName: tagName, tagColour } = selectedOption;
            // console.log("Submitted name:", tagName);
            // console.log("Submitted color:", tagColour);

            // Send API data
            sendApiData(tagName, tagColour);
        }
        // console.log("Submitted data:", selectedOption);
    };

    const sendApiData = (tagName, tagColour) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            tagName: tagName,
            tagColour: tagColour,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://68.251.138.233:8080/common/tag/", requestOptions)
            .then((response) => response.text())
        // .then((result) => console.log(result))
        toast.success("Tag data sent successfully!");
        window.location.reload();

    };
    const handleNewTagCreate = () => {
        setIsNewTagFormOpen(!isNewTagFormOpen)
    }
    const handleTagFormClose = () => {
        setIsNewTagFormOpen(false)
    }
    const handleClear = () => {
        setInputValue("");
        setSelectedOption(null);
        setOptions([]);
    };

    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://68.251.138.233:8080/common/tag/");
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    //


    const [getId, setGetId] = useState("");
    //delete template
    const handleDelete = (_id) => {

        setGetId(_id)


        setOpenMenuId(false)
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("http://68.251.138.233:8080/common/tag/" + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                return response.text();
            })
            .then((result) => {
                console.log(result);
                toast.success('Item deleted successfully');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to delete item');
            })
            .finally(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
    };



    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(5);
    const [tagidget, setTagidGet] = useState("");
    // Pagination event handler
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Pagination calculation
    const offset = currentPage * perPage;
    const pageCount = Math.ceil(tags.length / perPage);
    const currentTemplates = tags.slice(offset, offset + perPage);

    const [openMenuId, setOpenMenuId] = useState(null);
    const toggleMenu = (_id) => {
        setOpenMenuId(openMenuId === _id ? null : _id);
        setTagidGet(_id)
    };











    const UpdatedTag = (tagName, tagColour) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            tagName: tagName,
            tagColour: tagColour
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://68.251.138.233:8080/common/tag/" + getId, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((result) => {
                // Assuming you have a function to show a toast notification
                console.log(result);
                toast.success('Tag Updated successfully');

                window.location.reload();
            })
            .catch((error) => {
                // Assuming you have a function to show a toast notification

                console.error(error);
            });


    }



    return (
        <>

            <div className="create-tag-button" >
                <button className="btn1" style={{ float: 'right' }} onClick={handleNewTagCreate} >New tag</button>
            </div>

            <div >
                <h3>Tags Table</h3>

                <table style={{ marginTop: '30px' }}>
                    <thead>
                        <tr >
                            <th>Tag</th>
                            <th>Accounts</th>
                            <th>Archived accounts</th>
                            <th>Pending tasks</th>
                            <th>Completed tasks</th>
                            <th>Pipelines</th>
                            <th>
                                <FiSettings />
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {currentTemplates.map((tag) => (
                            <tr key={tag._id} >
                                <td style={{ textAlign: "center", padding: "0.5rem" }}>
                                    <span
                                        style={{
                                            backgroundColor: tag.tagColour,
                                            color: "#fff",
                                            borderRadius: "60px",
                                            padding: "0.2rem 0.5rem",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {tag.tagName}
                                    </span>
                                </td>
                                <td>1</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>

                                    <div style={{ position: 'relative' }}>
                                        <div style={{ color: "#2c59fa" }} className="verticaldots">
                                            <button
                                                onClick={() => {
                                                    updateTag(tag._id);
                                                }}
                                                style={{ marginLeft: "10px", background: "none", color: "black", border: 'none' }}
                                                className="btn btn-success"
                                            >
                                                <CiMenuKebab
                                                    onClick={() => toggleMenu(tag._id)}
                                                    style={{
                                                        fontSize: "20px",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                                {openMenuId === tag._id && (
                                                    <div className="menu-options">
                                                        <div onClick={() => handleEdit(tag._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                                                        <div onClick={() => handleDelete(tag._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>





                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={`tag-form-container ${isTagFormOpen ? "tag-form-open" : ""}`}>
                    <div className="edit-tag-header">
                        <h3>Edit Tag</h3>
                        <div onClick={handleFormClose} style={{ color: "#2c59fa", fontSize: '20px', cursor: 'pointer' }} className="cross"><RxCross2 /></div>
                    </div>
                    <hr />

                    <div className='tag-form-area'>
                        <div className='create-form col-12'>
                            <div>
                                <label style={{ fontSize: '14px' }}>Name</label>
                                <input type='text' value={inputValue} onChange={(e) => handleInputChange(e.target.value)} className='tag-input' style={{ padding: '8px 12px', width: '100%', border: "2px solid rgb(100, 149, 237)", borderRadius: '10px', margin: '10px 0' }} />
                            </div>

                            <div className='select-container'>
                                <div className='label-container'>
                                    <label>Color</label>
                                </div>
                                <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ marginTop: "20px", color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center" }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
                            </div>
                        </div>
                    </div>

                    <div className="tag-btns">

                        <button onClick={handleUpdatesumbit} type="button" className="btn1" >Save </button>
                        <button onClick={handleFormClose} type="button" className="btn2" >Cancel</button>
                    </div>
                </div>
                <div className={`new-tag-form-container ${isNewTagFormOpen ? "new-tag-form-open" : ""}`}>
                    <div className="new-tag-header">
                        <h3>Create Tag</h3>
                        <div onClick={handleTagFormClose} style={{ color: "#2c59fa", fontSize: '20px', cursor: 'pointer' }} className="cross"><RxCross2 /></div>
                    </div>

                    <div className="tag-container-new">
                        <div>
                            <div className='label-container'>
                                <label>Name</label>
                            </div>
                            <input type="text" placeholder="Tag Name" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} style={{ padding: '8px 12px', width: '100%', border: "2px solid rgb(100, 149, 237)", borderRadius: '10px', margin: '10px 0' }} />
                        </div>
                        <div className='select-container'>
                            <div className='label-container'>
                                <label>Color</label>
                            </div>
                            <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center", alignItems: 'center' }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '25px' }}>
                            <button onClick={handleSubmit} className="btn1">
                                Submit
                            </button>
                            <button onClick={handleClear} className="btn2">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: 'pointer' }} />}
                    nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: 'pointer' }} />}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div >
        </>
    );
};

export default TagCreate;
