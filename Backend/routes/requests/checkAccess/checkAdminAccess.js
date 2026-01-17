import express from "express";
import checkAdminAccess from "../../../helper/authentication/admin/checkAccess.js";

const router = express.Router();

router.post("/check-admin-access", async (req, res) => {
  const { routeType } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await checkAdminAccess(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    const adminAccount = adminCheck.AdminAccount;

    if (
      routeType === "SuperAdmin" &&
      adminAccount.accountType != "SuperAdmin"
    ) {
      res.status(401).json({ message: "Unauthorised Access Request" });
    }
    if (routeType === "Admin" && adminAccount.accountType === "Analytics") {
      res.status(401).json({ message: "Unauthorised Access Request" });
    }

    if (adminAccount.accountType === "SuperAdmin") {
      res.json({ message: "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23" });
    } else if (adminAccount.accountType === "Admin") {
      res.json({ message: "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv" });
    } else if (adminAccount.accountType === "Analytics") {
      res.json({ message: "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
