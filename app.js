const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // 모든 라우터에서 cors를 사용하도록 설정

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const weatherRouter = require('./routes/weather');
app.use('/weather', weatherRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

axios.get('http://localhost:8080/weather', { withCredentials: true })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => console.error(error));

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
});
