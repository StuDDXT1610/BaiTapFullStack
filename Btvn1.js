const fs = require('fs');

fs.readFile('/MINDXFULLSTACK/Chapter_3/data.json',  'utf8', function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})