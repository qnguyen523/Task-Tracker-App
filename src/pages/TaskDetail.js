import { useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const taskData = { id: docSnap.id, ...docSnap.data() };
        setTask(taskData);
        setDescription(taskData.description || "");
      } else {
        console.log("No such document!");
      }
    }
    fetchTask();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { 
        description: description,
        updated_at: Timestamp.now()
      });

      // Update local state
      setTask({...task, description: description});
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task description:", error);
    }
  };

  const handleCancel = () => {
    setDescription(task.description || "");
    setIsEditing(false);
  };

  if (!task) {
    return <div className="p-4 text-white">Loading...</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-500 text-white p-4">
      <Link to="/" className="text-blue-400 hover:underline">&larr; Back</Link>
      <h1 className="text-2xl font-bold mt-4">{task.text}</h1>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Description</h2>
          {!isEditing && (
            <button 
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-black rounded min-h-[150px]"
              placeholder="Enter task description..."
            />
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-gray-300 p-3 bg-gray-700 rounded">
            {task.description || "No description."}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
