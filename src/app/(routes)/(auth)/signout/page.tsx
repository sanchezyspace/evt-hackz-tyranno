"use client"
import { auth } from "@/app/_utils/firebase_authentication";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Page () {
  const router = useRouter()

  useEffect(() => {
    signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
      router.push("/signin")
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, [])

  return (
    <>
      <h1>signout...</h1>
    </>
  )
}
  