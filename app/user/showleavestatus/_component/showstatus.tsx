"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface LeaveRequest {
  id: number;
  userId: number;
  From: Date;
  To: Date;
  name: string;
  Reason: string;
  status: string;
}

const ShowStatus = ({
  initialLeaveRequests,
}: {
  initialLeaveRequests: LeaveRequest[];
}) => {
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(initialLeaveRequests);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="bg-gray-400 p-8 m-8"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {leaveRequests.map((request) => (
            <Card key={request.id} className="m-2">
              <CardHeader>{request.name}</CardHeader>
              <CardContent>
                <CardDescription>
                  <strong>From:</strong> {request.From.toDateString()} <br />
                  <strong>To:</strong> {request.To.toDateString()} <br />
                  <strong>Reason:</strong> {request.Reason} <br />
                  <strong>Status:</strong> {request.status}
                </CardDescription>
              </CardContent>
              <CardFooter>Request ID: {request.id}</CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowStatus;
