/*
* penalty Route
* Created by ikoobmacpro on 2017.11.08..
* Copyright (c) 2017 ikoobmacpro. All rights reserved.
*/

'use strict';

var controller = require('../controllers/penalty');

module.exports = [
    { method: 'POST', path: '/penalty', config: controller.create },                    //벌금 등록 (C)    
    { method: 'GET', path: '/penalty', config: controller.findAll },                    //전체 벌금 조회 (R)    
    //{ method: 'GET', path: '/penalty/{penaltyId}', config: controller.find },         //특정 벌금 조회 (R)    
    { method: 'GET', path: '/penalty/area/{area}', config: controller.findByArea }, //지역별 벌금 조회 (R)    
    { method: 'PUT', path: '/penalty/{penaltyId}', config: controller.update },         //특정 벌금 수정 (U)    
    { method: 'DELETE', path: '/penalty/{penaltyId}', config: controller.destroy },     //특정 벌금 삭제 (D)    
    { method: 'DELETE', path: '/penalty', config: controller.destroyAll }               //모든 벌금 삭제 (D)    
];