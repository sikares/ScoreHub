"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function MainComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <Card searchQuery={searchQuery} />
    </div>
  );
}
