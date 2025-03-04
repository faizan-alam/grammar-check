"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        return redirect("/");
      }
    }, [user]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
