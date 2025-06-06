import { Request, Response } from "express";

const todos = [
            {id: 1, text: 'Buy milk', complitedAt: new Date()},
            {id: 2, text: 'Buy bread', complitedAt: null},
            {id: 3, text: 'Buy butter', complitedAt: new Date()}
        ];   
        

export class TodosController {

    //* DI
    constructor(){}

    
    public getTodos = ( req: Request, res: Response ) => {
        res.json(todos);
        return;
    }

    public getTodoById = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN( id ) ) res.status(400).json( 'error: ID provided is not a number' );

        const todo = todos.find( todo => todo.id === id );
        ( todo )
            ? res.json( todo )
            : res.status(404).json({ error: `Todo with id ${ id } not found` });
    }

    public createTodo = ( req: Request, res: Response ) => {
        const { text } = req.body;
        if ( !text ) {
            res.status(400).json( 'error: text is required' );
            return;
        }
        const newTodo = {
            id: todos.length + 1,
            text: 'buy videogames',
            complitedAt: null
        };
        todos.push(newTodo);

        res.json( newTodo );
    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN( id ) ) {
            res.status(400).json( { error: 'ID is not a number'} );
            return;
        }

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) {
            res.status(404).json( { error: 'ID was not found'} );
            return;
        }

        const { text, complitedAt } = req.body;
        // if ( !text ) {
        //     res.status(400).json( { error: 'text must be a included'} );
        //     return;
        // }

        todo.text = text || todo.text;
        ( complitedAt === "null" )
            ? todo.complitedAt = null
            : todo.complitedAt = new Date( complitedAt || todo.complitedAt );

        res.json( todo );
    }

    public deleteTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) {
            res.status(404).json({ error: `Todo with id ${ id } not found` });
            return;
        }
        
        todos.splice( todos.indexOf(todo), 1);
        res.json( todo );
    }

}