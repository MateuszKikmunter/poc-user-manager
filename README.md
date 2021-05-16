## poc-user-manager
POC of a simple REST service to manage users.

## How to run the project

<ul>
  <li>run <code>npm install</code> in the root folder of the project</li>
  <li>then execute <code> npm run start:dev or npm start</code></li> 
</ul>

## Available endpoints

<ul>
  <li>
    <p>
      <b>GET</b> get a list of all users http://localhost:4000/api/users/get-all
    </p>
  </li>
  <li>
    <p>
      <b>GET</b> get a single user http://localhost:4000/api/users/:id <b>(uuid)</b>
    </p>
  </li>
  <li>
    <b>POST</b> create user http://localhost:4000/api/users/create
    <p>example payload</p>
  
```javascript
{    
  "name": "Darth Vader",
  "email": "darth.vader@star-wars.com",
  "password": "LukeImY0urF@ther"
}
```
  </li>
  <li>
    <b>PUT</b> update user http://localhost:4000/api/users/:id <b>(uuid)</b>
    <p>example payload</p>
  
```javascript
{    
  "name": "Darth Vader",
  "email": "darth.vader@star-wars.com",
  "password": "LukeImY0urF@ther"
}
```
  </li>
  <li>
    <p>
      <b>DELETE</b> delete user http://localhost:4000/api/users/:id <b>(uuid)</b>
  </p>
  </li>
  <li>
    <b>POST</b> login user http://localhost:4000/api/auth/login
    <p>example payload</p>
  
```javascript
{  
  "email": "darth.vader@star-wars.com",
  "password": "LukeImY0urF@ther"
}
```
  </li>
</ul>

## Tech stack                
<ul>
  <li>
    <a href="https://nodejs.org/en/">
      NodeJS
    </a>
  </li>
  <li>
    <a href="https://expressjs.com/">
      ExpressJS
    </a>
  </li>
  <li>
    <a href="https://github.com/typeorm/typeorm">
      TypeORM
    </a>
  </li>
  <li>
    <a href="https://www.sqlite.org/index.html">
      SQLite
    </a>
  </li>
</ul>
