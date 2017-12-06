/*
* penalty Model
* Created by ikoobmacpro on 2017.11.08..
* Copyright (c) 2017 ikoobmacpro. All rights reserved.
*/

'use strict';

module.exports = {
    tableName: 'penalty',                   // lower case collection or table name
    connection: 'mongoConnection',      // database connection
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        money: {
            type: 'integer',
            required: true
        },
        reason: {
            type: 'string',
            required: true
        },
        status: {
            type: 'string',
            required: true
        },
        areaCode:{
            type: 'integer',
            required: true
        }
    }
};
