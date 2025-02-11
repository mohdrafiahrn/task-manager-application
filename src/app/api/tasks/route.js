import { addTask, getTasks, updateTask, deleteTask } from "@/app/actions/taskActions";

// Handle API routes for tasks
export async function GET() {
  try {
    const tasks = await getTasks(); 
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("Error fetching tasks", { status: 500 });
  }
}

export async function POST(request) {
  const { title, description, dueDate } = await request.json();
  try {
    const response = await addTask(title, description, dueDate); 
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Error adding task", { status: 500 });
  }
}

export async function PUT(request) {
  const { taskId, completed } = await request.json();
  try {
    const response = await updateTask(taskId, completed); 
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Error updating task", { status: 500 });
  }
}

export async function DELETE(request) {
  const { taskId } = await request.json();
  try {
    const response = await deleteTask(taskId); 
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Error deleting task", { status: 500 });
  }
}
