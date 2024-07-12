"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function ManageLeaves() {
  return (
    <div className="m-20">
      <div className="p-8 bg-gray-700 flex flex-col items-center justify-center h-full ">
        <h2 className="text-2xl font-bold mb-7 text-white">
          Manage Leave Requests
        </h2>

        <div className="grid grid-cols-2 p-10">
          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Approve
          </Button>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManageLeaves;
