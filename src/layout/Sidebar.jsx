import { useState, useRef } from "react";
import Layout from "./Layout.jsx";
import axios from "axios";
import { SidebarItem } from "./Layout.jsx";
import { Link } from "react-router-dom";
import { MdOutlineFeed } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoIosCreate } from "react-icons/io";
import { SiFunimation } from "react-icons/si";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
function Sidebar() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();
  const [backdrop, setBackdrop] = useState("opaque");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const hiddenFileInput = useRef(null);
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleCaption = (event) => {
    setCaption(event.target.value);
  };
  const handlePost = async () => {
    if (file == undefined) {
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append("userID", user.nickname);
        formData.append("memeImage", file);
        formData.append("caption", caption);
        formData.append("userImage", user.picture);

        axios
          .post("http://localhost:3001/saveMeme", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            onClose();
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <main>
        <Layout>
          <Link to="/creatememe" aria-current="page">
            <SidebarItem text="Create meme" icon={<SiFunimation size={20} />} />
          </Link>
          <Link to="/feed" aria-current="page">
            <SidebarItem text="Feed" icon={<MdOutlineFeed size={20} />} />
          </Link>
          {isAuthenticated && (
            <Link to="/profile" aria-current="page">
              <SidebarItem text="Profile" icon={<MdPerson size={20} />} />
            </Link>
          )}
          {isAuthenticated && (
            <div onClick={() => handleOpen("opaque")}>
              <SidebarItem
                text="Create post"
                icon={<IoIosCreate size={20} />}
              ></SidebarItem>
            </div>
          )}
          {!isAuthenticated && (
            <div onClick={() => loginWithRedirect({})}>
              <SidebarItem
                text="Log in"
                icon={<CiLogin size={20} />}
              ></SidebarItem>
            </div>
          )}
          {isAuthenticated && (
            <div onClick={() => logout({})}>
              <SidebarItem
                text="Log out"
                icon={<CiLogout size={20} />}
              ></SidebarItem>
            </div>
          )}
        </Layout>
      </main>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload a meme
              </ModalHeader>
              <hr style={{ height: 5 }} />
              <ModalBody>
                {file == undefined ? (
                  <Button
                    className="w-48 m-auto"
                    color="primary"
                    variant="solid"
                    onClick={handleClick}
                  >
                    Upload a meme
                  </Button>
                ) : (
                  ""
                )}
                <input
                  type="file"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
                <div style={{ display: "flex" }}>
                  {file != undefined ? (
                    <img
                      width={300}
                      alt=""
                      className="h-72 object-contain rounded-none border-1 "
                      src={file ? URL.createObjectURL(file) : ""}
                    />
                  ) : (
                    ""
                  )}
                  {file != undefined ? (
                    <textarea
                      onChange={handleCaption}
                      placeholder="Enter a caption..."
                    />
                  ) : (
                    ""
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                {file != undefined ? (
                  <>
                    <Button
                      color="success"
                      variant="light"
                      onClick={handleClick}
                    >
                      Choose different meme
                    </Button>
                    <Button
                      color="success"
                      className="text-white"
                      onClick={handlePost}
                    >
                      Post
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Sidebar;
