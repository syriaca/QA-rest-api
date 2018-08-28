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
        size:   String,
        mass:   {type: Number, default: 0.007},
        name:   {type: String, default: 'Angela'}
    });

    AnimalSchema.pre('save', function(next) {
        if(this.mass >= 100) {
            this.size = 'big'
        } else if (this.mass >= 6 && this.mass < 1000) {
            this.size = 'medium'
        } else {
            this.size = 'small'
        }
        next();
    });

    AnimalSchema.statics.findSize = (size, callback) => {
        // This == Animal
        return Animal.find({size: size}, callback);
    };

    AnimalSchema.methods.findSameColor = function(callback) {
        // this == document
        return this.model('Animal').find({color: this.color});
    };

    let Animal = mongoose.model('Animal', AnimalSchema);

    let elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Lawrence'
    });

    let animal = new Animal({});
    
    let whale =  new Animal({
        type: 'whale',
        mass: 190500,
        name: 'Fig'
    });

    let animalData = [
        {
            type: 'mouse',
            color: 'gray',
            mass: 0.035,
            name: 'Marvin'
        },
        {
            type: 'nutria',
            color: 'brown',
            mass: 6.35,
            name: 'Gretchen'
        },
        {
            type: 'wolf',
            color: 'gray',
            mass: 45,
            name: 'Iris'
        },
        elephant, 
        animal,
        whale
    ];

    Animal.remove({}, function(err){
        if(err) console.error(err);
            Animal.create(animalData, (err, animals) => {
                if(err) console.error(err);
                Animal.findSize('medium', (err, animals) => {
                    animals.forEach((animal) => {
                        console.log(animal.name + ' the ' + animal.color + ' ' + animal.type + ' is a ' + animal.size + '-sized animal.');
                    });                                     
                    db.close(() => {
                        console.log('db connection closed');
                    });
                });   
            });
      });
}); 


