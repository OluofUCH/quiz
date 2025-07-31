import Image from "next/image";
import Quiz from "@/components/quiz"

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
     <Quiz />
    </div>
  );
}
