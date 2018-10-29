import * as mongoose from "mongoose";
import {Request, Response} from "express";
import {ContactSchema} from "../models/contact";
import {AllContactUseCase} from "../domain/usecases/AllContactUseCase";
import {ContactRepositoryImpl} from "../data/repository/ContactRepositoryImpl";

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }

            res.json(contact);
        });
    }

    public getContacts(req: Request, res: Response) {
        let repository = new ContactRepositoryImpl();
        let allContactUseCase = new AllContactUseCase(repository);
        allContactUseCase.getAllContacts().then(contactList => {
            res.json(contactList);
        });
    }

    public getContactById(req: Request, res: Response) {
        Contact.findById(req.params.contactId, ((err, contact) => {
            if (err) {
                res.send(err);
            }

            res.json(contact);
        }))
    }

    public updateContact(req: Request, res: Response) {
        Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true}, ((err, contact) => {
            if (err) {
                res.send(err);
            }

            res.json(contact);
        }))
    }

    public deleteContact(req: Request, res: Response) {
        Contact.remove({_id: req.params.contactId}, (err => {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Successfully deleted contact!'})
        }))
    }
}