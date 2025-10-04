"use client";
import { useAuth } from "@/hooks/useAuth";

function Dashboard() {
  const { loading } = useAuth();

  if (loading) {
    return <div>loadin..</div>;
  }

  return <div>hie</div>;
}

export default Dashboard;
