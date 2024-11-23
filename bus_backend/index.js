const express =require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors'); // To allow cross-origin requests
require('dotenv').config();


const app = express();
const port = 5000;
app.use(cors());


app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
})
////////////////////////////////////////////////////////////////
//code for pdf file upload
// Set storage for uploaded files
app.use('/notices', express.static(path.join(__dirname, 'notices')));

// Multer storage for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './notices';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
});
const checkAndDeleteOldFiles = () => {
    const dir = './notices';
    const files = fs.readdirSync(dir);
    
    if (files.length > 5) {
      // Sort by modification time (oldest first)
      const sortedFiles = files.map(file => ({
        name: file,
        time: fs.statSync(path.join(dir, file)).mtime.getTime(),
      })).sort((a, b) => a.time - b.time);
  
      // Delete the oldest file
      const oldestFile = sortedFiles[0].name;
      fs.unlinkSync(path.join(dir, oldestFile));
      console.log(`Deleted old file: ${oldestFile}`);
    }
  };
// PDF upload route
app.post('/uploadNotice', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'File too large or not valid' });
  }
  checkAndDeleteOldFiles();
  res.send({ message: 'File uploaded successfully', file: req.file.filename });
});

// Serve a specific PDF by ID
app.get('/api/notices/:pdfId', (req, res) => {
  const pdfId = req.params.pdfId;
  const filePath = path.join(__dirname, 'notices', pdfId);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/notices', (req, res) => {
    const dir = './notices';
    const files = fs.readdirSync(dir).map(file => {
      return {
        file,
        addedDate: fs.statSync(path.join(dir, file)).mtime,
      };
    });
    res.send(files);
  });

////////////////////////////////////////////////////////////////





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_NAME}@atlascluster.b11ukxt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// let MongoClients = require('mongodb').MongoClient;

const client = new MongoClient(uri);
client.connect();



app.get('/', (req, res) => {
    res.send("Hello World");
})
//admin login backend 
app.post('/login',async(req, res)=> {

    const { adminId, password } = req.body;
    console.log('Username:', adminId);
    console.log('Password:', password);
    try{
        const response = await client.db("location").collection("adminLogin").findOne({username:adminId, pass:password})
       
       if(response) {
            res.json({
                status: 200,
                data: response,
                message: `Login successful! Welcome ${adminId}`
            })
        } else {
            res.json({
                status: 404,
                message: "Invalid username or password"
            })
        }
       
    }catch(err){
        console.log(err);
    }
    
   
    
});




//route api
app.get('/route', async (req, res) => {
    try {
        const result = await client.db("location").collection("routes").find().toArray();
        res.json({
            data: result[0].route
        })
    } catch (err) {
        console.log(err);
    }
})


//route update api
app.post('/route', async (req, res) => {
    const { route } = req.body;
    try {
        const result = await client.db("location").collection("routes").updateOne(

            { route_id: "1234" },   // Filter
            { $set: { route: route } }        // Update



        );
        res.json({
            status: 200,
            data: result,
            message: "successfully updated routes!"
        })
    } catch (err) {
        console.log(err);
    }
})




//driver routes
//get current id count


let driverCollection = client.db("location").collection("driverIdNo")

app.get('/idCount', async (req, res) => {
    try{
        const result = await driverCollection.find({}).toArray();;
        console.log("result: " + JSON.stringify(result));
res.json({
  
    data: result[0]?.idNoCount
})
    }catch(err){
        console.log(err);
    }
})

//add new driver

app.post("/addDriver",async(req,res)=>{
    const {driverId,dName,dPhoneNo}=req.body;
    console.log(req?.body)
    if (!driverId||!dName || !dPhoneNo){
        res.json({
            status: 404,
            message: "Please enter all details"
        })
    }
    try{

        const result =await client.db("location").collection("driverInfo").insertOne({
            id: `D${driverId}`,
            name: dName,
            phoneNo:dPhoneNo
        })
        const updateDriverCount = await driverCollection?.updateOne(
            { did: "1234" },   // Filter
            { $set: { idNoCount: driverId } } 
        )

        console.log("adddriver", updateDriverCount)
        res.json({
            status: 200,
            data: result,
            message: "New driver added successfully!"
        })
    }
    catch(err){
        console.log(err);
    }
})


//get all drivers


app.get('/getdriver', async (req, res) => {
    try {
        const result = await client.db("location").collection("driverInfo").find().toArray();
        // console.log(result);
        res.json({
            status: 200,
            data: result
        })
    } catch (err) {
        console.log(err);
    }


})

//delete driver by id


app.delete('/deleteDriver/:id', async (req, res) => {
    const id=req.params.id;
    console.log(id);
    console.log(typeof (id))
    try {
        const result= await client.db("location").collection("driverInfo").deleteOne({id:id});
        console.log(result)
        res.status(202).json({message:"Driver deleted successfully",result});

    } catch (error) {
        res.status(500).json({message:"Error deleting the driver"});
        
    }

}
)

//edit driver by id
app.put('/updateDriver/:id', async (req, res) =>{
    const id=req.params.id;
    const {name,phoneNo}=req.body;

    try {
        const result= await client.db("location").collection("driverInfo").updateOne(

            { id: id },   // Filter
            { $set: { name: name,
                phoneNo: phoneNo }       
             }     



        );
        console.log(result)
        if (result.matchedCount===1){
            res.status(202).json({message:"Driver updated successfully",result});

        }
        else{
            res.status(404).json({message:"Driver not found"});
        }

    } catch (error) {
        res.status(500).json({message:"Error updating the driver"});
        
    }


})


//get current driver status (running a bus or idle)


app.get('/getdriverStatus/:id',async(req,res)=>{
    const driverid = req.params.id;
    console.log(driverid)
    try{
        const result = await client.db("location").collection("driverloc").findOne({driver_id:driverid});
        // console.log("result: " + JSON.stringify(result));
    if (result) {
        res.json({
            status: 200,
            data: result,
            message:"driver is running the bus"
        }) 
    }
 
    else{
        res.json({
            status: 201,
            message: "Driver is idle"
        })
    }
    } 
    catch (err) {
        res.json({
            status: 500,
            message: "Error getting driver status"
        })
    console.log(err);
    }
})


// get running buses data
app.get("/runningBuses",async(req, res)=>{
    try {
        const result = await client.db("location").collection("driverloc").find().toArray();
        const updatedResult = await Promise.all(result.map(async (e) => {
            const driver_name = await client.db("location").collection("driverInfo").findOne({ id: e.driver_id }, { projection: { name: 1, _id: 0 } })
            return {
                ...e,
                driverName: driver_name ? driver_name.name : "abc",
            };
        })
        );
      
        console.log(updatedResult);
        
        res.json({
            status: 200,
            data: updatedResult
        })
    }
    catch(err){
        console.log(err);
    }
})