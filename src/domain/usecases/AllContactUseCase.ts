import {ContactRepository} from "../repository/ContactRepository";
import {Contact} from "../entities/Contact";

export class AllContactUseCase {
    constructor(private repository: ContactRepository) {

    }

    getAllContacts(): Promise<Array<Contact>> {
        return this.repository.getAllContact();
    }
}