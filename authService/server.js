const express = require('express')
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes");
const adminRoleRoutes = require("./routes/adminRoleRoutes");
const app = express()
dotenv.config()
connectDB();

app.use(express.json());
app.use('/api/admin', adminRoutes)
app.use('/api/admin-role', adminRoleRoutes)
app.use('/api/user', userRoutes)




// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`))
