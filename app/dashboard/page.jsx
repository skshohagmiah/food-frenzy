'use client'
import { useRouter } from "next/navigation";

const Dashboard = () => {
const router = useRouter()
router.replace('/dashboard/profile')

  return (
    <div></div>
  )
}

export default Dashboard