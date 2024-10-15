import { Router } from "express";
import { invokePassport } from "../middlewares/authJWT.js";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
    }

    get(path, policies = [], ...cb) {
        this.router.get(path, this.customResponses, this.handlePolicies(policies), this.applyCallbacks(cb));
    }

    post(path, policies = [], ...cb) {
        this.router.post(path, this.customResponses, this.handlePolicies(policies), this.applyCallbacks(cb));
    }

    put(path, policies = [], ...cb) {
        this.router.put(path, this.customResponses, this.handlePolicies(policies), this.applyCallbacks(cb));
    }

    delete(path, policies = [], ...cb) {
        this.router.delete(path, this.customResponses, this.handlePolicies(policies), this.applyCallbacks(cb));
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

    handlePolicies(policies) {
        return async (req, res, next) => {
            if (policies.length === 0) return next();
            const isAuthenticated = policies.includes('authenticated');
            // Si se requiere autenticación, llama a invokePassport
            if (isAuthenticated) {
                await invokePassport('current')(req, res, async (err) => {
                    if (err) return next(err);
                    return checkPermissions();
                });
            } else {
                return checkPermissions();
            }

            function checkPermissions() {
                const userRole = req.user?.rol;
                const hasPermission = policies.includes(userRole);
                if (!hasPermission) {
                    return res.forbidden('No tienes permiso para realizar esta acción');
                }
                next();
            }
        };
    }
}