"use client";
import { useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user !== undefined) {
      const redirectTo = user ? "/grammar" : "/login";
      router.push(redirectTo);
    }
  }, [user, router]);

  return null;
}
