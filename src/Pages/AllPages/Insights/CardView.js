import React from "react";
import { LuUserCircle2 } from "react-icons/lu";

import "../../../Pages/AllPages/Insights/cardview.css";
import Card from "../../../Pages/AllPages/Insights/Card";
import CardTwo from "../../../Pages/AllPages/Insights/CardTwo";
import CardThree from "../../../Pages/AllPages/Insights/CardThree";

const CardView = () => {
  return (
    <>
      <div className="card-view-container col-12">
        <div className="card-view-title col-2" style={{ height: "50px" }}>
          <div className="title-one clo-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h3 className="insights-title " style={{ fontSize: "25px" }}>
              Insights
            </h3>
            <h6 className="edit-title " style={{ fontSize: "12px", color: "blue", flex: "1", marginLeft: "10px" }}>
              Edit Widgets
            </h6>
          </div>
        </div>
        <div className="card-view-subtittle col-12" style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <h3>Jobs</h3>
          <div className="select-users col-3" style={{ alignItems: "center", display: "flex" }}>
            <LuUserCircle2 />
            <select style={{ border: "none", backgroundColor: "var(--body-color)" }}>
              <option selected>All Members</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>
        <div className="reportcard col-12" style={{ paddingRight: "20px", display: "flex", marginTop: "20px", gap: "30px" }}>
          <div className="card1 col-3" style={{ background: "#fff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
            <div className="card-info col-12" style={{ display: "flex" }}>
              <Card task="Overdue" number="0" />
            </div>
          </div>
          <div className="card1 col-3">
            <CardTwo task="Approaching deadline" number="0" option="Today" option1="Tomorow" option2="Day after Tomorow" option3="In a week" />
          </div>
          <div className="card1 col-3">
            <CardThree task="No Activity" number="10" option="Over 3 days" option1="Over 1 week" option2="Over 1 month" />
          </div>
          <div className="card1 col-3" style={{ background: "#fff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
            <div className="card-info col-12" style={{ display: "flex" }}>
              <Card task="Total" number="0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardView;
