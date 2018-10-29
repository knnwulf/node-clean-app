import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import {Routes} from './routes/routes'

class App {
    public app: express.Application;
    public routesPrv: Routes = new Routes();
    public mongoUrl = 'mongodb://localhost/node-app';

    constructor() {
        this.app = express();
        this.config();
        this.routesPrv.routes(this.app);
        this.mongoSetup();
    }

    private config() {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup() {
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;