const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb")
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World! Let's Working with NoSQL Databases");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const uri ="mongodb://teerapoom:jame0872746355@localhost:27017/?authMechanism=DEFAULT&authSource=Supermarket_sales";
const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
connectDB(); // เช็ค

// Read All API (เเก้ไข) **เเก้ (1/10)
app.get("/Dataset", async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client
        .db("Supermarket_sales")
        .collection("Dataset")
        .find({})
        .limit(1100)
        .toArray();
    await client.close();
    res.status(200).send(users);
}); //เช็ค


// Create API (เเก้ไข) **เเก้ (3/10)
app.post('/Dataset/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('Supermarket_sales').collection('Dataset').insertOne({
        'Invoice ID': object['Invoice ID'],
        'Branch': object['Branch'],
        'City': object['City'],
        'Customer type': object['Customer type'],
        'Gender': object['Gender'],
        'Product line': object['Product line'],
        'Unit price': object['Unit price'],
        'Quantity': object['Quantity'],
        'Tax 5%': object['Tax 5%'],
        'Total': object['Total'],
        'Date': object['Date'],
        'Time': object['Time'],
        'Payment': object['Payment'],
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object
    });
}) //เช็ค

// Update API (เเก้ไข้) **เเก้ (4/10)
const { ObjectId } = require('mongodb')
app.put('/Dataset/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('Supermarket_sales').collection('Dataset').updateOne({
        '_id': ObjectId(id)
    }, {
        "$set": {
            'Invoice ID': object['Invoice ID'],
            'Branch': object['Branch'],
            'City': object['City'],
            'Customer type': object['Customer type'],
            'Gender': object['Gender'],
            'Product line': object['Product line'],
            'Unit price': object['Unit price'],
            'Quantity': object['Quantity'],
            'Tax 5%': object['Tax 5%'],
            'Total': object['Total'],
            'Date': object['Date'],
            'Time': object['Time'],
            'Payment': object['Payment'],
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is updated",
        "object": object
    });
}) //เช็ค

// Delete API (เเก้ไข้) **เเก้ (5/10)
app.delete('/Dataset/delete', async (req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('Supermarket_sales').collection('Dataset').deleteOne({ '_id': ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is deleted"
    });
}) //เช็ค

// Read by id  (เเก้ไข้) **เเก้ (6/10)
app.get('/Dataset/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('Supermarket_sales').collection('Dataset').findOne({ '_id': ObjectId(id)});
    await client.close();
    res.status(200).send(user);
}) //เช็ค

// Read by id API (เเก้ไข้) **เเก้ (7/10)
app.get('/Dataset/issue/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('Supermarket_sales').collection('Dataset').find({
        $text: {
            $search: searchText
        }
    }).sort({ "FIELD": -1 }).limit(1100).toArray();

    await client.close();
    res.status(200).send(objects);
}) 
