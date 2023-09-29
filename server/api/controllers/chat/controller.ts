import { Request, Response } from 'express';



export class Controller {
  
    startChat(req: Request, res: Response): void {

        console.log('received a post')
        // Handle the chat connection
        console.log(req.body);
        // console.log(req.body.socket.id);
        
        // Return a success response
        res.status(200).json({ message: 'Chat connection initiated successfully' });
    }
  
  }
  export default new Controller();
  

