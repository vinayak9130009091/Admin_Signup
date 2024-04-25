
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
 import AccountForm from '../../Pages/AllPages/Insights/AccountForm.js';
 import ContactForm from '../../Pages/AllPages/Insights/ContactForm.js';
const newSidebarItems = [
    { icon: AiOutlineUser, text: 'Account' ,path:'/accounts',formComponent: AccountForm},
    { icon: SlEnvolope, text: 'Contact',path:'/contacts' ,formComponent: ContactForm},
    { icon: HiOutlineDocumentPlus, text: 'Document', path:'/documentss' },
    { icon: CgFolderAdd, text: 'Folder', path:'/folder' },
    { icon: GoBook, text: 'Page', path:'/pages' },
    { icon: LiaFolderSolid, text: 'Proposal', path:'/proposal' },
    { icon: FaPaperPlane, text: 'Chat', path:'/chats' },
    { icon: CiMemoPad, text: 'Organizer', path:'/organizers' },
    { icon: VscNewFolder, text: 'Invoice', path:'/Invoice' },
    { icon: RiBillLine, text: 'Payment', path:'/payment' },
    { icon: MdOutlineAlternateEmail, text: 'Email', path:'/email' },
    { icon: LuStickyNote, text: 'Note', path:'/notes' },
    { icon: IoIosPaper, text: 'Task', path:'/tasks' },
    { icon: MdMoreTime, text: 'Time Entry', path:'/time-entry' },
    { icon: PiSuitcaseSimpleBold, text: 'Job', path:'/jobss' },
];



export default newSidebarItems