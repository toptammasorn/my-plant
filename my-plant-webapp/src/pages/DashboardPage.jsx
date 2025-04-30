import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  let navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user: ", user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log("Doc snap data: ", docSnap.data());
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstname} 👋🏼</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First name: {userDetails.firstname}</p>
            <p>Last name: {userDetails.lastname}</p>
          </div>
          <button style={{ backgroundColor: "red" }} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h3>Loading...</h3>
        </>
      )}
    </div>
  );
};

export default Dashboard;
