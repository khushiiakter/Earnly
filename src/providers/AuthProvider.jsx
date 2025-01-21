import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../components/hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { data } = await axios.get(
        `http://localhost:5000/users/${user.email}`
      );

      if (!data) {
        const role = "Worker";
        const coins = 10;
        await axios.post("http://localhost:5000/users", {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role,
          coins,
        });
      }

      setUser(user);

      return user;
    } catch (error) {
      console.error("Google Login Error:", error);
      throw new Error("Failed to login with Google.");
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user info from the backend
          const { data } = await axios.get(
            `http://localhost:5000/users/${currentUser.email}`
          );
          setUser({
            ...currentUser,
            role: data.role,
            coins: data.coins,
          });
          setCoins(data.coins || 0);
          // Get JWT token
          const userInfo = { email: currentUser.email };
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setLoading(false);
            }
          });
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
        setUser(null);
        setCoins(0);
      }
      // setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    handleGoogleLogin,
    coins,
    loading,
    createNewUser,
    userLogIn,
    updateUserProfile,
    logOut,
    auth,
    setCoins,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
