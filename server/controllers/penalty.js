/*
* penalty Controller
* Created by ikoobmacpro on 2017.11.08..
* Copyright (c) 2017 ikoobmacpro. All rights reserved.
*/

'use strict';

var Boom = require('boom'),
    Joi = require('joi'),
    _ = require('lodash'),
    Co = require('co');

/*********************************************************************** 
 *                              - 벌금 등록 (C)
*************************************************************************/
exports.create = {
    description: '벌금 등록 (C)',
    tags: ['api'],
    validate: {
        payload: {
            name: Joi.string().required().description('이름'),
            money: Joi.number().required().description('금액'),
            reason: Joi.string().required().valid('안 품', '지각', '결석').description('사유'),
            status: Joi.string().required().valid('미입금', '입금').description('상태'),
            date: Joi.string().required().description('날짜 (yy.mm.dd)')
        }
    },
    //auth: false,
    handler: function (request, reply) {

        //이미 있는지 체크하고 등록
        Co(function* () {
            try {

                //지역 코드
                request.payload.area = request.auth.credentials.area;

                //생성
                var penalty = yield Penalty.create(request.payload);

                //reply
                return penalty;
            }
            catch (err) {
                throw err;
            }
        }).then(function (cart) {
            reply(cart);
        }).catch(function (err) {
            return reply(Boom.badImplementation(err));
        });
    }
};

/*********************************************************************** 
 *                              - 전체 벌금 목록 조회 (R)
*************************************************************************/
exports.findAll = {
    description: '전체 벌금 목록 조회 (R)',
    tags: ['api'],
    validate: {
        query: {
            pageNumber: Joi.number().description('페이지 번호')
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 전체 조회
        Penalty.find()
            .exec(function (err, penalty) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //벌금 목록이 없으면
                if (penalty.length == 0) {
                    var result = {
                        list: [],
                        sum: 0
                    };
                    reply (result);
                }

                //총합 계산
                var sum = 0;
                for (var i in penalty) {
                    sum += penalty[i].money;
                }

                //pagination
                if (!request.query.pageNumber || request.query.pageNumber == 0) {
                    request.query.pageNumber = 1;
                }
                var pagePerRow = 5;
                var startIndex = 0;
                var endIndex = 0;
                startIndex = request.query.pageNumber == 1 ? 0 : pagePerRow * (request.query.pageNumber - 1);
                endIndex = startIndex + pagePerRow;
                var resultPenalty = _.slice(penalty, startIndex, endIndex);

                //return
                var result = {
                    list: resultPenalty,
                    sum: sum
                };
                reply(result);
            });
    }
};

/*********************************************************************** 
 *                              - 특정 벌금 상세 조회 (R)
*************************************************************************/
exports.find = {
    description: '특정 벌금 상세 조회 (R)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required().description('벌금 아이디')
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 조회
        Penalty.findOne({ id: request.params.penaltyId })
            .exec(function (err, penalty) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //벌금 목록이 없으면
                if (!penalty) {
                    return reply(Boom.notFound());
                }

                //return
                reply(penalty);
            });
    }
};

/*********************************************************************** 
 *                              - 해당 지역 벌금 조회 (R)
*************************************************************************/
exports.findByArea = {
    description: '해당 지역 벌금 조회 (R)',
    tags: ['api'],
    validate: {
        params: {
            area: Joi.string().required().valid('주안', '부평', '강남', '강북').description('지역')
        },
        query: {
            pageNumber: Joi.number().description('페이지 번호')
        }
    },
    auth: false,
    handler: function (request, reply) {
        // 조회
        Penalty.find(request.params)
            .exec(function (err, penalty) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }

                console.log(penalty);
                //벌금 목록이 없으면
                if (penalty.length == 0) {
                    var result = {
                        list: [],
                        sum: 0
                    };
                    reply(result);
                }

                //총합 계산
                var sum = 0;
                for (var i in penalty) {
                    sum += penalty[i].money;
                }

                //pagination
                if (!request.query.pageNumber || request.query.pageNumber == 0) {
                    request.query.pageNumber = 1;
                }
                var pagePerRow = 5;
                var startIndex = 0;
                var endIndex = 0;
                startIndex = request.query.pageNumber == 1 ? 0 : pagePerRow * (request.query.pageNumber - 1);
                endIndex = startIndex + pagePerRow;
                var resultPenalty = _.slice(penalty, startIndex, endIndex);

                //return
                var result = {
                    list: resultPenalty,
                    sum: sum
                };
                reply(result);
            });
    }
};

/*********************************************************************** 
 *                         - 특정 벌금 정보 수정 (U)
*************************************************************************/
exports.update = {
    description: '특정 벌금 정보 수정 (U)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required().description('벌금 아이디')
        },
        payload: {
            name: Joi.string().required().description('이름'),
            money: Joi.number().required().description('금액'),
            reason: Joi.string().required().valid('안 품', '지각', '결석').description('사유'),
            status: Joi.string().required().valid('미입금', '입금').description('입금 상태'),
            date: Joi.string().required().description('날짜 (yy.mm.dd)')
        }
    },
    //auth: false,
    handler: function (request, reply) {
        // 수정
        Penalty.update({ id: request.params.penaltyId }, request.payload)
            .exec(function (err, penalty) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                reply(penalty);
            });
    }
};

/*********************************************************************** 
 *                         - 특정 벌금 삭제 (D)
*************************************************************************/
exports.destroy = {
    description: '특정 벌금 삭제 (D)',
    tags: ['api'],
    validate: {
        params: {
            penaltyId: Joi.string().required()
        }
    },
    //auth: false,
    handler: function (request, reply) {
        // 삭제
        Penalty.destroy({ id: request.params.penaltyId })
            .exec(function (err) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                reply('destroy');
            });
    }
};


/*********************************************************************** 
 *                          - 모든 벌금 삭제 (D)
*************************************************************************/
exports.destroyAll = {
    description: '모든 벌금 삭제 (D)',
    tags: ['api'],
    auth: false,
    handler: function (request, reply) {
        // 삭제
        Penalty.destroy({})
            .exec(function (err) {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                reply('destroy');
            });
    }
};
