"use client";
import BreadCrumb from "@/components/application/Admin/BreadCrumb";
import ButtonLoading from "@/components/application/ButtonLoading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { zSchema } from "@/lib/zodSchema";
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";

const breadCrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: "Home",
  },
  {
    href: ADMIN_CATEGORY_SHOW,
    label: "Category",
  },
  {
    href: "",
    label: "Edit Category",
  },
];

const EditCategory = ({ params }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  const formSchema = zSchema.pick({
    name: true,
    slug: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: response } = await axios.get(`/api/category/get/${id}`);
        if (response.success) {
          form.reset({
            name: response.data.name,
            slug: response.data.slug,
          });
        } else {
          showToast("error", response.message);
        }
      } catch (error) {
        showToast("error", "Failed to fetch category data");
      } finally {
        setFetching(false);
      }
    };
    fetchCategory();
  }, [id, form]);

  useEffect(() => {
    const name = form.watch("name");
    if (name && !fetching) {
      form.setValue("slug", slugify(name, { lower: true }));
    }
  }, [form.watch("name"), fetching]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: response } = await axios.put(
        `/api/category/update/${id}`,
        values,
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      showToast("success", response.message);
      router.push(ADMIN_CATEGORY_SHOW);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-5 text-center">Loading category data...</div>;
  }

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />

      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Edit Category</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter category name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-5">
                <ButtonLoading
                  type="submit"
                  text="Update Category"
                  className="cursor-pointer"
                  loading={loading}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
