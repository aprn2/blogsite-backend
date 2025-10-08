# Backend for heehe blogs site

This is a Rest api backend made for **Heehe Bolgs** with `express.js`.

## 🛠️ Tech Stack and Libraries Used

This project uses the follwing libries and tools:

- express.js
- cors
- joi (for validation)
- multer (for POST accepting images)
- nodemon (for dev server)

## Docker
This project is dockerized, means to run docker and docker-compose should be installed. This can be used without docker, but the code base needs some tweaking and manually installing the correct version of mongodb.

## 🚀 Getting Started

To get this project:

```bash
git clone https://github.com/aprn2/blogsite-backend.git
```
then cd into the cloned repo directory and run following commands to start:

```bash
docker-compose up -d
```
To stop the backend server run this command:
```bash
docker-compose down
```
NOTE: The below command should be ran only once for the first time of starting the serve, and should be executed while the server is running, this is to put some fake data into the data base when initially loaded. This is optional. 
```bash
npm run restore
```
