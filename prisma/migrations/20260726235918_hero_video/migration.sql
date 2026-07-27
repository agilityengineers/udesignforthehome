-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "heroHeadline" TEXT NOT NULL DEFAULT '',
    "heroSubhead" TEXT NOT NULL DEFAULT '',
    "heroStyle" TEXT NOT NULL DEFAULT 'image',
    "heroVideoUrl" TEXT NOT NULL DEFAULT '',
    "testimonials" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("email", "heroHeadline", "heroSubhead", "id", "phone", "testimonials", "updatedAt") SELECT "email", "heroHeadline", "heroSubhead", "id", "phone", "testimonials", "updatedAt" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
