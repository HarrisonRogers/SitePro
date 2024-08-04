/*
  Warnings:

  - Added the required column `category` to the `ExteriorProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `InteriorProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExteriorProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "ExteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExteriorProduct" ("id", "name", "siteId", "supplier") SELECT "id", "name", "siteId", "supplier" FROM "ExteriorProduct";
DROP TABLE "ExteriorProduct";
ALTER TABLE "new_ExteriorProduct" RENAME TO "ExteriorProduct";
CREATE TABLE "new_InteriorProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "InteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InteriorProduct" ("id", "name", "siteId", "supplier") SELECT "id", "name", "siteId", "supplier" FROM "InteriorProduct";
DROP TABLE "InteriorProduct";
ALTER TABLE "new_InteriorProduct" RENAME TO "InteriorProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
