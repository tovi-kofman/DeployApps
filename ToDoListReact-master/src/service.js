// // import axios from 'axios';

// // const apiUrl = "http://localhost:5178/items"

// // export default {
// //   getTasks: async () => {
// //     const result = await axios.get(`${apiUrl}/items`)    
// //     return result.data;
// //   },

// //   addTask: async(name)=>{
// //     console.log('addTask', name)
// //     //TODO
// //     return {};
// //   },

// //   setCompleted: async(id, isComplete)=>{
// //     console.log('setCompleted', {id, isComplete})
// //     //TODO
// //     return {};
// //   },

// //   deleteTask:async()=>{
// //     console.log('deleteTask')
// //   }
// // };
// import axios from 'axios';

// // הגדרת כתובת ה-API כברירת מחדל
// const apiUrl = process.env.REACT_APP_API_URL; // שימוש במשתנה סביבה
// axios.defaults.baseURL = apiUrl;

// // הוספת interceptor לתפיסת שגיאות
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API Error:', error); // רושם את השגיאה ללוג
//     return Promise.reject(error);
//   }
// );

// export default {
//   getTasks: async () => {
//     const result = await axios.get('/'); // לא צריך לחזור על הכתובת
//     return result.data;
//   },

//   addTask: async (name) => {
//     const result = await axios.post('/', { Name: name, IsComplete: false });
//     return result.data;
//   },

//   setCompleted: async (id, isComplete) => {
//     const result = await axios.put(`/${id}`, { IsComplete: isComplete });
//     return result.data;
//   },

//   deleteTask: async (id) => {
//     await axios.delete(`/${id}`);
//     return { message: 'Task deleted successfully' };
//   }
// };
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // מאפשר שימוש במשתני סביבה

// הגדרת כתובת ה-API כברירת מחדל
const apiUrl = process.env.REACT_APP_API_URL; // שימוש במשתנה סביבה
axios.defaults.baseURL = apiUrl;

// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error); // רושם את השגיאה ללוג
    return Promise.reject(error);
  }
);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware כדי לאפשר לשרת לקבל JSON
app.use(express.json());

// פונקציות ה-API
const getTasks = async () => {
  const result = await axios.get('/'); // לא צריך לחזור על הכתובת
  return result.data;
};

const addTask = async (name) => {
  const result = await axios.post('/', { Name: name, IsComplete: false });
  return result.data;
};

const setCompleted = async (id, isComplete) => {
  const result = await axios.put(`/${id}`, { IsComplete: isComplete });
  return result.data;
};

const deleteTask = async (id) => {
  await axios.delete(`/${id}`);
  return { message: 'Task deleted successfully' };
};

// Endpoints
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  const { name } = req.body;
  try {
    const newTask = await addTask(name);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { isComplete } = req.body;
  try {
    const updatedTask = await setCompleted(id, isComplete);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
