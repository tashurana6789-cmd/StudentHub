# StudentHub – Student Management System

A clean, modern, and beginner-friendly Single Page Application (SPA) built with **React.js**, **React Router DOM**, **Axios**, and **JSON Server**, styled with responsive custom **Vanilla CSS**.

---

## 1. Project Description

**StudentHub** is an educational student management dashboard designed for tracking, managing, and organizing student records in real time. The project demonstrates core and intermediate React concepts—such as state management with hooks, controlled form handling, client-side validation, full RESTful CRUD operations via Axios, dynamic URL parameter routing, and client-side search, filtering, and sorting.

---

## 2. Features

- 📊 **Dashboard Overview**: Dynamic live metrics calculating total enrolled students, active students, unique courses, and cities directly from backend data.
- 👥 **Student Directory**:
  - **Live Search**: Instant multi-attribute search across Student Name, Email, Course, and City.
  - **Course & Status Filters**: Dynamic dropdown filters by Course and Academic Status (Active, Inactive, Graduated, Suspended).
  - **Multi-criteria Sorting**: Sort by Name (A–Z / Z–A), Age (Youngest / Oldest), and Enrollment Date (Newest / Oldest).
  - **View Toggle**: Switch effortlessly between **Grid View** (cards with avatar initials) and **Table View** (structured tabular layout).
  - **Delete Modal**: Safe deletion with an interactive confirmation dialog and instant toast notification feedback.
- ➕ **Add Student**: Controlled form with comprehensive client-side validation (Name, Email format, Phone, Age range 15–90, Course selection, Enrollment Date) and direct Axios `POST` submission.
- 👁️ **Student Profile Details**: Dynamic route `/students/:id` fetching single student data via `useParams()`, displaying complete academic, personal, and contact records.
- ✏️ **Edit Student**: Pre-populated form on `/students/edit/:id` allowing seamless updates via Axios `PUT` requests.
- ⏳ **Loading & Error States**: Dedicated `Loader` spinners and `ErrorMessage` banners with a "Try Again" retry mechanism.
- 📱 **Fully Responsive UI**: Clean mobile-first design with a responsive navigation drawer, CSS grid, and flex layouts supporting mobile, tablet, laptop, and desktop viewports.

---

## 3. Technologies Used

