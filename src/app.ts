import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const pensions = [
  {
    name: 'James Bond',
    value: 700.07,
  },
];

const SECRET_KEY = 'ShieldSuperSecretKey123';

const authenticateToken =
  (accessLevel: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    let userInfo;

    if (authHeader) {
      const extractedToken = authHeader.split(' ')[1];

      jwt.verify(extractedToken, SECRET_KEY, (err, user) => {
        if (err) {
          return res.send('Invalid token!');
        }
        userInfo = user;
      });

      if (accessLevel) {
        if (userInfo!.accessLevel.includes(accessLevel)) {
          next();
        } else {
          res.send('Insufficient level of access');
        }
      } else {
        next();
      }
    } else {
      res.send('Missing token');
    }
  };

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/generate-token', (req, res) => {
  // req body some info about user/service
  const { name, id, email, role, team, accessLevel } = req.body;
  const payload = { name, id, email, role, team, accessLevel };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.send(token);
});

app.post('/add-pension', authenticateToken('write'), (req, res) => {
  const { name, value } = req.body;
  pensions.push({ name, value });
  res.send('Pension Added');
});

app.get('/pensions', authenticateToken('read'), (req, res) => {
  res.send(pensions);
});

app.listen(3000, () => {
  console.log('API on 3000');
});
