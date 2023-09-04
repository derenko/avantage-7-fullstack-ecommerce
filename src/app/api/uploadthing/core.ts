import { authOptions } from "@/core/auth";
import { getServerUser } from "@/core/helpers";
import { UserType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
  upload: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getServerUser();
      if (user && user.role === UserType.Admin) {
        return { email: user.email };
      }

      throw new Error("Unauthorized");
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user email:", metadata.email);
      console.log("file url", file.url);
    }),
};

export type FileRouter = typeof fileRouter;
