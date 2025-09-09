const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (from forms)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background: #e9ecef; 
                padding: 40px; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh;
            }
            .form-container { 
                background: #fff; 
                padding: 30px 40px; 
                border-radius: 12px; 
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
                max-width: 500px; 
                width: 100%; 
            }
            h2 { 
                text-align: center; 
                color: #333; 
                margin-bottom: 25px; 
            }
            .form-group { 
                margin-bottom: 20px; 
            }
            label { 
                display: block; 
                margin-bottom: 8px; 
                font-weight: 600; 
                color: #555; 
            }
            input[type="text"], 
            input[type="number"], 
            input[type="email"] { 
                width: 100%; 
                padding: 12px; 
                border: 1px solid #ccc; 
                border-radius: 6px; 
                box-sizing: border-box; 
                font-size: 16px;
            }
            input:focus { 
                outline: none; 
                border-color: #007bff; 
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.25); 
            }
            .gender-group { 
                display: flex; 
                gap: 20px; 
                align-items: center; 
            }
            .gender-group label { 
                display: inline-block; 
                margin-bottom: 0; 
            }
            .skills-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                padding: 10px 0;
            }
            .skills-group label {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: normal;
                margin-bottom: 0;
            }
            button { 
                width: 100%; 
                padding: 15px; 
                background: #007bff; 
                color: white; 
                border: none; 
                border-radius: 6px; 
                font-size: 18px;
                font-weight: bold;
                cursor: pointer; 
                transition: background-color 0.3s; 
            }
            button:hover { 
                background: #0056b3; 
            }
        </style>

        <div class="form-container">
            <h2>Student Registration Form</h2>
            <form action="/submit" method="POST">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Course:</label>
                    <input type="text" name="course" required>
                </div>
                <div class="form-group">
                    <label>Gender:</label>
                    <div class="gender-group">
                        <label><input type="radio" name="gender" value="Male" required> Male</label>
                        <label><input type="radio" name="gender" value="Female" required> Female</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Skills:</label>
                    <div class="skills-group">
                        <label><input type="checkbox" name="skills" value="HTML"> HTML</label>
                        <label><input type="checkbox" name="skills" value="CSS"> CSS</label>
                        <label><input type="checkbox" name="skills" value="JavaScript"> JavaScript</label>
                        <label><input type="checkbox" name="skills" value="Python"> Python</label>
                        <label><input type="checkbox" name="skills" value="Java"> Java</label>
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    `);
});


app.post('/submit', (req, res) => {
    // req.body contains the form data
    const { name, age, email, course, gender, skills } = req.body;

    // Handle skills, which can be a single string or an array
    const skillsList = Array.isArray(skills) ? skills.join(', ') : skills || 'None';

    res.send(`
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; padding: 40px; }
            .data-container { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
            h2 { color: #007bff; text-align: center; }
            p { font-size: 16px; color: #495057; line-height: 1.5; }
            p strong { color: #343a40; }
            a { display: block; text-align: center; margin-top: 25px; color: #007bff; text-decoration: none; font-weight: 600; }
            a:hover { text-decoration: underline; }
        </style>

        <div class="data-container">
            <h2>Registration Successful!</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Course:</strong> ${course}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Skills:</strong> ${skillsList}</p>
            <a href="/">Go back to form</a>
        </div>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});