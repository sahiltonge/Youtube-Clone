#  YouTube Clone Application

A full-stack **YouTube Clone Application** built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.  
This app allows users to **upload videos**, **view videos**, **like/dislike videos**, **comment**, replicating core YouTube features.

---
#  YouTube Clone – Live Application

---

## Live Links


- **Live Url (Render)**:**[[https://utube-sahil.onrender.com](https://utube-sahil.onrender.com)]**


 **GitHub Link**

- https://github.com/sahiltonge/Youtube-Clone.git


##  Features

- **User Authentication** (Sign Up / Login) with **JWT (JSON Web Token)**  
- **Video Upload** with title, description, and thumbnail  
- **Video Details Update** Edit and Delete feature in profile or my channel
- **Like / Dislike** system for videos  
- **Comment System** with real-time updates  
- **Profile Page** to manage uploaded videos  
- **Responsive UI** for desktop   
- **CORS-enabled backend** for secure API communication  

---

## 🛠 Tech Stack

### **Frontend**
- React.js (with React Router)
- Axios (for API requests)
- Material UI (MUI) & Custom CSS
- Toastify (for notifications)

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt.js (for password hashing)
- JSON Web Token (JWT) for authentication
- Cookie-parser (for authentication cookies)

---

##  Folder Structure

```

YouTube-App/
│
├── backend/                 # Backend source code
│   ├── Controllers/         # Route handlers
│   ├── Modals/              # Mongoose schemas
│   ├── Routes/              # API routes
│   ├── middleware/          # Authenticaion
│   └── index.js             # Main server file
│
├── frontend/                # Frontend React code
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/           # Pages like Home, Video, Profile
│   │   ├── App.js           # Root component
│   │   └── index.js         # Entry point
│   └── public/              # Static assets
│
└── README.md

---
```
##  Installation for Localhost running

### 1. Install dependencies
```
#### Backend:

cd backend
npm install

####  Frontend:

cd ../frontend
npm install


```

### 2 Run the application

#### Start Backend:

```bash
cd backend
npm start
```

#### Start Frontend:

```bash
cd frontend
npm run dev
```

---

##  API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | /auth/signup         | Register a new user      |
| POST   | /auth/login          | Login user               |
| POST   | /videos              | Upload video             |
| GET    | /videos              | Get all videos           |
| GET    | /videos/:id          | Get video by ID          |
| GET    | /videos/getAllVideo  | Get all video            |
| PUT    | /videos/like/:id     | Like video               |
| PUT    | /videos/dislike/:id  | Dislike video            |
| POST   | /comments/:videoId   | Add comment to a video   |
| GET    | /comments/:videoId   | Get comments for a video |

---




---

##  Author

**Sahil Tonge**
 Email: [sahiltonge85@gmail.com]
 Nagpur, Maharashtra

```
**GitHub Link**
