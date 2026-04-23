import { connectDB } from "@/lib/databaseConnection";
import catchError, { response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import { isAuthenticated } from "@/lib/authentication";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    const { id } = await params;

    await connectDB();

    const getCategory = await CategoryModel.findById(id);

    if (!getCategory) {
      return response(false, 404, "Category not found");
    }

    return response(true, 200, "Category fetched successfully", getCategory);
  } catch (error) {
    return catchError(error);
  }
}
