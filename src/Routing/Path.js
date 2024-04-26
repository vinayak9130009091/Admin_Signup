import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../Logins/AdminLogin/AdminLogin/AdminLogin";
import Error from "../Error404/Error";
import "../App.css";

import AdminSignup from "../Logins/AdminLogin/AdminSignup/AdminSignUp.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import ForgotPassword from "../Logins/AdminLogin/AdminLogin/ForgotPassword";
import ResetPassword from "../Logins/AdminLogin/AdminLogin/ResetPassword";
// import Home from '../Pages/AllPages/Insights/Home.js'
import Insights from "../Pages/AllPages/Insights/Insights.js";
import AccountsData from "../Pages/AllPages/Insights/AccountsData.js";

import Overview from "../Components/nested-navbar/NewPages/Overview.js";
import Notes from "../Components/nested-navbar/NewPages/Notes";
import Workflow from "../Components/nested-navbar/NewPages/Workflow";
import Pipelines from "../Components/nested-navbar/workflow-nav/Pipelines";
import ActiveJobs from "../Components/nested-navbar/workflow-nav/ActiveJobs";
import ArchivedJobs from "../Components/nested-navbar/workflow-nav/ArchivedJobs";
import Info from "../Components/nested-navbar/NewPages/Info";
import Proposals from "../Components/nested-navbar/NewPages/Proposals";
import Docs from "../Components/nested-navbar/NewPages/Docs";
import Communication from "../Components/nested-navbar/NewPages/Commuication";
import Organizers from "../Components/nested-navbar/NewPages/Organizers";
import Invoices from "../Components/nested-navbar/NewPages/Invoices";
import Email from "../Components/nested-navbar/NewPages/Email";
import Inbox from "../Components/nested-navbar/email-nav/Inbox";
import Sent from "../Components/nested-navbar/email-nav/Sent";
import Payments from "../Components/nested-navbar/invoices-nav/Payments";
import Invoice from "../Components/nested-navbar/invoices-nav/Invoice";
import AccountDash from "../Pages/AllPages/Insights/AccountsDash.js";
import Documents from "../Components/nested-navbar/documents-nav/Documents";
import Approvals from "../Components/nested-navbar/documents-nav/Approvals";
import Signatures from "../Components/nested-navbar/documents-nav/Signatures";
import FileRequest from "../Components/nested-navbar/documents-nav/FileRequest";
import Trash from "../Components/nested-navbar/documents-nav/Trash";
import IRS from "../Components/nested-navbar/documents-nav/IRS";
import TagCreate from "../Pages/AllPages/Insights/TagCreate.js";
import ContactTable from "../Pages/AllPages/Insights/ContactTable.js";
const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Insights />} />
          <Route path="/accounts" element={<AccountsData />} />
          <Route path="*" element={<Error />} />
          <Route path="/tags" element={<TagCreate />} />
          <Route path="/contacts" element={<ContactTable />} />
          {/* <Route path='/contacts' element={<Contact/>}/> */}
          <Route path="/accountsdash" element={<AccountDash />}>
            <Route path="overview/:data" element={<Overview />} />
            <Route path="info/:data" element={<Info />} />
            <Route path="docs/:data" element={<Docs />}>
              <Route path="documents" element={<Documents />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="signatures" element={<Signatures />} />
              <Route path="filerequests" element={<FileRequest />} />
              <Route path="trash" element={<Trash />} />
              <Route path="irs" element={<IRS />} />
            </Route>
            <Route path="communication/:data" element={<Communication />} />
            <Route path="organizers/:data" element={<Organizers />} />
            <Route path="invoices/:data" element={<Invoices />}>
              <Route path="invoice" element={<Invoice />} />
              <Route path="payments" element={<Payments />} />
            </Route>
            <Route path="email/:data" element={<Email />}>
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
            </Route>
            <Route path="proposals/:data" element={<Proposals />} />
            <Route path="notes/:data" element={<Notes />} />

            <Route path="workflow/:data" element={<Workflow />}>
              <Route path="pipelines" element={<Pipelines />} />
              <Route path="activejobs" element={<ActiveJobs />} />
              <Route path="archivedjobs" element={<ArchivedJobs />} />
            </Route>
          </Route>
        </Route>
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
