import { connectDB } from "@/lib/databaseConnection";
import catchError, { response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import { isAuthenticated } from "@/lib/authentication";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const categories = await CategoryModel.find({ deletedAt: null }).sort({
      createdAt: -1,
    });

    return response(true, 200, "Categories exported successfully", categories);
  } catch (error) {
    return catchError(error);
  }
}
