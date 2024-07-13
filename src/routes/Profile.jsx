import { useAuth0 } from "@auth0/auth0-react";
import "../css/profile.css";
import ProfileNavbar from "../profile/ProfileNavbar";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="profile-section">
      <div className="banner"></div>
      <img
        src={isAuthenticated ? user.picture : ""}
        className="profile-picture"
      />
      <div className="user-info-section">
        <h5 className="profile-name">{isAuthenticated ? user.nickname : ""}</h5>
      </div>
      <ProfileNavbar />
    </div>
  );
}

export default Profile;
