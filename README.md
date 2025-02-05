<div align="center">
  <img src="https://i.ibb.co/qLxXKVpj/Screenshot-2025-02-01-201140.png" alt="Boighor Banner" width="100%"/>

  <h1>📚 Boighor - Library Management System</h1>
  <p><em>Effortless Library Management | Smart & Intuitive</em></p>

  <a href="https://boighor-shafin.netlify.app/">
    <img src="https://img.shields.io/badge/🌍%20Live%20Demo-Boighor-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version 1.0.0"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License"/>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<div align="center">
  <h2>🎯 Purpose</h2>
  <p>📖 <strong>Boighor</strong> is a <strong>Library Management System (LMS)</strong> designed to streamline <strong>library operations</strong> in schools and institutions. It provides an efficient way to manage books, borrowing, and returning while ensuring a seamless <strong>user experience for students, teachers, and administrators</strong>.</p>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">🌟 Key Features</h2>

<table align="center">
  <tr>
    <td align="center">
      <h3>📖 Book Management</h3>
      <ul>
        <li>Add new books to the collection</li>
        <li>Categorize books by <strong>genres, authors, or categories</strong></li>
        <li>Update book details (<strong>title, author, category, availability</strong>)</li>
        <li><strong>Dark Mode</strong> for enhanced usability</li>
      </ul>
    </td>
    <td align="center">
      <h3>🔄 Borrowing & Returning</h3>
      <ul>
        <li>Track borrowed books, <strong>due dates, and return status</strong></li>
        <li>Automatic <strong>availability updates</strong> after returns</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>🔍 Search & Filter</h3>
      <ul>
        <li><strong>Search books</strong> by title, author, or category</li>
        <li><strong>Filter books</strong> based on availability and categories</li>
      </ul>
    </td>
    <td align="center">
      <h3>🔑 User Authentication & Roles</h3>
      <ul>
        <li><strong>Admin users</strong> manage books and transactions</li>
        <li><strong>Regular users</strong> can borrow books and <strong>track their history</strong></li>
      </ul>
    </td>
  </tr>
</table>

<div align="center">
  <h3>📱 Responsive Design</h3>
  <p>Works smoothly on <strong>mobile, tablet, and desktop</strong><br>Optimized for a <strong>user-friendly experience</strong></p>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">🏆 Why Choose Boighor?</h2>

<div align="center">
  <table>
    <tr>
      <td align="center">✔️ <strong>Efficient & Organized</strong> library management</td>
      <td align="center">✔️ <strong>User-friendly interface</strong> for smooth interaction</td>
    </tr>
    <tr>
      <td align="center">✔️ <strong>Secure authentication</strong> for protected transactions</td>
      <td align="center">✔️ <strong>Responsive design</strong> ensuring accessibility on all devices</td>
    </tr>
  </table>
  <p><strong>Enjoy hassle-free library management with Boighor!</strong> 🚀</p>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">🛠️ Tech Stack</h2>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">📦 Dependencies</h2>

<table align="center">
  <tr>
    <th>Frontend Dependencies</th>
    <th>Backend Dependencies</th>
  </tr>
  <tr>
    <td>
      <pre>
"react": "^18.2.0",
"tailwindcss": "^3.2.4",
"react-router-dom": "^6.4.3"
      </pre>
    </td>
    <td>
      <pre>
"express": "^4.18.2",
"mongoose": "^6.6.5",
"firebase-admin": "^11.3.0"
      </pre>
    </td>
  </tr>
</table>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">🏗️ Getting Started</h2>

<h3 align="center">🚀 Run the Project Locally</h3>

<div>
  <details>
    <summary><strong>Click to expand instructions</strong></summary>
    <ol>
      <li>
        <strong>Clone the repository</strong>
        <pre><code>git clone https://github.com/yourusername/boighor.git
cd boighor</code></pre>
      </li>
      <li>
        <strong>Install dependencies</strong>
        <pre><code># Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install</code></pre>
      </li>
      <li>
        <strong>Set up environment variables</strong>
        <p>Create a <code>.env</code> file in the <strong>server</strong> directory and add:</p>
        <pre><code>MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key</code></pre>
      </li>
      <li>
        <strong>Start the project</strong>
        <pre><code># Start the backend server
cd server
npm start

# Start the frontend development server
cd ../client
npm start</code></pre>
      </li>
    </ol>
    <p>The project should now be running at <strong>http://localhost:3000/</strong> 🚀</p>
  </details>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">📢 Contributing</h2>

<div>
  <p>🛠️ <strong>We welcome contributions!</strong> If you'd like to improve Boighor:</p>
  <ol>
    <li><strong>Fork the repository</strong></li>
    <li><strong>Create a feature branch</strong></li>
    <li><strong>Commit your changes</strong></li>
    <li><strong>Submit a pull request</strong></li>
  </ol>
  <p>Every contribution is highly appreciated! 💙</p>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">📜 License</h2>

<div align="center">
  <p>This project is licensed under the <strong>MIT License</strong>. See the <a href="./LICENSE"><code>LICENSE</code></a> file for details.</p>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<h2 align="center">🌎 Stay Connected</h2>

<div align="center">
  <a href="https://www.linkedin.com/in/tanjid-karim-shafin-835365249/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  
  <a href="mailto:tanjidshafin1234@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  
  <a href="https://boighor-shafin.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Website-Boighor-green?style=for-the-badge" alt="Boighor Live Site">
  </a>
</div>

<hr style="border: 2px solid #4CAF50; margin: 30px 0;">

<div align="center">
  <h2>💻 Start managing your library efficiently with Boighor! 🚀</h2>
  <a href="https://boighor-shafin.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Try%20Boighor%20Now!-FF6B6B?style=for-the-badge&logo=bookstack&logoColor=white" alt="Try Boighor Now!" width="250">
  </a>
</div>

