const mongoose      = require("mongoose"),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment");


const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Bacon ipsum dolor amet kevin cow cupim, beef ribs shank chuck tongue venison turducken boudin filet mignon ham bresaola jerky. Bacon meatball kielbasa filet mignon, turkey venison boudin porchetta ball tip. Ribeye pork pastrami boudin. Picanha shoulder andouille, jowl ground round spare ribs landjaeger short loin pastrami leberkas. Meatball ground round corned beef, beef ribs pork chop hamburger capicola beef shankle chicken boudin tongue andouille turducken. Biltong sausage strip steak kielbasa."
    },
    {
        name: "Cliff Hanger",
        image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",
        description: "Bacon ipsum dolor amet kevin cow cupim, beef ribs shank chuck tongue venison turducken boudin filet mignon ham bresaola jerky. Bacon meatball kielbasa filet mignon, turkey venison boudin porchetta ball tip. Ribeye pork pastrami boudin. Picanha shoulder andouille, jowl ground round spare ribs landjaeger short loin pastrami leberkas. Meatball ground round corned beef, beef ribs pork chop hamburger capicola beef shankle chicken boudin tongue andouille turducken. Biltong sausage strip steak kielbasa."
    },
    {
        name: "Moose Point",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: "Bacon ipsum dolor amet kevin cow cupim, beef ribs shank chuck tongue venison turducken boudin filet mignon ham bresaola jerky. Bacon meatball kielbasa filet mignon, turkey venison boudin porchetta ball tip. Ribeye pork pastrami boudin. Picanha shoulder andouille, jowl ground round spare ribs landjaeger short loin pastrami leberkas. Meatball ground round corned beef, beef ribs pork chop hamburger capicola beef shankle chicken boudin tongue andouille turducken. Biltong sausage strip steak kielbasa."
    },
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if(err){
            console.log(err);
        }
            console.log("Removed campgrounds!");
            // Add a few campgrounds
            data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
              if(err){
                console.log(err);
            }
                console.log("Added a campground!");
                // Create a comment
                Comment.create(
                    {
                        text: "This place was great but I wish there was internet",
                        author: "Homer"
                    }, (err, comment) => {
                        if(err){
                            console.log(err);
                        }
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment!");
                    });
            }); 
        });
    });
    // Add a few comments
}

module.exports = seedDB;