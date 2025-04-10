import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTask({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    }
    fetchTask();
  }, [id]);

  if (!task) {
    return <div className="p-4 text-white">Loading...</div>
  }
  return (
    <div className="min-h-screen bg-gray-500 text-white p-4">
      <Link to="/" className="text-blue-400 hover:underline">&larr; Back</Link>
      <h1 className="text-2xl font-bold mt-4">{task.text}</h1>
      <p className="mt-2 text-gray-300">{task.description || "No description."}</p>
    </div>
  );
};
export default TaskDetail;
