import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth, } from "@/redux/auth/auth.slice";
import { RootState,useAppSelector } from "@/redux/store";
import { Trykker } from "next/font/google";

interface User{
  id:string;
  username:string;
}

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  
  useEffect(()=>{
    const checkUserSession=async()=>{
      if(token){
        try{
          const response=await fetch('/api/user',{
            headers:{
              'Authorization':`Bearer ${token}`
            }
          });
          if(response.ok){
            const userData=await response.json();
            dispatch(clearAuth());
          }
        }catch(error){
          console.error('Error checking user session',error);
          dispatch(clearAuth());
        }
      }else{
        dispatch(clearAuth());
      }
    };
    checkUserSession();
  },[token,dispatch]);
   return user;
};

export default useAuthSession;
