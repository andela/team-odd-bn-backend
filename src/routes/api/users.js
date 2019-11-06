const router = require('express').Router();

/**
 * @swagger
 *
 * /users/login:
 *    post:
 *      summary: User login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 */

module.exports = router;
