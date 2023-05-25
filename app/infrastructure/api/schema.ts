/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/login": {
    /** Logs in to Culturale API */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user: definitions["user"];
            token: string;
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/events": {
    /** Returns all events from database */
    get: {
      responses: {
        /** Ok */
        200: {
          schema: {
            events?: definitions["event"][];
          };
        };
        /** Unauthorized */
        403: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/users/create": {
    /** Creates a user registered in in BE */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user?: definitions["user"];
            message?: string;
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/events/:id/messages": {
    /** Returns all messages of an event chat */
    get: {
      responses: {
        /** Ok */
        200: {
          schema: {
            messages?: definitions["message"][];
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/users/edit": {
    /** Returns the edited user */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user?: definitions["user"];
            message?: string;
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/users/deleteFollower": {
    /** Deletes de users follower */
    delete: {
      responses: {
        /** Ok */
        201: {
          schema: {
            followers?: definitions["user"][];
            message?: string;
          };
        };
        /** Internal server error */
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/events/newParticipant": {
    /** It adds a participant into an event */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            message?: string;
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
  "/events/addReview": {
    /** It adds a review into an event */
    post: {
      responses: {
        /** Ok */
        200: {
          schema: {
            user?: definitions["review"];
            message?: string;
          };
        };
        /** Bad request */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions["error"];
          };
        };
      };
    };
  };
}

export interface definitions {
  event: {
    _id: string;
    codi: number;
    denominacio: string;
    descripcio: string;
    dataIni: string;
    dataFi: string;
    horari: string;
    adress: string;
    url: string;
    lat: number;
    long: number;
    photo: string;
    participants?: definitions["user"][];
    chat?: definitions["chat"];
  };
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    profilePicture: string;
    usertype: string;
    followers?: definitions["user"][];
    followeds?: definitions["user"][];
    eventSub?: definitions["event"][];
  };
  chat: {
    _id: string;
    messages: definitions["message"][];
  };
  message: {
    _id?: string;
    content: string;
    userId: string;
    date: string;
  };
  error: {
    /** Format: int */
    code?: number;
    message?: string;
  };
  review: {
    puntuation: number;
    comment?: string;
    authorId: string;
    eventId: string;
  };
}

export interface operations {}

export interface external {}
