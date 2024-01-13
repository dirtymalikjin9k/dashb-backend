const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3050

app.use(async (req, res, next) => {
    try {
        console.log(req.method, req.originalUrl, req.headers);
        let response;
        if(req.method == 'POST'){
            response = await axios.post('https://www.dashb.io/'+req.originalUrl, req.body, {
                headers: {
                    'Authorization': req.headers.authorization
                }
            });
        }
        else {
            response = await axios.get('https://www.dashb.io/'+req.originalUrl, {
                headers: {
                    'Authorization': req.headers.authorization
                }
            });
        }
        // Access the response data
        res.send(response.data);
    } catch (error) {
        console.error('Error making request:', error.message);
        next(error); // Pass the error to the next middleware
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})