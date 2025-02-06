// import axios from 'axios';

// const apiUrl = "http://localhost:5178/items"

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}/items`)    
//     return result.data;
//   },

//   addTask: async(name)=>{
//     console.log('addTask', name)
//     //TODO
//     return {};
//   },

//   setCompleted: async(id, isComplete)=>{
//     console.log('setCompleted', {id, isComplete})
//     //TODO
//     return {};
//   },

//   deleteTask:async()=>{
//     console.log('deleteTask')
//   }
// };
import axios from 'axios';

// הגדרת כתובת ה-API כברירת מחדל
const apiUrl = "http://localhost:5178/items";
axios.defaults.baseURL = apiUrl;

// הוספת interceptor לתפיסת שגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error); // רושם את השגיאה ללוג
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/'); // לא צריך לחזור על הכתובת
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post('/', { Name: name, IsComplete: false });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/${id}`, { IsComplete: isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`/${id}`);
    return { message: 'Task deleted successfully' };
  }
};
