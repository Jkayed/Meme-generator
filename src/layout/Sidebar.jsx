import Layout from "./Layout.jsx";
import { SidebarItem } from "./Layout.jsx";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdOutlineFeed } from "react-icons/md";
import { MdPerson } from "react-icons/md";

import { useAuth0 } from "@auth0/auth0-react";
function Sidebar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <main>
      <Layout>
        <Link to="/creatememe" aria-current="page">
          <SidebarItem text="Create meme" icon={<IoCreate size={20} />} />
        </Link>
        <Link to="/feed" aria-current="page">
          <SidebarItem text="feed" icon={<MdOutlineFeed size={20} />} />
        </Link>
        <Link to="/profile" aria-current="page">
          <SidebarItem text="profile" icon={<MdPerson size={20} />} />
        </Link>
        <SidebarItem text="profile" icon={<MdPerson size={20} />} />
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>
            <SidebarItem
              text="log in"
              icon={<MdPerson size={20} />}
            ></SidebarItem>
          </button>
        )}
      </Layout>
    </main>
  );
}

export default Sidebar;

// import { Outlet } from "react-router-dom";
// import axios from "axios";
// // import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
// import { IoIosMenu } from "react-icons/io";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import "../App.css";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   Button,
//   Image,
// } from "@nextui-org/react";
// const SidebarContext = createContext();
// function Layout({ children, handlefile }) {
//   const [expanded, setExpanded] = useState(true);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [backdrop, setBackdrop] = useState("opaque");
//   const [file, setFile] = useState();
//   const [caption, setCaption] = useState("");
//   const hiddenFileInput = useRef(null);

//   function handleChange(e) {
//     setFile(e.target.files[0]);
//   }

//   const handleOpen = (backdrop) => {
//     setBackdrop(backdrop);
//     onOpen();
//   };

//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };

//   const handleCaption = (event) => {
//     setCaption(event.target.value);
//   };

//   const handlePost = async () => {
//     if (file == undefined) {
//       return;
//     } else {
//       try {
//         const formData = new FormData();
//         formData.append("userID", caption);
//         formData.append("memeImage", file);

//         axios
//           .post("http://localhost:3001/saveMeme", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((response) => {
//             console.log(response);
//           })
//           .catch((err) => console.log(err));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     onClose();
//   };

//   return (
//     <>
//       <aside className="h-screen w-44">
//         <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//           <div className="p-4 pb-2 flex justify-between items-center">
//             <img
//               src="#"
//               className={overflow-hidden transition-all ${
//                 expanded ? "w-32" : "w-0"
//               }}
//               alt=""
//             />
//             <button
//               onClick={() => setExpanded((curr) => !curr)}
//               className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//             >
//               {expanded ? <IoIosMenu /> : <IoIosMenu />}
//             </button>
//           </div>

//           <SidebarContext.Provider value={{ expanded }}>
//             <ul className="flex-1 px-3">{children}</ul>
//           </SidebarContext.Provider>

//           <div className="border-t flex p-3">
//             <img
//               src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
//               alt=""
//               className="w-10 h-10 rounded-md"
//             />
//             <div
//               className={
//               flex justify-between items-center
//               overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
//           }
//             >
//               <div className="leading-4">
//                 <h4 className="font-semibold">John Doe</h4>
//                 <span className="text-xs text-gray-600">johndoe@gmail.com</span>
//               </div>
//               <IoIosMenu size={20} />
//             </div>
//           </div>
//         </nav>
//       </aside>
//       {/* <div>
//         <header>
//           <Navbar position="static">
//             <NavbarBrand>
//               <p className="font-bold text-inherit">ACME</p>
//             </NavbarBrand>
//             <NavbarContent className="hidden sm:flex gap-4" justify="center">
//               <NavbarItem>
//                 <Link color="foreground" href="/feed">
//                   Feed
//                 </Link>
//               </NavbarItem>
//               <NavbarItem isActive>
//                 <Link href="/creatememe" aria-current="page">
//                   Create meme
//                 </Link>
//               </NavbarItem>
//               <NavbarItem>
//                 <Link color="foreground" href="/profile">
//                   Profile
//                 </Link>
//               </NavbarItem>
//               <NavbarItem>
//                 <>
//                   <div className="flex flex-wrap gap-3">
//                     <Button
//                       as={Link}
//                       key={"opaque"}
//                       variant="flat"
//                       color="warning"
//                       onPress={() => handleOpen("opaque")}
//                       className="capitalize"
//                     >
//                       Post
//                     </Button>
//                   </div>
//                   <Modal
//                     backdrop={backdrop}
//                     isOpen={isOpen}
//                     onClose={onClose}
//                     size="2xl"
//                   >
//                     <ModalContent>
//                       {(onClose) => (
//                         <>
//                           <ModalHeader className="flex flex-col gap-1">
//                             Upload a meme
//                           </ModalHeader>
//                           <hr style={{ height: 5 }} />
//                           <ModalBody>
//                             {file == undefined ? (
//                               <Button
//                                 className="w-48 m-auto"
//                                 color="primary"
//                                 variant="solid"
//                                 onClick={handleClick}
//                               >
//                                 Upload a meme
//                               </Button>
//                             ) : (
//                               ""
//                             )}
//                             <input
//                               type="file"
//                               onChange={handleChange}
//                               ref={hiddenFileInput}
//                               style={{ display: "none" }}
//                             />
//                             <div style={{ display: "flex" }}>
//                               <Image
//                                 width={300}
//                                 alt="NextUI hero Image"
//                                 className="h-72 object-cover rounded-none"
//                                 src={file ? URL.createObjectURL(file) : ""}
//                               />
//                               {file != undefined ? (
//                                 <textarea
//                                   onChange={handleCaption}
//                                   className="meme-caption-field"
//                                   placeholder="Enter a caption..."
//                                 />
//                               ) : (
//                                 ""
//                               )}
//                             </div>
//                           </ModalBody>
//                           <ModalFooter>
//                             {file != undefined ? (
//                               <>
//                                 <Button
//                                   color="primary"
//                                   variant="light"
//                                   onClick={handleClick}
//                                 >
//                                   Choose different meme
//                                 </Button>
//                                 <Button color="primary" onClick={handlePost}>
//                                   Post
//                                 </Button>
//                               </>
//                             ) : (
//                               ""
//                             )}
//                           </ModalFooter>
//                         </>
//                       )}
//                     </ModalContent>
//                   </Modal>
//                 </>
//               </NavbarItem>
//             </NavbarContent>
//             <NavbarContent justify="end">
//               <NavbarItem className="hidden lg:flex">
//                 <Link href="#">Login</Link>
//               </NavbarItem>
//               <NavbarItem>
//                 <Button as={Link} color="primary" href="#" variant="flat">
//                   Sign Up
//                 </Button>
//               </NavbarItem>
//             </NavbarContent>
//           </Navbar>
//         </header>
//         <main>
//           <Outlet />
//         </main>
//       </div> */}

//       ;
//     </>
//   );
// }
