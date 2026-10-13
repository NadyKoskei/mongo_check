// MongoDB CRUD Operations for contact database

db = db.getSiblingDB("contact");

// Create collection and insert documents
db.createCollection("contactlist");
db.contactlist.insertMany([
  { lastname: "Ben", firstname: "Moris", email: "ben@gmail.com", age: 26 },
  { lastname: "Kefi", firstname: "Seif", email: "kefi@gmail.com", age: 15 },
  { lastname: "Emilie", firstname: "brouge", email: "emilie.b@gmail.com", age: 40 },
  { lastname: "Alex", firstname: "brown", age: 4 },
  { lastname: "Denzel", firstname: "Washington", age: 3 }
]);

print("=== All contacts ===");
db.contactlist.find().forEach(printjson);

// Display one person by ID
var firstDoc = db.contactlist.findOne();
print("\n=== First contact by ID ===");
printjson(db.contactlist.findOne({ _id: firstDoc._id }));

// Contacts with age > 18
print("\n=== Contacts with age > 18 ===");
db.contactlist.find({ age: { $gt: 18 } }).forEach(printjson);

// Contacts with age > 18 and name containing "ah"
print("\n=== Contacts with age > 18 and name containing 'ah' ===");
db.contactlist.find({ 
  age: { $gt: 18 }, 
  $or: [
    { firstname: /ah/i },
    { lastname: /ah/i }
  ]
}).forEach(printjson);

// Update Kefi Seif to Kefi Anis
print("\n=== Updating Kefi Seif to Kefi Anis ===");
db.contactlist.updateOne(
  { firstname: "Seif", lastname: "Kefi" },
  { $set: { firstname: "Anis" } }
);
print("Updated");

// Delete contacts aged under 5
print("\n=== Deleting contacts aged under 5 ===");
db.contactlist.deleteMany({ age: { $lt: 5 } });
print("Deleted");

// Display final contacts list
print("\n=== Final contacts list ===");
db.contactlist.find().forEach(printjson);