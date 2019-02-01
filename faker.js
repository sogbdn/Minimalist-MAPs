
var faker = require('faker');

zooms = []
names = []
names = ['Alice','Rodrigo','Simon','Lisa','Elizabeth','Sonja','Gabriel','Franny','Simone']
lats = []
longs = []
desc = []
function createfakezooms (num){

  for (let i=0; num > i; i++){
    zooms.push(i);
  }

}
createfakezooms(10);
console.log(zooms)


// function createfakenames (num){

//   for (i=0; num > i; i++){
//     let randomName = faker.name.findName()
//     names.push(randomName);
//   }

// }

// createfakenames(10);
// console.log(names)

function createlats (num){
  for (i=0; num > i; i++){
  let randomLats = faker.address.latitude()
  lats.push(randomLats);
}
}

createlats(10);
console.log(lats)

function createlongs (num){
  for (i=0; num > i; i++){
  let randomLongs = faker.address.latitude()
  lats.push(randomLongs);
}
}

createlongs(10);
console.log(lats)

function desctext (num){
  for (i=0; num > i; i++){
  let randomDescr = faker.lorem.text()
  desc.push(randomDescr);
}
}

desctext(10);
console.log(desc);



