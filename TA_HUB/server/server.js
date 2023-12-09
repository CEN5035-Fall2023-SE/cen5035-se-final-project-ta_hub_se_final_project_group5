const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mysql=require('mysql');
const cors = require("cors");
const PORT = 3005;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"crud"
})
app.get('/get-performance', (req, res) => {
  const { name } = req.query;
  console.log('Fetching performance data for:', name);

  const sql_getPerformance = 'SELECT * FROM taperformance WHERE Name = ?';

  db.query(sql_getPerformance, [name], (err, results) => {
    if (err) {
      console.error('Error fetching performance data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Performance data:', results);
      if (results.length > 0) {
        const performanceData = results[0];
        res.status(200).json(performanceData);
      } else {
        res.status(404).json({});
      }
    }
  });
});


app.post('/update-applicant-status', (req, res) => {
  const { email, status } = req.body;

  const sql_update = 'UPDATE applicationData SET applicationStatus = ? WHERE email = ?';
  db.query(sql_update, [status, email], (err, result) => {
    if (err) {
      console.error('Error updating applicant status:', err);
      res.status(500).json({ success: false });
    } else {
      if (result.affectedRows > 0) {
        console.log('Applicant status updated successfully');
        res.status(200).json({ success: true });
      } else {
        console.log('No rows affected. Email not found.');
        res.status(404).json({ success: false });
      }
    }
  });
});

app.get('/get-name', (req, res) => {
  const query = 'SELECT name FROM applicationData where applicationStatus="accepted"'; // Assuming "courses" is your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching course data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const courseNames = results.map((result) => result.name);
      res.json(courseNames);
    }
  });
});


app.post('/submit-performance', (req, res) => {
  const sql_register4 = 'INSERT INTO taperformance (Name,TeachingEffectiveness,  StudentInteractionAndSupport,  GradingAndAssessment ,  PreparationAndOrganization ,  ProfessionalismAndCollaboration , Adaptability , KnowledgeAndExpertise ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql_register4, [req.body.name, req.body.teachingEffectiveness,req.body.studentInteraction,req.body.gradingAndAssessment,req.body.preparationAndOrganization,req.body.professionalismAndCollaboration,req.body.adaptability,req.body.knowledgeAndExpertise], (err, data) => {

    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data inserted into MySQL');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});
app.get('/get-task', (req, res) => {
  const getTaskSql = 'SELECT task FROM applicationData WHERE email = ?';

  db.query(getTaskSql, [req.query.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length > 0) {
      const task = data[0].task;
      return res.json({ task });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});


app.post('/update-task', (req, res) => {
  const { email, task } = req.body;

  const sql_update3= 'UPDATE applicationData SET task = ? WHERE email = ?';
  db.query(sql_update3, [task, email], (err, result) => {
    if (err) {
      console.error('Error updating applicant status:', err);
      res.status(500).json({ success: false });
    } else {
      if (result.affectedRows > 0) {
        console.log('Applicant status updated successfully');
        res.status(200).json({ success: true });
      } else {
        console.log('No rows affected. Email not found.');
        res.status(404).json({ success: false });
      }
    }
  });
});

app.post('/update-administrator-notify', (req, res) => {
  const { email } = req.body;

  const sqlUpdate = 'UPDATE applicationData SET administratorNotify = 1 WHERE email = ?';

  db.query(sqlUpdate, [email], (err, result) => {
    if (err) {
      console.error('Error updating administratorNotify value:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, error: 'Email not found' });
      }
    }
  });
});

app.get('/ta-applicants', (req, res) => {
  const sql_ta= 'SELECT name, email, previousTA, previousTADetails, courses, resume,applicationStatus,administratorNotify,task  FROM applicationData';

  db.query(sql_ta, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Parse the JSON strings in the courses column
      results.forEach(result => {
        result.courses = JSON.parse(result.courses);
      });

      res.status(200).json(results);
    }
  });
});
app.get('/ta-applicants2', (req, res) => {
  const sql_ta= 'SELECT name, email, previousTA, previousTADetails, courses, resume,applicationStatus,administratorNotify,task  FROM applicationData';

  db.query(sql_ta, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Parse the JSON strings in the courses column
      results.forEach(result => {
        result.courses = JSON.parse(result.courses);
      });

      res.status(200).json(results);
    }
  });
});
app.get('/check-application-status', (req, res) => {
  const email = req.query.email; 

  const sql_check= 'SELECT applicationStatus FROM applicationData WHERE email = ?';
  db.query(sql_check, [email], (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const applicationStatus = results[0].applicationStatus;
        res.status(200).json({ applicationStatus });
      } else {
        res.status(404).json({ error: 'Email not found' });
      }
    }
  });
});
app.get('/check-application-status2', (req, res) => {
  const email = req.query.email;

  const sql_check =
    'SELECT applicationStatus, administratorNotify FROM applicationData WHERE email = ?';

  db.query(sql_check, [email], (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const { applicationStatus, administratorNotify } = results[0];
        res.status(200).json({ applicationStatus, administratorNotify });
      } else {
        res.status(404).json({ error: 'Email not found' });
      }
    }
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT name FROM login WHERE email = ? AND password = ? AND usertype = ? AND id = ?";

  db.query(sql, [req.body.email, req.body.password, req.body.usertype,req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const name = data[0].name;
      return res.json({ message: 'Login success', name });
    } else {
      return res.json('No record');
    }
  });
});
app.post('/drop-course', (req, res) => {
  const { courseCode } = req.body;
  const query = `DELETE FROM courses WHERE courseCode = ?`;

  db.query(query, [courseCode], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Error dropping course' });
      return;
    }

    console.log(`Dropping course with code: ${courseCode}`);
    res.status(200).json({ message: 'Course dropped successfully!' });
  });
});

// Endpoint for submitting form data
app.post('/submit-form', async (req, res) => {
  const { email, password, name, usertype, id } = req.body;

  const sql_register = 'INSERT INTO login (email, password, name, usertype, id) VALUES (?, ?, ?, ?, ?)';

  try {
    // Insert data into MySQL
    db.query(sql_register, [email, password, name, usertype, id], (err, data) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        console.log('Data inserted into MySQL');
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Failed to submit form data', error: error.message });
  }
});




app.post('/create-course', (req, res) => {
  const { courseCode, Professor, classMode, courseName, prerequisites  } = req.body;

  const sql_create = 'INSERT INTO courses (courseCode, Professor, classMode, courseName, prerequisites) VALUES (?, ?, ?, ?, ?)';

  db.query(sql_create, [courseCode, Professor, classMode, courseName, prerequisites], (err, data) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Course inserted into MySQL');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});
app.get('/courses', (req, res) => {
  const query = 'SELECT courseName FROM courses'; // Assuming "courses" is your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching course data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const courseNames = results.map((result) => result.courseName);
      res.json(courseNames);
    }
  });
});
app.post('/submit-application', (req, res) => {
  const { name, email, previousTA, previousTADetails, courses, resume } = req.body;

  // Insert data into the applicationData table
  const sql_create = 'INSERT INTO applicationData (name, email, previousTA, previousTADetails, courses, resume) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql_create, [name, email, previousTA, previousTADetails, JSON.stringify(courses), JSON.stringify(resume)], (err, data) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data inserted into MySQL');
    }
  });
});




app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});