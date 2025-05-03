import React from "react";
import { motion } from "framer-motion";

// components
import Header from "../components/common/Header";
import { CardProfile, CardPhoto } from "../components/common/Card";

const ProfilePage = () => {
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
          <CardProfile name="Tammasorn" value={60} />
          <CardPhoto className="w-[250px]" />
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
