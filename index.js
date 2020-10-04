const express = require('express')
const mongoose = require('mongoose')
const dbName = 'personDB'
require('dotenv/config')
mongoose.connect(`${process.env.DB_CONNECTION}/${dbName}`,
    { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
    console.log('connection established')
}).on('error', (err) => {
    console.log(err)
})


const PORT = process.env.PORT || 3000

const app = express()

const Person = require('./models/person')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.send('Home Page...')
})
 
//CREATE A RECORD
app.post('/', (req, res) => {
    console.log(req.body)
    const person = new Person({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        favoriteFood: req.body.favoriteFood
    })
    /* person.save((err,data)=>{
        err? console.log(err):
        res.json(data)
    }) */
    person.save()
        .then((data) => { console.log(data) })
        .catch(err => {
            console.log(err)
        })
    res.json(person)
})

app.post('/many', (req, res) => {
    const tmp = req.body
    console.log(tmp)
    tmp.forEach(el => {
        el._id = new mongoose.Types.ObjectId()
    })
    Person.create(tmp)
        .then((data) => { console.log(data) })
        .catch(err => {
            console.log(err)
        })
    res.json(tmp)
})

Person.find({ name: '7i7' }, (err, data) => {
    err ? console.log(err) : console.log(data)
})

Person.findOne({ name: '7i7' }, (err, data) => {
    err ? console.log(err) : console.log('THIS IS THE FIND-ONE....', data)
})

Person.findById("5f793f2afcf30a29f8317cb3", (err, data) => {
    err ? console.log(err) : console.log('HAW BEL ID WEEEEY', data)
})

Person.findByIdAndRemove("5f79423805e53337d80a3976", (err, data) => {
    err ? console.log(err) : console.log('THIS ONE IS DELETED', data)
})
/////////////////
Person.findById('5f793f2afcf30a29f8317cb3', (err, data) => {
    if (err) {
        console.log(err)
    }
    else {
        data.favoriteFood.push('HAMBOURGER')
        data.save((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('CLASSIC UPDATE', data)
            }
        })
    }
})

Person.find({ name: '7i7' }, (err, data) => {
    if (err) {
        console.log(err)
    }
    else {
        data.forEach(el => {
            el.favoriteFood.push('HAMBOURGER')
            el.save((err, data) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('CLASSIC UPDATE 2', data)
                }
            })
        })
        /* for(let i=0;i<data.length;i++)
        {
            data[i].save((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log('CLASSIC UPDATE',data)
                }
            })
        } */
    }
})

////////////////////////////////

Person.find({ favoriteFood: 'HAMBOURGER' })
    .sort({ name: 'asc' })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
        err ? console.log(err) : console.log('HELPEEEEEERRR!!!!!!!!', data)
    })

Person.findOneAndUpdate({ name: '7i7' }, { age: -5 }, { new: true }, (err, data) => {
    err ? console.log(err) : console.log('FINDONEANDUPDATE', data)
})

Person.remove({ name: 'nameOne' }, (err, data) => {
    err ? console.log(err) :
        console.log('REMOVE METHOD!!!!!!!!!!!!!!!!!!!', data)
})

app.listen(PORT, (err) => {
    err ?
        console.log(err) :
        console.log('Server engaged on Port....' + PORT)
})