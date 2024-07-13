import UserPosts from "./UserPosts";
import LikedPost from "./LikedPosts";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
function ProfileNavbar() {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" className="profile-navbar">
          <Tab key="Posts" title="Your posts">
            <Card
              style={{
                width: "100.8%",
                marginLeft: "-4px",
                backgroundColor: "rgb(250, 247, 247)",
                borderRadius: 0,
              }}
            >
              <CardBody>
                <UserPosts />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Liked" title="Liked posts">
            <Card
              style={{
                width: "100.8%",
                marginLeft: "-4px",
                backgroundColor: "rgb(250, 247, 247)",
                borderRadius: 0,
              }}
            >
              <CardBody>
                <LikedPost />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default ProfileNavbar;
