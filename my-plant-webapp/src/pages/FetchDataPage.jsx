import React, { useEffect, useState } from "react";
// firebase
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config";

const FetchDatapage = () => {
  const [intValue, setIntValue] = useState(null);
  const [floatValue, setFloatValue] = useState(null);
  const [stringValue, setStringValue] = useState("");

  const intRef = ref(database, "test/int");
  const floatRef = ref(database, "test/float");
  const stringRef = ref(database, "test/string");

  useEffect(() => {
    onValue(intRef, (snapshot) => {
      console.log("int:", snapshot.val());
      setIntValue(snapshot.val());
    });

    onValue(floatRef, (snapshot) => {
      console.log("float:", snapshot.val());
      setFloatValue(snapshot.val());
    });

    onValue(stringRef, (snapshot) => {
      console.log("string:", snapshot.val());
      setStringValue(snapshot.val());
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">My Plant Data</h2>
      <p className="text-lg">🌱 Int: {intValue}</p>
      <p className="text-lg">💧 Float: {floatValue}</p>
      <p className="text-lg">📝 String: {stringValue}</p>
    </div>
  );
};

export default FetchDatapage;
