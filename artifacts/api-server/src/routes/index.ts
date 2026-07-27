import { Router, type IRouter } from "express";
import healthRouter from "./health";
import publicSettingsRouter from "./public-settings";
import publicLeadsRouter from "./public-leads";
import adminAuthRouter from "./admin-auth";
import adminLeadsRouter from "./admin-leads";
import adminSettingsRouter from "./admin-settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(publicSettingsRouter);
router.use(publicLeadsRouter);
router.use(adminAuthRouter);
router.use(adminLeadsRouter);
router.use(adminSettingsRouter);

export default router;
