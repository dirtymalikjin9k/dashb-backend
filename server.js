const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(async (req, res, next) => {
    try {
        console.log(req.method, req.originalUrl, req.headers.authorization, req.body);
        let response;
        if (req.method === 'POST') {
            response = await axios.post('https://www.dashb.io/' + req.originalUrl, req.body, {
                headers: {
                    'Authorization': req.headers.authorization
                }
            });
        } else {
            response = await axios.get('https://www.dashb.io/' + req.originalUrl, {
                headers: {
                    'Authorization': req.headers.authorization
                }
            });
        }  
        console.log("response = ", response.data);      
        // Access the response data
        res.send(response.data);
    } catch (error) {
        console.error('Error making request:', error.message);
        next(error); // Pass the error to the next middleware
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
