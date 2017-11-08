/*
* penalty Route
* Created by ikoobmacpro on 2017.11.08..
* Copyright (c) 2017 ikoobmacpro. All rights reserved.
*/

'use strict';

var controller = require('../controllers/penalty');

module.exports = [
    { method: 'GET', path: '/penalty', config: controller.findAll },
    { method: 'GET', path: '/penalty/{penaltyId}', config: controller.find },
    { method: 'POST', path: '/penalty', config: controller.create },
    { method: 'PUT', path: '/penalty/{penaltyId}', config: controller.update },
    { method: 'DELETE', path: '/penalty/{penaltyId}', config: controller.destroy }
];