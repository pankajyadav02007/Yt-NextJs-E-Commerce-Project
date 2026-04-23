import { connectDB } from "@/lib/databaseConnection";
import catchError, { response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import { isAuthenticated } from "@/lib/authentication";
import { zSchema } from "@/lib/zodSchema";

export async function PUT(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    const { id } = await params;

    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
      name: true,
      slug: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or Missing field.", validate.error);
    }

    const { name, slug } = validate.data;

    const existingCategory = await CategoryModel.findOne({
      $or: [{ name }, { slug }],
      _id: { $ne: id },
    });

    if (existingCategory) {
      return response(
        false,
        400,
        "Another category with this name or slug already exists.",
      );
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true },
    );

    if (!updatedCategory) {
      return response(false, 404, "Category not found");
    }

    return response(true, 200, "Category updated successfully", updatedCategory);
  } catch (error) {
    return catchError(error);
  }
}
