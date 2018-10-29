import {Application} from "express"
import {ContactController} from "../controllers/contactController";

export class Routes {

    public contactController = new ContactController();

    public routes(app: Application): void {
        app.route('/').get(((req, res) => {
            res.status(200).send({
                message: 'GET request successful'
            });
        }));

        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.addNewContact);

        app.route('/contact/:contactId')
            .get(this.contactController.getContactById)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }

}