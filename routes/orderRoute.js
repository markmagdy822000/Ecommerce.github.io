const express = require("express");

const { protect, allowedTo } = require("../services/authService");
const {
  creatCashOrder,
  filterOrderForLoggedUser,
  findSpecificOrder,
  findAllOrders,
  updateOrderPaid,
  updateOrderDeliverd,
  checkoutSession,
} = require("../services/orderService");

const router = express.Router();
router.use(protect);

router.get("/checkout-session/:cartId", allowedTo("user"), checkoutSession);

router.route("/:cartId").post(allowedTo("user"), creatCashOrder);
router
  .route("/")
  .get(
    allowedTo("user", "admin", "manager"),
    filterOrderForLoggedUser,
    findAllOrders
  );
router.route("/").get(filterOrderForLoggedUser, findAllOrders);

router.route("/:id").get(findSpecificOrder);
router.route("/:id/pay").put(allowedTo("admin", "manager"), updateOrderPaid);
router
  .route("/:id/deliver")
  .put(allowedTo("admin", "manager"), updateOrderDeliverd);
module.exports = router;
