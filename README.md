
# **Chat App**

This project is a modern chat application built with [Next.js](https://nextjs.org/), [Clerk](https://clerk.dev/), and [Convex](https://convex.dev/). It offers real-time messaging, user authentication, and seamless cross-platform functionality.

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Clerk Integration](#clerk-integration)
5. [Convex Integration](#convex-integration)
6. [Run The project](#running-the-project)

## **Features**

- **Real-time Messaging**: Instant messaging with real-time updates across all clients.
- **User Authentication**: Secure user sign-up, sign-in, and profile management using Clerk.
- **Cross-Platform**: Works seamlessly on both web (Next.js) and mobile (React Native).
- **Scalable Backend**: Powered by Convex for real-time data management and serverless backend functions.

## **Tech Stack**

- **Frontend**: Next.js, React Native, NativeWind
- **Backend**: Convex
- **Authentication**: Clerk
- **Database**: Convex (schema-less, real-time)

## **Getting Started**

### **Prerequisites**

- Node.js (>=14.x)
- Yarn or npm
- A Clerk account
- A Convex account

### **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/NithishKanth/chat-app
    cd chat-app
    ```

2. **Install dependencies**:

    ```bash
    # Install for both frontend and mobile
    npm install
     or
    yarm install
    ```

3. **Set up environment variables**:

    Create a `.env.local` file in the root directory and add the following:

    ```plaintext
    CONVEX_DEPLOYMENT=<project>
    
    NEXT_PUBLIC_CONVEX_URL=<Convex URL>
    
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Clerk Publishable>
    CLERK_SECRET_KEY=<Clerk scret key>
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    ```

4. **Run the project**:

    - **Front End**:
        ```bash
       npm run dev
        ```
    - **Back End (convex)**:
        ```bash
       npx convex dev
        ```


## **Clerk Integration**

**Clerk** is utilized for managing user authentication and profiles within the chat app. It offers various sign-up and sign-in methods, including social logins, email/password, and magic links. This simplifies the process of adding secure and scalable authentication to your application.

- **Setup**:
  - Add your Clerk frontend API key to the `.env.local` file.
  - Use Clerk's pre-built components or their SDK to manage authentication flows.

For more information, refer to the [Clerk Documentation](https://clerk.dev/docs).

## **Convex Integration**

**Convex** handles the backend logic and data management for the chat app. It enables real-time data synchronization and serverless function execution, allowing for seamless communication and instant updates between clients.

- **Setup**:
  - Add your Convex project ID to the `.env.local` file.
  - Write serverless functions in the `convex/` directory, which are automatically exposed as API endpoints.

For more details, visit the [Convex Documentation](https://docs.convex.dev).

## **Running the Project**

To run the project in development mode:

- **Web**: Run `npm run dev` and visit `http://localhost:3000`.


<h2>Images</h2>

![Screenshot 2024-09-04 181233](https://github.com/user-attachments/assets/f779bf39-752c-47cc-9fe8-0e731c199446)
![Screenshot 2024-09-04 181334](https://github.com/user-attachments/assets/976afc3f-fbe5-4590-9379-fc55761bf2d2)
![Screenshot 2024-09-04 181428](https://github.com/user-attachments/assets/d13516ee-8991-4353-9a65-b4d99cc4bfac)

