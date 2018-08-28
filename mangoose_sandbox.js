'use strict';

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

let db = mongoose.connection;

db.on('error', () => {
    console.error('connection error:', err);
});

db.once('open', () => {
    console.log('db connection successful');
    // All database communication goes here

    let Schema = mongoose.Schema;
    let AnimalSchema =  new Schema({
        type:   {type: String, default: 'goldfish'},
        color:  {type: String, default: 'golden'},
        size:   {type: String, default: 'small'},
        mass:   {type: Number, default: 0.007},
        name:   {type: String, default: 'Angela'}
    });

    let Animal = mongoose.model('Animal', AnimalSchema);

    let elephant = new Animal({
        type: 'elephant',
        size: 'big',
        color: 'gray',
        mass: 6000,
        name: 'Lawrence'
    });

    let animal = new Animal({});
    
    let whale =  new Animal({
        type: 'whale',
        size: 'big',
        mass: 190500,
        name: 'Fig'
    });

    Animal.remove({}, function(err){
        if(err) console.error(err);
        elephant.save((err) => {
            if(err) console.error(err);
            animal.save((err) => {
                if(err) console.error(err);
                whale.save((err)=> {
                    if(err) console.error(err);
                    // Query animals with siz "big"
                    Animal.find({size: 'big'}, (err, animals) => {
                        animals.forEach((animal) => {
                            console.log(animal.name + ' the ' + animal.color + ' ' + animal.type);
                        });                                     
                        db.close(() => {
                            console.log('db connection closed');
                        });
                    });   
                });
            });
        }); 
    });
});

