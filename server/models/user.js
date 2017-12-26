/*
* user Model
* Created by junhee on 2017.10.19..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

module.exports = {
    tableName: 'user',                   // lower case collection or table name
    connection: 'mongoConnection',      // database connection
    attributes: {
        email: {
            type: 'string',
            required: true
        },
        pwd: {
            type: 'string',
            required: true
        },
        area: {
            type: 'string',
            required: true
        }
    }
};
