# ShiftSL Dashboard

**ShiftSL** is a Roster Management and Effective Leave Management Software. This repository contains the **ShiftSL Dashboard**, a web application designed for **Ward Administrators** and **HR Personnel** to streamline shift scheduling, leave approvals, and employee management in medical or organizational settings.

## 🔗 Live Demo / GitHub Repo

> 🔗 [ShiftSL GitHub Repository](https://github.com/ShiftSL/shiftsl-dashboard)

---

## 🚀 Features

### 🔐 Authentication
- Role-based login for **HR** and **Ward Admins**

### 👩‍⚕️ HR Functionalities
- Add new employees/doctors
- View monthly employee analytics and shift statistics

### 🧑‍⚕️ Ward Admin Functionalities
- **Roster Tab**:
  - Create rosters
  - Add shifts
  - Assign doctors to shifts
- **Approval Tab**:
  - Approve or reject **leave requests**
  - Approve or reject **shift exchange requests**
- **Employees Tab**:
  - View list of all employees/doctors in the ward

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **UI Library**: [MUI (Material UI)](https://mui.com/)
- **Calendar Library**: [ScheduleX](https://getskedulex.com/)
- **State Management & Hooks**: React Hooks

---

## 📁 Project Structure

```bash
src/
├── assests/          # Images and media assets
├── Components/       # Reusable React components
├── context/          # React context for global state management
├── CSS/              # Custom styling files
├── firebase/         # Firebase configuration and utilities
├── Hooks/            # Custom React hooks
├── Interfaces/       # TypeScript interfaces and models
├── jsonfiles/        # Static JSON files
├── Pages/            # Page components (Roster, Approvals, Employees, etc.)
├── service/          # API service logic and integrations
└── types/            # Global TypeScript types

```



# Deployment

To deploy this project run

## Clone the repository
git clone https://github.com/ShiftSL/shiftsl-dashboard.git

## Navigate to the project folder
cd shiftsl-dashboard

## Install dependencies
npm install

## Run project
npm run dev

## 📸 Screenshots

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/d576e9fa-f6a6-4a5a-8a25-bd25a7bff43f" alt="Month View Roster" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/5a16d810-f6b4-456d-b91e-9ceb2c0ee50b" alt="Approval" width="500"/>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/1a6c87dc-621b-4bbe-a20f-b8ae9a81cf4e" alt="Week View Roster" width="500"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/6e0cd140-a13d-4cbc-9c86-4cf8c4109b82" alt="Employee List" width="500"/>
    </td>
  </tr>
  <tr>
   <td>
  <img src="https://github.com/user-attachments/assets/b7881e20-a999-4b37-b02d-8e59cb1f102b" alt="Create Shift" width="500"/>
</td>
<td>
  <img src="https://github.com/user-attachments/assets/cdc57269-1093-4148-9796-af93791f9f97" alt="Delete Shift" width="500"/>
</td>

  </tr>
</table>

