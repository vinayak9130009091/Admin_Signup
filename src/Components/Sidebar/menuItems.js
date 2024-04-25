import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {AiOutlineHome} from "react-icons/ai"
import { MdOutlineMail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";


import { TfiLayersAlt } from "react-icons/tfi";
import {  IoPeopleOutline} from "react-icons/io5";
import { ImInsertTemplate } from "react-icons/im";


export const menuItems = [
  // {
  //   title: 'Home',
  //   icon: <AiOutlineHome />,
  //   path: '/',
  // },
  {
    title: "Insights",
    path: "/",
    icon: <AiOutlineAppstoreAdd />,
  },

  {
    title: "Inbox +",
    path: "/inbox",
    icon: <MdOutlineMail />,
  },
  {
    title: "Clients", 
    icon: <IoPeopleOutline />,
    submenus: [
      {
        title: "Accounts",
        path: "/accounts",
        icon: <GoDotFill />
        ,
        
      },
      {
        title: "Contacts",
        path: "/contacts",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Workflow", 
    icon: <TfiLayersAlt />,
    submenus: [
      {
        title: "Tasks",
        path: "/marketplace",
        icon: <GoDotFill />,
      },
      {
        title: "Jobs",
        path: "/firmtemplates",
        icon: <GoDotFill />,
      },
      {
        title: "Jobrecurrences",
        path: "/tags",
        icon: <GoDotFill />,
      },
      {
        title: "Pipelines",
        path: "/pipeline",
        icon: <GoDotFill />,
      },
     
    ],
  },
  
{
    title: "Templates", 
    icon: <ImInsertTemplate />,
    submenus: [
      
      {
        title: "Firm templates",
        path: "/submenu2",
        icon: <GoDotFill />,
      },
     
      {
        title: "Tags",
        path: "/tags",
        icon: <GoDotFill />,
      },
      {
        title: "Services",
        path: "/submenu2",
        icon: <GoDotFill />,
      },
     
    ],
  },
  
];
