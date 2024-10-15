"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Card from "@/app/components/Card";

export default function MainComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Card searchQuery={searchQuery} />
    </>
  );
}