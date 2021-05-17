const fs = require("fs").promises
const path = require("path")
const { v4: uuidv4 } = require("uuid");


const contactsPath = path.join(__dirname, "db", "contacts.json");


async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath,'utf-8');
    let contacts = JSON.parse(response);
    console.table(contacts);
  } catch (err) {
   console.error(err.message)
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath)
    const contacts = JSON.parse(response);
    const contact = contacts.find((el) => + el.id === + contactId);
    console.table(contact);
  
}catch (err) {
   console.error(err.message)
  }  
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath)
    const contacts = JSON.parse(response);
    const newContacts = contacts.filter((contact) => {
      return + contact.id !== + contactId;
    });
    changeContacts(contactsPath, newContacts);
    console.table(newContacts);
  
} catch (err) {
   console.error(err.message)
  }  
}

async function addContact(name, email, phone) {
  try {
    const response = await fs.readFile(contactsPath)
    const contacts = JSON.parse(response);
    const matchedContact =contacts.find(contact => {
      return email === contact.email || phone === contact.phone
    })
  
    if (matchedContact) {
        if (matchedContact.email === email) {
        console.log(`This email ${email} is already exist`);
        return
      }
      if (phone === matchedContact.phone) {
        console.log(`This phone ${phone} is already exist`);
        return
      }
      }
  
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    changeContacts(contactsPath, newContacts);
    console.table(newContacts);
}catch (err) {
   console.error(err.message)
  } 

}

async function changeContacts(path, newArray) {

  try {
    const contacts = JSON.stringify(newArray)
    const newContacts = await fs.writeFile(path, contacts)
    return newContacts
  }catch (err) {
   console.error(err.message)
  } 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};