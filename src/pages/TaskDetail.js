import { useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const taskData = { id: docSnap.id, ...docSnap.data() };
        setTask(taskData);
        setDescription(taskData.description || "");
        setTitle(taskData.text || "");
      } else {
        console.log("No such document!");
      }
    }
    fetchTask();
  }, [id]);

  const handleEdit = () => {
    setEditingDescription(true);
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
      setEditingDescription(false);
    } catch (error) {
      console.error("Error updating task description:", error);
    }
  };

  const handleCancel = () => {
    setDescription(task.description || "");
    setEditingDescription(false);
  };

  const handleTitleEdit = () => {
    setEditingTitle(true);
  };

  const handleTitleSave = async () => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { 
        text: title,
        updated_at: Timestamp.now()
      });
      
      // Update local state
      setTask({...task, text: title});
      setEditingTitle(false);
    } catch (error) {
      console.error("Error updating task title:", error);
    }
  };

  const handleTitleCancel = () => {
    setTitle(task.text || "");
    setEditingTitle(false);
  };

  if (!task) {
    return <div className="p-4 text-white">Loading...</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-500 text-white p-4">
      <Link to="/" className="text-blue-400 hover:underline">&larr; Back</Link>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Title</h2>
          {!editingTitle && (
            <button
              onClick={handleTitleEdit}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
        </div>

        {editingTitle ? (
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-black rounded"
              placeholder="Enter task title..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleTitleSave}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={handleTitleCancel}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl font-bold p-3 bg-gray-700 rounded">{task.text}</h1>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Description</h2>
          {!editingDescription && (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
        </div>
        
        {editingDescription ? (
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