- **Frontend Framework**: [React.js](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vite.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Mock Backend**: [JSON Server](https://github.com/typicode/json-server)
- **Process Management**: [Concurrently](https://github.com/open-cli-tools/concurrently)
- **Styling**: Pure **Vanilla CSS** with modern CSS Variables / Design Tokens

---

## 4. Installation Steps

Follow these simple steps to install and set up StudentHub on your local machine:

### Step 1: Open your terminal and navigate to the project directory
```bash
cd StudentHub
```

### Step 2: Install project dependencies
Run the following command to download all required packages:
```bash
npm install
```

---

## 5. How to Run

You can run both the frontend and the mock backend server with a single command or run them in separate terminals.

### Option A: Run Both Together (Recommended)
```bash
npm run start:all
```
This runs the Vite React dev server and the JSON Server concurrently.

---

### Option B: Run in Separate Terminals

**Terminal 1 — Start the JSON Server (Backend API):**
```bash
npm run server
```
*Runs the mock REST API at `http://localhost:3000`.*

**Terminal 2 — Start the React Vite Development Server (Frontend):**
```bash
npm run dev
```
*Opens your React app (typically at `http://localhost:5173`).*

---

## 6. JSON Server Setup

JSON Server provides a complete mock REST API backed by a local `db.json` file.

- **Port**: `3000`
- **Data File**: `db.json` (contains pre-populated realistic student records)
- **Starting Command**:
  ```bash
  npx json-server db.json --port 3000
  ```
  *(or simply `npm run server`)*

Whenever you add, edit, or delete a student in the UI, `db.json` is updated in real time.

---

## 7. API Information

The Axios service module in `src/services/studentApi.js` communicates with the following REST endpoints:

| Action | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Get All Students** | `GET` | `http://localhost:3000/students` | Returns array of all student records |
| **Get Student By ID** | `GET` | `http://localhost:3000/students/:id` | Returns single student record by ID |
| **Add New Student** | `POST` | `http://localhost:3000/students` | Inserts a new student record |
| **Update Student** | `PUT` | `http://localhost:3000/students/:id` | Updates an existing student record |
| **Delete Student** | `DELETE` | `http://localhost:3000/students/:id` | Permanently deletes student record |

### Student Record Data Model Example:
```json
{
  "id": "1",
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91 98765 43210",
  "age": 21,
  "gender": "Male",
  "course": "Computer Science",
  "city": "Mumbai",
  "address": "402 Palm Grove, Bandra West",
  "enrollmentDate": "2023-08-15",
  "status": "Active"
}
```

---

## 8. Folder Structure

```text
StudentHub/
├── db.json                      # Mock database with realistic student data
├── index.html                   # HTML template entry point
├── package.json                 # Project dependencies & scripts
├── README.md                    # Project documentation
├── vite.config.js               # Vite configuration
│
└── src/
    ├── main.jsx                 # React root render entry point
    ├── App.jsx                  # Main application component & route configuration
    ├── App.css                  # Minimal component stylesheet
    ├── index.css                # Global design tokens, layout & responsive styles
    │
    ├── components/              # Reusable presentational components
    │   ├── Navbar.jsx           # Top navigation bar with NavLinks & mobile toggle
    │   ├── Footer.jsx           # Bottom footer with branding & quick links
    │   ├── StudentCard.jsx      # Card component for Directory Grid View
    │   ├── StudentTable.jsx     # Tabular component for Directory Table View
    │   ├── Loader.jsx           # Animated loading spinner component
    │   └── ErrorMessage.jsx     # Error display banner with retry button
    │
    ├── pages/                   # Page-level route views
    │   ├── Home.jsx             # Dashboard with live metrics & quick shortcuts
    │   ├── Students.jsx         # Student directory with search, filter, sort & CRUD
    │   ├── AddStudent.jsx       # Controlled form to register new students
    │   ├── StudentDetails.jsx   # Detailed student profile view
    │   ├── EditStudent.jsx      # Pre-populated form to update existing student
    │   └── NotFound.jsx         # 404 fallback page
    │
    └── services/
        └── studentApi.js        # Axios API service methods for JSON Server
```

---

## 9. Available Routes

| Route Path | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Dashboard with key metric stats and featured students |
| `/students` | `Students.jsx` | Student directory with search, filter, sort, and view modes |
| `/students/add` | `AddStudent.jsx` | Register a new student with validation |
| `/students/:id` | `StudentDetails.jsx` | Individual student profile information |
| `/students/edit/:id` | `EditStudent.jsx` | Edit existing student information |
| `*` | `NotFound.jsx` | 404 Not Found error page |

---

## 10. Screenshots Section

*(Placeholders for application screenshots)*

### Dashboard (`/`)
```
+-----------------------------------------------------------------------+
|  🎓 StudentHub              [ Home ]  [ Students ]  [ + Add Student ]  |
|-----------------------------------------------------------------------|
|  🚀 Welcome to StudentHub                                             |
|  Manage Students with Speed & Clarity                                 |
|                                                                       |
|  [ 16 Total ]     [ 14 Active ]     [ 8 Courses ]     [ 8 Cities ]    |
|                                                                       |
|  ⚡ Quick Actions       |  👤 Featured Students                       |
|  - Search & Filter     |  - Aarav Sharma (Computer Science)          |
|  - Enroll Student      |  - Diya Patel (Information Technology)      |
+-----------------------------------------------------------------------+
```

### Student Directory (`/students`)
```
+-----------------------------------------------------------------------+
|  👥 Student Directory                                [+ Add Student]  |
|  [ 🔍 Search name, email... ] [ All Courses ▾ ] [ All Statuses ▾ ]   |
|  Showing 16 of 16 students                          [⊞ Grid] [☰ Table]|
|                                                                       |
|  +--------------------+  +--------------------+  +--------------------+|
|  | (AS)  [ Active ]   |  | (DP)  [ Active ]   |  | (RV)  [ Active ]   ||
|  | Aarav Sharma       |  | Diya Patel         |  | Rohan Verma        ||
|  | 📚 Computer Science|  | 📚 Info Technology |  | 📚 Mechanical Eng  ||
|  | ✉️ aarav@ex.com    |  | ✉️ diya@ex.com     |  | ✉️ rohan@ex.com    ||
|  | [View] [Edit] [Del]|  | [View] [Edit] [Del]|  | [View] [Edit] [Del]||
|  +--------------------+  +--------------------+  +--------------------+|
+-----------------------------------------------------------------------+
```

### Add / Edit Student Form (`/students/add`)
```
+-----------------------------------------------------------------------+
|  Home / Students / Add Student                                        |
|  ➕ Register New Student                                              |
|                                                                       |
|  Full Name *           Email Address *                                |
|  [__________________]  [__________________]                           |
|                                                                       |
|  Phone Number *        Age *        Gender *                          |
|  [__________________]  [___]        [ Male          ▾ ]               |
|                                                                       |
|  Course *              City *       Status *                          |
|  [ Computer Science ▾] [__________] [ Active        ▾ ]               |
|                                                                       |
|  [ Cancel ]                                   [ 💾 Save Student ]     |
+-----------------------------------------------------------------------+
```

---

## 11. Future Improvements

Here are suggested features to practice as your React skills continue to grow:

1. 📄 **Pagination**: Split large student collections into pages (e.g. 8 students per page).
2. 🌗 **Dark Mode Toggle**: Add a theme switcher using CSS custom properties and `localStorage`.
3. 📥 **Export to CSV / PDF**: Allow administrators to export the student directory to Excel/CSV or print student identity cards.
4. 🔐 **Authentication**: Add a mock login screen with protected routes.
5. 🖼️ **Avatar Upload**: Support image upload or gravatar profile pictures for each student.
