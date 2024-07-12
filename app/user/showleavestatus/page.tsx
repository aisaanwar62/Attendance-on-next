import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import ShowStatus from "./_component/showstatus";

interface LeaveRequest {
  id: number;
  userId: number;
  From: Date;
  To: Date;
  name: string;
  Reason: string;
  status: string;
}

const Show = async () => {
  const user = await auth();
  console.log(user.data.id);
  let initialLeaveRequests: LeaveRequest[] = [];

  if (user) {
    initialLeaveRequests = await db.leaveRequest.findMany({
      where: { userId: user.data.id },
    });
  }

  return (
    <div className="bg-gray-400 p-8 space-y-8 m-8">
      <ShowStatus initialLeaveRequests={initialLeaveRequests} />
    </div>
  );
};

export default Show;
