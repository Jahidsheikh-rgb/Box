import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { dummyUsers } from "../Components/Common/dummyUsers"; // MUST IMPORT THIS

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithDummy = (userData) => {
    setUser(userData);
    localStorage.setItem("dummy-user", JSON.stringify(userData));
    setLoading(false);
  };

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("dummy-user");
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- FIXED OBSERVER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const savedDummy = localStorage.getItem("dummy-user");

      if (firebaseUser) {
        // Find the user in your dummy list to get their role
        const match = dummyUsers.find(
          (u) => u.email.toLowerCase() === firebaseUser.email.toLowerCase()
        );

        // Merge Firebase data with the Dummy Role
        setUser({
          ...firebaseUser,
          role: match?.role || "user", // Attach role here
          displayName: match?.name || firebaseUser.displayName,
          photoURL: match?.photo || firebaseUser.photoURL
        });
      } else if (savedDummy) {
        // If no Firebase user, check if a dummy user was manually logged in
        setUser(JSON.parse(savedDummy));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithDummy,
    logoutUser,
    updateUserProfile,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};