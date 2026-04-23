import { connectDB } from "@/lib/databaseConnection";
import cloudinary from "@/lib/cloudinary";
import catchError, { response } from "@/lib/helperFunction";
import mongoose from "mongoose";
import { isAuthenticated } from "@/lib/authentication";
import CategoryModel from "@/models/Category.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id List");
    }

    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();
    if (!category.length) {
      return response(false, 404, "Data not found");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD for this route",
      );
    }

    if (deleteType === "SD") {
      await CategoryModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } },
      );
      return response(true, 200, "Media moved to trash successfully");
    } else {
      await CategoryModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } },
      );
      return response(true, 200, "Media restored successfully");
    }
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id List");
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be PD for this route",
      );
    }

    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();

    if (!category.length) {
      return response(false, 404, "Data not found");
    }

    // delete all media from cloudinary.
    const publicIds = media.map((m) => m.public_id);

    try {
      await cloudinary.api.delete_resources(publicIds);
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion error:", cloudinaryError);
      return response(false, 500, "Failed to delete images from storage");
    }

    await CategoryModel.deleteMany({ _id: { $in: ids } });

    return response(true, 200, "Media deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
