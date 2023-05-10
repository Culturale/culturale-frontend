/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

import { IUser } from "~/domain";

export interface paths {
  '/login': {
    /** Logs in to Culturale API */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user: definitions['user'];
            token: string;
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
  '/events': {
    /** Returns all events from database */
    get: {
      responses: {
        /** Ok */
        200: {
          schema: definitions['event'][];
        };
        /** Unauthorized */
        403: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
  '/users/create': {
    /** Creates a user registered in in BE */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user?: definitions['user'];
            message?: string;
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
  '/events/:id/messages': {
    /** Returns all messages of an event chat */
    get: {
      responses: {
        /** Ok */
        200: {
          schema: {
            messages?: definitions['message'][];
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
}

export interface definitions {
  event: {
    id: string;
    codi: number;
    denominacio: string;
    descripcio: string;
    dataIni?: string;
    dataFi?: string;
    horari: string;
    address: string;
    url: string;
    participants?: definitions['user'][];
    chat?: definitions['chat'];
  };
  user: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    profilePicture?: string;
    userType?: string;
    followers?: IUser[];
    followed?: IUser[]; 
  };
  chat: {
    id: string;
    messages: definitions['message'][];
  };
  message: {
    id?: string;
    content: string;
    userId: string;
    date: string;
  };
  error: {
    /** Format: int */
    code?: number;
    message?: string;
  };
}

export interface operations {}

export interface external {}
