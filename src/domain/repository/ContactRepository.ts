import {Contact} from '../entities/Contact';

export interface ContactRepository {
    getAllContact(): Promise<Array<Contact>>
}