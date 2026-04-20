import { connectDB } from "@/lib/databaseConnection";
import catchError, { isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

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
    });

    if (existingCategory) {
      return response(false, 400, "Category with this name or slug already exists.");
    }

    const newCategory = new CategoryModel({
      name,
      slug,
    });

    await newCategory.save();

    return response(true, 201, "Category created successfully.", newCategory);
  } catch (error) {
    return catchError(error);
  }
}
