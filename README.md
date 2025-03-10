# Project Overview

This project serves as the frontend for [Pet Registration Backend](https://github.com/ovojhking/pet-registration-backend)

It will be executed on **localhost:4000** after starting.

## Purpose

The main goal is to simulate a pet registration system for a pet website.

## Pet Registration Form Rules

- The form must allow users to enter the pet's **name, category, breed, age, and gender**.
- If the **category** is "dog," the system must determine whether the pet is **dangerous**.
  - A pet is considered dangerous if its **breed** is either **Pitbull** or **Mastiff**.
- If the user selects **"mix"** as the breed, they must be able to enter a custom name for the mixed breed.
- If the **date of birth** is unknown, the user must be able to enter an **estimated age** instead.

## Prerequisistes

- Start the backend project to use API
- Docker

## How To Run Me

Follow the steps below to set up and run the frontend project.

### Step 1: Navigate to the `docker` Directory

Open a terminal and run the following command to navigate to the `docker` directory and Start the Docker Containers

```bash=
    cd docker
    docker-compose up --build -d
    docker exec -it pet_frontend_dev sh
```

### Step 2: Enter the Docker container and run the project

```bash=
  npm install
  npm run dev -- --host --port 3000
```

It will be executed on **localhost:4000** after starting.

## Technical Features

- Developed using Vue 3 + Vite  
- Pinia replaces Vuex for state management  
- Tailwind + PrimeUI for style management  
- PrimeUI for dark mode switching  
- Vue-i18n for multilingual support  
- Vue-router for routing  

Supports:
- Responsive Web Design (RWD)
- Language switching between French and English
- Day/Night mode switching