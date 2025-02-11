Task Management App
________________________

A simple Task Management Application built using Next.js, Server Actions, and MongoDB.
This project allows users to create, edit, delete, and mark tasks as complete or incomplete.

Features of this app
________________________

✔️ **Add New Tasks** – Title, Description, and Due Date.  
✔️ **View All Tasks** – Fetch tasks from the database.  
✔️ **Edit Tasks** – Update task details.  
✔️ **Delete Tasks** – Remove tasks from the database.  
✔️ **Mark as Complete/Incomplete** – Toggle task status.  
✔️ **Sort & Search** – Search tasks and sort by due date.  
✔️ **Dark Mode Support** – Light/Dark theme switching. 

## 🚀 **Live Demo**  
👉 **[Live App on Vercel](https://your-vercel-app-url.com)**  
_(Replace the above URL with your actual Vercel deployment link.)_  


Tech Stack
----------------------
- **Frontend:** Next.js (App Router) + Material UI  
- **Backend:** Next.js Server Actions  
- **Database:** MongoDB (Compass)  
- **Deployment:** https://task-manager-application-lime.vercel.app/  
- **Code Repository:** Available on GitHub  

Installation & Setup
---------------------

step 1 --> git clone https://github.com/your-github-username/task-manager.git

step 2 --> cd task-manager

step 3 --> npm install

step 4 --> MONGODB_URI=mongodb://localhost:27017/task_manager

step 5 --> npm run dev


Folder Structure 
----------------------
task-manager/
│── src/
│   ├── app/
│   │   ├── actions/    -->    # Server Actions (CRUD operations)
│   │   ├── components/ -->    # Reusable UI components (TaskTable, AddNewTask)
│   │   ├── lib/        -->    # Database connection
│   │   ├── models/     -->    # MongoDB Models
│   │   ├── page.js     -->    # Main page
│   │   ├── layout.js   -->    # Global layout
│── .gitignore
│── package.json
│── README.md
│── next.config.js
│── .env (ignored)


API Endpoints (Server Actions)
___________________________________
_____________________________________________________________
| Method  |	  Endpoint	            |  Description          |
|------------------------------------------------------------                    
| POST	  |    /api/addTask	        |  Add a new task       |             
| GET	  |    /api/getTasks	    |  Fetch all tasks      |               
| PUT	  |    /api/updateTask/:id	|  Update a task status |        
| DELETE  |   /api/deleteTask/:id	|  Delete a task        |          
|         |                         |                       |
-------------------------------------------------------------

 Improvements & Future Scop
-------------------------------
Upcoming Features:

# User Authentication (Login/Signup)
# Task Categories (e.g., Work, Personal, etc.)
# Drag & Drop for Task Reordering
# Email Notifications & Reminders
# Task Assignment for Team Members

Contact
-------------
For any queries, feel free to reach out:
----------------------------------------

📧 Email: mohd.rafiahrn@gmail.com
🔗 GitHub: Your GitHub Profile

📧 Email: mohd.rafi209993@gmail.com
🔗 GitHub: Your GitHub Profile
