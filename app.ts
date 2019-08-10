import * as express from 'express';
import {Request, Response, Express, Router, NextFunction} from 'express';
import * as path from 'path';
import * as cfenv from 'cfenv';
import {get, post, put, head} from 'request';
import * as serveStatic from 'serve-static';
import {verify} from 'jsonwebtoken';
import {promisify} from 'util';
import * as bodyParser from 'body-parser';
import {getClientIp} from 'request-ip'

const appEnv = cfenv.getAppEnv(process.env.NODE_ENV !== 'production'
  && process.env.CLOUDANT_URL
  && {
    vcap: {
      application: {
        JWT: process.env.JWT_SECRET
      },
      services: {
        cloudantNoSQLDB: [
          {
            name: "",
            credentials: {
              url: process.env.CLOUDANT_URL
            }
          }
        ]
      }
    }
  });
const app: Express = express();

app.use(serveStatic(path.resolve('dist/poc/')));

const {credentials: {url = ''} = {}} = appEnv.getService('') || {};

app.post('/log',
  [bodyParser.urlencoded({extended: false}), bodyParser.json()],
  (req: Request, res: Response) => {
    const {body} = req;
    body.ip = getClientIp(req);
    post({url: `${url}`, json: body}).pipe(res);
  });

declare global {
  namespace Express {
    interface Request {
      profileEndpoint: string;
      profileId: string;
      dbEndpoint: string;
    }
  }
}
const searchRouter = Router();

searchRouter.use(bodyParser.urlencoded({extended: false}));
searchRouter.use(bodyParser.json());

searchRouter.use((req: Request, res: Response, next: NextFunction) => {
  const authToken = req.get('Authorization');
  const JWT = appEnv.app.JWT || appEnv.JWT || process.env.JWT;
  if (authToken && JWT) {
    const [type, credentials] = authToken.split(' ');
    try {
      const {username}: any = verify(credentials, appEnv.app.JWT || appEnv.JWT || process.env.JWT);
      req.dbEndpoint = `${url}`;
      req.profileId = username;
      req.profileEndpoint = `${req.dbEndpoint}${req.profileId}`;
    } catch (e) {
      res.sendStatus(500);
    }
    next();
  } else {
    res.sendStatus(401);
  }
});

searchRouter.get('/', ({profileEndpoint, profileId: _id, dbEndpoint}, res) => {
  head(profileEndpoint, (err, req, body) => {
    if (err) {
      console.log(err);
      return;
    }
    const {statusCode}: any = req || {statusCode: -1};
    switch (statusCode) {
      case 404:
        post({url: dbEndpoint, json: {_id}}).pipe(res);
        break;
      case 200:
        get(profileEndpoint).pipe(res);
        break;
      default:
        res.sendStatus(statusCode);
        break;
    }
  });
});

searchRouter.put('/', ({profileEndpoint, body}, res) => {
  put(profileEndpoint, {body: JSON.stringify(body)}).pipe(res);
});

app.use('/profile', searchRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/poc/index.html'));
});

app.listen(process.env.PORT || appEnv.port, appEnv.bind);

console.log('Started on ' + appEnv.bind + ':' + appEnv.port, url);



