import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersController } from '../controller/users.controller.js';
import { AuthInterceptor } from '../middlewares/auth.interceptor.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';

const debug = createDebug('SN:Router:UsersRouter');
const userInterceptor = new AuthInterceptor();
export const userRouter = createRouter();
const repo = new UserMongoRepository();
debug('Loaded');
const userController = new UsersController(repo);
// Export class UsersRouter {
//   constructor(private controller:UserMongoController) {
//     debug('instantiate');
//   }
// }
userRouter.get(
  '/',
  userInterceptor.authorizate.bind(userInterceptor),
  userController.getAll.bind(userController)
);
userRouter.get(
  '/:id',
  userInterceptor.authorizate.bind(userInterceptor),
  userController.getById.bind(userController)
);

userRouter.post('/register', userController.register.bind(userController));

userRouter.patch('/login', userController.login.bind(userController));

userRouter.patch(
  '/profile',
  userInterceptor.authorizate.bind(userInterceptor),
  userInterceptor.authentication.bind(userInterceptor),
  userController.update.bind(userController)
);

userRouter.delete(
  '/profile',
  userInterceptor.authorizate.bind(userInterceptor),
  userInterceptor.authentication.bind(userInterceptor),
  userController.delete.bind(userController)
);

userRouter.patch(
  '/friends',
  userInterceptor.authorizate.bind(userInterceptor),
  userInterceptor.authentication.bind(userInterceptor),
  userController.addFriends.bind(userController)
);
userRouter.patch(
  '/enemies',
  userInterceptor.authorizate.bind(userInterceptor),
  userInterceptor.authentication.bind(userInterceptor),
  userController.addEnemies.bind(userController)
);
userRouter.patch(
  '/contact-delete',
  userInterceptor.authorizate.bind(userInterceptor),
  userInterceptor.authentication.bind(userInterceptor),
  userController.deleteFriendOrEnemy.bind(userController)
);
