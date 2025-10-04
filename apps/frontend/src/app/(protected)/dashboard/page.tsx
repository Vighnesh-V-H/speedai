"use client";
import { useAuth } from "@/hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();
  console.log(user);
  return <div>hie</div>;
}

export default Dashboard;
