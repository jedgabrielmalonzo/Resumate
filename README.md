# ResuMate 📄🤖

ResuMate is a mobile application built with **React Native** that helps users create professional resumes and prepare for job interviews using **AI-generated questions**. The app provides an all-in-one solution for resume building, interview preparation, and resume exporting.

---

## 🚀 Features

### 🔐 Authentication
- Login & Signup using **Firebase Authentication**
- Secure user session handling

### 🧾 Resume Builder
- Input personal information, education, experience, and skills
- Clean and professional resume layout
- Real-time resume preview

### 🤖 AI Interview Preparation
- Generate mock interview questions based on:
  - Job Title
  - Company Name
  - Job Description
- Powered by **OpenAI / Gemini AI**

### 📄 Resume Export
- Download resume as **PDF**
- Ready for printing or sharing

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **Firebase Authentication**
- **Firebase Firestore** (optional for cloud storage)
- **OpenAI API / Gemini API**
- **Expo Print & Sharing**
- **React Navigation**

---

## 📁 Project Structure

resumate/
├── App.js
├── firebase.js
├── src/
│ ├── navigation/
│ ├── screens/
│ │ ├── auth/
│ │ ├── home/
│ │ ├── resume/
│ │ └── interview/
│ ├── components/
│ ├── context/
│ ├── services/
│ ├── utils/
│ └── constants/
├── assets/
└── .env


---

## ⚙️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/USERNAME/resumate.git


Install dependencies

npm install


Create .env file

OPENAI_API_KEY=your_api_key_here


Start the app

npx expo start

🔑 Firebase Setup

Enable Email & Password Authentication

Create a Firebase project

Add your Firebase config in firebase.js

📌 Use Case

This application is ideal for:

Students

Fresh graduates

Job seekers

Portfolio & academic projects

🎯 Project Status

🚧 Currently under development
Planned improvements:

Multiple resume templates

Resume cloud backup

AI answer evaluation

Dark mode

👨‍💻 Developers

ResuMate Team
Built as a school / portfolio project using modern mobile development technologies.
