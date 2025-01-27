/*
Rebecca Mazzocco
Created on: January 20, 2025
Last Edited on: January 20, 2025
Description: 
*/
import express from 'express';

//create express router object
const router = express.Router();

// mock some sata
let cheeses = [
    {id: 1, name: 'Marble'},
    {id: 2, name: 'Camembert'},
    {id: 3, name: 'Leicester'}
];

/**
 * @swagger
 * /api/v1/cheeses:
 *   get:
 *     summary: Retrieve all cheeses
 *     responses:
 *       200:
 *         description: A list of cheeses
 */
router.get('/', (req, res) => {
    return res.status(200).json(cheeses);
});

/**
 * @swagger
 * /api/v1/cheeses/{id}:
 *   get:
 *     summary: Find cheese by its id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       200:
 *         description: Returns a single cheese
 *       404: 
 *         description: Cheese not found
 */
router.get('/:id', (req, res) => {
    let index = cheeses.findIndex(c=> c.id==req.params.id);

    if(index==-1){
        return res.status(404).json({msg: 'Not Found'});
    }
});

/**
 * @swagger
 * /api/v1/cheeses:
 *   post:
 *     summary: Add new cheese from POST body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *     respenses:
 *       201:
 *         description: Resource created
 *       400:
 *         desctiption: Bad request
 *         
 */
router.post('/', (req, res) => { 
    cheeses.push(req.body);
    return res.status(201).json(); //201: resource created
});

/**
 * @swagger
 * /api/v1/cheeses/{id}:
 *   post:
 *     summary: Update cheese from request body
 *     parameters:
 *       -name: id
 *       in: path
 *       HHHHHHHHHHHHHHEEEEEEEEEEEEEEERRRRRRRRRRRRRREEEEEEEEEEEEEEEEE
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *     respenses:
 *       204:
 *         description: Resource updated
 *       400:
 *         desctiption: Bad request 
 *       404:
 *         desctiption: SOMETHING  
 */
router.get('/:id', (req, res) => {
    let index = cheeses.findIndex(c=> c.id==req.params.id);

    if(index==-1){
        return res.status(404).json({msg: 'Not Found'});
    }
    cheeses[index].name = req.body.name;
    return res.status(204).json(); //204: resource modified
});

/**
 * @swagger
 * /api/v1/cheeses/{id}:
 *   get:
 *     summary: Remove cheese by its id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *       204:
 *         description: Resource updated(removed)
 *       404: 
 *         description: Not found
 */
router.get('/:id', (req, res) => {
    let index = cheeses.findIndex(c=> c.id==req.params.id);

    if(index==-1){
        return res.status(404).json({msg: 'Not Found'});
    }
    cheeses.splice(index, 1);
    return res.status(204).json(); //204: resource modified
});


//make controller public to rest of the app
export default router;
