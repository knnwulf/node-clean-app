import {ContactRepository} from "../../domain/repository/ContactRepository";
import {Contact} from "../../domain/entities/Contact";
import * as mongoose from "mongoose";
import {ContactSchema} from "../../models/contact";

const ContactDB = mongoose.model('Contact', ContactSchema);

export class ContactRepositoryImpl implements ContactRepository {

    getAllContact(): Promise<Array<Contact>> {
        return new Promise<Array<Contact>>(resolve => {
            ContactDB.find({}, ((err, contacts) => {
                if (err) {
                    console.log('Error getting contacts')
                } else {
                    let contactList = this.mapper(contacts);
                    resolve(contactList);
                }
            }));
        });
    }

    private mapper(contactSchema): Array<Contact> {
        let contacts = [];
        for (let entry of contactSchema) {
            let contact = new Contact();
            contact.id = entry._id;
            contact.firstName = entry.firstName;
            contact.lastName = entry.lastName;
            contact.email = entry.email;
            contact.company = entry.company;
            contact.phone = entry.phone;
            contacts.push(contact);
        }
        return contacts;
    }
}