import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import employeesRouter from "./employees";
import accountsRouter from "./accounts";
import transactionsRouter from "./transactions";
import alertsRouter from "./alerts";
import casesRouter from "./cases";
import aiRouter from "./ai";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(employeesRouter);
router.use(accountsRouter);
router.use(transactionsRouter);
router.use(alertsRouter);
router.use(casesRouter);
router.use(aiRouter);
router.use(dashboardRouter);

export default router;
