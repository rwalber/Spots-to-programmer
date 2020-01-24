const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');


const app = express();
mongoose.connect('mongodb+srv://walber:rocha123@omnistack-htfyz.mongodb.net/Omnistack9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(routes);
app.listen(4200);
