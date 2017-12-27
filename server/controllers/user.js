/*
* user Controller
* Created by junhee on 2017.10.19..
* Copyright (c) 2017 junhee. All rights reserved.
*/

'use strict';

const Boom = require('boom'),
    Joi = require('joi'),
    jwt = require('jsonwebtoken'),
    Co = require('co');

/*********************************************************************** 
 *                              - 유저 등록 (C)
*************************************************************************/
exports.create = {
    description: '유저 등록 (C)',
    notes: ' ',
    tags: ['api'],
    validate: {
        payload: {
            email: Joi.string().required().description('이메일'),
            pwd: Joi.string().required().description('비밀번호'),
            area: Joi.string().required().valid('주안', '부평', '강남', '강북').description('지역')
        }
    },
    auth: false,
    handler: (request, reply) => {

        User.create(request.payload)
            .exec((err, user) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                return reply(user);
            });
    }
};

/*********************************************************************** 
 *                              - 유저 목록 조회 (R)
*************************************************************************/
exports.findAll = {
    description: '유저 목록 조회 (R)',
    notes: ' ',
    tags: ['api'],
    auth: false,
    handler: (request, reply) => {
        // 전체 조회
        User.find()
            .exec((err, user) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //유저 목록이 없으면
                if (user.length == 0) {
                    return reply(Boom.notFound());
                }
                //return
                return reply(user);
            });
    }
};

/*********************************************************************** 
 *                              - 유저 상세 조회 (R)
*************************************************************************/
exports.find = {
    description: '유저 상세 조회 (R)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            email: Joi.string().required().description('이메일')
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 조회
        User.findOne({ email: request.params.email })
            .exec((err, user) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //유저가 없으면
                if (!user) {
                    return reply(Boom.notFound());
                }
                //return
                return reply(user);
            });
    }
};

/*********************************************************************** 
 *                         - 유저 정보 수정 (U)
*************************************************************************/
exports.update = {
    description: '유저 정보 수정 (U)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            email: Joi.string().required().description('이메일')
        },
        payload: {
            email: Joi.string().required().description('이메일'),
            pwd: Joi.string().required().description('비밀번호'),
            area: Joi.string().required().valid('주안', '부평', '강남', '강북').description('지역')
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 수정
        User.update({ email: request.params.email }, request.payload)
            .exec((err, user) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                return reply(user);
            });
    }
};


/*********************************************************************** 
 *                         - 특정 유저 삭제 (D)
*************************************************************************/
exports.destroy = {
    description: '특정 유저 삭제 (D)',
    notes: ' ',
    tags: ['api'],
    validate: {
        params: {
            email: Joi.string().required().description('이메일')
        }
    },
    auth: false,
    handler: (request, reply) => {
        // 삭제
        User.destroy({ email: request.params.email })
            .exec((err) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                return reply('destroy');
            });
    }
};

/*********************************************************************** 
 *                          - 모든 유저 삭제 (D)
*************************************************************************/
exports.destroyAll = {
    description: '모든 유저 삭제 (D)',
    notes: ' ',
    tags: ['api'],
    auth: false,
    handler: (request, reply) => {
        // 삭제
        User.destroy({})
            .exec((err) => {
                // 에러
                if (err) {
                    return reply(Boom.badImplementation(err));
                }
                //return
                return reply('destroy all users');
            });
    }
};

/*********************************************************************** 
 *                              - 로그인 
*************************************************************************/
exports.login = {
    description: '로그인',
    tags: ['api'],
    validate: {
        payload: {
            email: Joi.string().required().description('이메일'),
            pwd: Joi.string().required().description('비밀번호'),
            area: Joi.string().required().valid('주안', '부평', '강남', '강북').description('지역')
        }
    },
    auth: {
        mode: 'try',
        strategy: 'token'
    },
    handler: function (request, reply) {

        //이미 있는지 체크하고 등록
        Co(function* () {
            try {
                var user = yield User.findOne({ email: request.payload.email });

                if (user) {
                    if (user.pwd == request.payload.pwd) {
                        if (user.area == request.payload.area) {
                            var tokenData = request.payload;
                            var res = { token: jwt.sign(tokenData, 'app_server!!!') };
                            return reply(res);
                        } else {
                            return reply(Boom.unauthorized('지역이 일치하지 않습니다'));
                        }
                    } else {
                        return reply(Boom.unauthorized('비밀먼호가 일치하지 않습니다'));
                    }

                } else {
                    return reply(Boom.unauthorized('존재하지 않는 이메일입니다'));
                }
            }

            catch (err) {
                throw err;
            }
        }).then(function (result) {
            reply(result);
        }).catch(function (err) {
            return reply(Boom.badImplementation(err));
        });

    }
};



