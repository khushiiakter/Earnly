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

  
  const createNewUser = async (email, password, name, photo, role) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL: photo });
    const newUser = {
      name,
      email,
      image: photo,
      role,
      coins: role === "Worker" ? 10 : 50,
    };
    await axios.post("https://earnly-server.vercel.app/users", newUser);
    setUser({ ...result.user, coins: newUser.coins, role: newUser.role });
    setCoins(newUser.coins);
    return result.user;
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
        `https://earnly-server.vercel.app/users/${user.email}`
      );

      if (!data) {
        const role = "Worker";
        const coins = 10;
        await axios.post("https://earnly-server.vercel.app/users", {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role,
          coins,
        });
      }

      setUser({ ...user, coins: data?.coins || 10 });
      setCoins(data?.coins || 10);
      setLoading(false);
      return user;
    } catch (error) {
      console.error("Google Login Error:", error);
      throw new Error("Failed to login with Google.");
    }
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setCoins(0);
        localStorage.removeItem("access-token");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const { data } = await axios.get(
            `https://earnly-server.vercel.app/users/${currentUser.email}`
          );
          if(data){
            setUser({
              ...currentUser,
              role: data.role,
              coins: data.coins,
            });
            setCoins(data.coins || 0);
          }
          
          // setCoins((prevCoins) => prevCoins || data.coins || 0);
          
          // Get JWT token
          const userInfo = { email: currentUser.email };
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setLoading(false);
            }
           
          })
        } catch (error) {
          console.error("Failed to fetch user data:", error);
         
        }
      } else {
       
         setLoading(false);
        setUser(null);
        setCoins(0);
        localStorage.removeItem("access-token");
        
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
