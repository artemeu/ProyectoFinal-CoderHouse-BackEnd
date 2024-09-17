import { Router } from "express";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() { }

    get(path, ...cb) {
        this.router.get(path, this.customResponses, this.applyCallbacks(cb));
    }

    post(path, ...cb) {
        this.router.post(path, this.customResponses, this.applyCallbacks(cb));
    }

    put(path, ...cb) {
        this.router.put(path, this.customResponses, this.applyCallbacks(cb));
    }

    delete(path, ...cb) {
        this.router.delete(path, this.customResponses, this.applyCallbacks(cb));
    }

    applyCallbacks(cb) {
        return cb.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (e) {
                return params[1].status(500).send(e);
            }
        });
    }

    customResponses(req, res, next) {
        res.success = payload => res.json({ status: 'success', payload });
        res.errorServer = error => res.status(500).json({ status: 'server error', error });
        res.notFound = error => res.status(404).json({ status: 'not found', error });
        res.badRequest = error => res.status(400).json({ status: 'bad request', error });
        res.unauthorized = error => res.status(401).json({ status: 'unauthorized', error });
        res.forbidden = error => res.status(403).json({ status: 'forbidden', error });
        res.conflict = error => res.status(409).json({ status: 'conflict', error });
        next();
    }
}
