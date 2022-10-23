
const express = require('express');
const app = express();
class Gear{
    constructor(level, sport, type, geo_location) {
        this.level = level;
        this.sport = sport;
        this.type = type;
        this.geo_location = geo_location;
    }
}


class Shirt extends Gear{
    constructor(level, sport,geo_location, accuracy){
        super(level, sport, "Shirt", geo_location);
        this.accuracy = accuracy;
    }
}

class Shoe extends Gear{
    constructor(level, sport,geo_location, speed){
        super(level, sport, "Shoe", geo_location);
        this.speed = speed;
    }
}


class Pant extends Gear{
    constructor(level, sport,geo_location, power){
        super(level, sport, "Pant", geo_location);
        this.power = power;
    }
}

class Knowledge extends Gear{
    constructor(level, sport,geo_location, insanity){
        super(level, sport, "Knowledge", geo_location);
        this.insanity = insanity;
    }
}



class Character {
    constructor(level, sport, url) {
      this.level = level;
      this.sport = sport;
      this.url = url;
    }
}

const characters =[
    new Character(1, "basketball", "https://ipfs.io/ipfs/QmeagtLJpQR7kEC5FNFT2iWPp2ENFboPfCirevt9iT2UXZ?filename=spock.zip"),
    new Character(2, "football", "https://www.google.ca")
]

app.get('/characters', (req, res) => {
    res.send(JSON.stringify(characters))
});


// https://maps.google.com/pluscodes/


const gears = [
    new Shirt(2,'football',"43.681313,-79.662188", 10 ),
    new Shoe(2,'football',"43.977512, -79.161490", 10 ),
    new Pant(3,'soccer',"43.835960, -79.505108", 8 ),
    new Knowledge(1,'football',"47.164724, 8.522295", 6 )
]

app.get('/gears', (req, res) => {
    res.send(JSON.stringify(gears))
});






app.listen(3000, function () {
    console.log("Server started...");
});
