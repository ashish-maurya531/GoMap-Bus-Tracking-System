const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const db = require('./db');
const cors = require('cors');



const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
})



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








