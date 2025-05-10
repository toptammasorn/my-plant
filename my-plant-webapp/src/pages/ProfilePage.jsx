import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";

// components
import Header from "../components/common/Header";
import { CardProfile, CardPhoto } from "../components/common/Card";
import PacmanSpinner from "../components/spinners/PacmanSpinner.jsx";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true);
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
        await delay();
        setLoading(false);
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Profile" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-[2fr_auto] gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <CardProfile cardName="First name" information="Apiwat" />
          <CardProfile cardName="Last name" information="Taninipong" /> */}

          <motion.div
            className="bg-white/10 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="p-5 pb-0 text-2xl">Information</div>
            {loading ? (
              <PacmanSpinner
                name="profile"
                loading={true}
                pacColor={"#9ca3af"}
              />
            ) : (
              <div className="px-4 py-5 sm:p-6 space-y-2">
                {/* User information cards */}
                {userDetails && (
                  <>
                    <CardProfile
                      cardName="First name"
                      information={userDetails.firstname}
                    />
                    <CardProfile
                      cardName="Last name"
                      information={userDetails.lastname}
                    />
                    <CardProfile
                      cardName="Email"
                      information={userDetails.email}
                    />
                  </>
                )}
              </div>
            )}
          </motion.div>

          <CardPhoto className="w-[250px] bg-white/10" />
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
