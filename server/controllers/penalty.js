/*
* penalty Controller
* Created by ikoobmacpro on 2017.11.08..
* Copyright (c) 2017 ikoobmacpro. All rights reserved.
*/

'use strict';

var Boom = require('boom'),
    Joi = require('joi');

/*********************************************************************** 
 *                              - 벌금 등록 (C)
*************************************************************************/
exports.create = {
    description:'벌금 등록 (C)',
    tags: ['api'],
    validate: {
        payload: {
            name: Joi.string().required(),
            money: Joi.string().required(),
            reason: Joi.string().required().valid('안 품', '지각', '결석'),
            status: Joi.string().required().valid('미입금','입금')
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 생성
        Penalty.create(request.payload)
            .exec(function (err, penalty) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(penalty);
        });
    }
};



/*********************************************************************** 
 *                              - 벌금 목록 조회 (R)
*************************************************************************/
exports.findAll = {
    description:'벌금 목록 조회 (R)',
    tags: ['api'],
    auth: false,
    handler: function (request, reply) {
        // 전체 조회
        Penalty.find()
            .exec(function (err, penalty) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(penalty);
        });
    }
};

/*********************************************************************** 
 *                              - 벌금 상세 조회 (R)
*************************************************************************/
exports.find = {
    description:'벌금 상세 조회 (R)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required()
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 조회
        Penalty.findOne({id: request.params.penaltyId})
            .exec(function (err, penalty) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(penalty);
        });
    }
};



/*********************************************************************** 
 *                         - 벌금 정보 수정 (U)
*************************************************************************/
exports.update = {
    description:'벌금 정보 수정 (U)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required()
        },
        payload: {
            name: Joi.string().required(),
            money: Joi.string().required(),
            reason: Joi.string().required().valid('안 품', '지각', '결석'),
            status: Joi.string().required().valid('미입금','입금')
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 수정
        Penalty.update({id: request.params.penaltyId}, request.payload)
            .exec(function (err, penalty) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply(penalty);
            });
    }
};

/*********************************************************************** 
 *                         - 특정 벌금 삭제 (D)
*************************************************************************/
exports.destroy = {
    description:'특정 벌금 삭제 (D)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required()
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 삭제
        Penalty.destroy({id: request.params.penaltyId})
            .exec(function (err) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply('destroy');
            });
    }
};


/*********************************************************************** 
 *                          - 모든 벌금 삭제 (D)
*************************************************************************/
exports.destroy = {
    description:'모든 벌금 삭제 (D)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required()
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 삭제
        Penalty.destroy({})
            .exec(function (err) {
                // 결과
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                reply('destroy');
            });
    }
};
