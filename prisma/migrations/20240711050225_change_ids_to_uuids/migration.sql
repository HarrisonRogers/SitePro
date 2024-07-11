/*
  Warnings:

  - The primary key for the `ExteriorProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Installer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `InteriorProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MaintenanceInstruction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExteriorProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "ExteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExteriorProduct" ("id", "name", "siteId", "supplier") SELECT "id", "name", "siteId", "supplier" FROM "ExteriorProduct";
DROP TABLE "ExteriorProduct";
ALTER TABLE "new_ExteriorProduct" RENAME TO "ExteriorProduct";
CREATE TABLE "new_Installer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL
);
INSERT INTO "new_Installer" ("contact", "id", "name") SELECT "contact", "id", "name" FROM "Installer";
DROP TABLE "Installer";
ALTER TABLE "new_Installer" RENAME TO "Installer";
CREATE UNIQUE INDEX "Installer_name_key" ON "Installer"("name");
CREATE TABLE "new_InteriorProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "InteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InteriorProduct" ("id", "name", "siteId", "supplier") SELECT "id", "name", "siteId", "supplier" FROM "InteriorProduct";
DROP TABLE "InteriorProduct";
ALTER TABLE "new_InteriorProduct" RENAME TO "InteriorProduct";
CREATE TABLE "new_MaintenanceInstruction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actionRequired" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "dueOn" DATETIME NOT NULL,
    "interiorProductId" TEXT,
    "exteriorProductId" TEXT,
    CONSTRAINT "MaintenanceInstruction_interiorProductId_fkey" FOREIGN KEY ("interiorProductId") REFERENCES "InteriorProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceInstruction_exteriorProductId_fkey" FOREIGN KEY ("exteriorProductId") REFERENCES "ExteriorProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MaintenanceInstruction" ("actionRequired", "dueOn", "exteriorProductId", "frequency", "id", "interiorProductId") SELECT "actionRequired", "dueOn", "exteriorProductId", "frequency", "id", "interiorProductId" FROM "MaintenanceInstruction";
DROP TABLE "MaintenanceInstruction";
ALTER TABLE "new_MaintenanceInstruction" RENAME TO "MaintenanceInstruction";
CREATE TABLE "new__ExteriorProductInstallers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExteriorProductInstallers_A_fkey" FOREIGN KEY ("A") REFERENCES "ExteriorProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExteriorProductInstallers_B_fkey" FOREIGN KEY ("B") REFERENCES "Installer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ExteriorProductInstallers" ("A", "B") SELECT "A", "B" FROM "_ExteriorProductInstallers";
DROP TABLE "_ExteriorProductInstallers";
ALTER TABLE "new__ExteriorProductInstallers" RENAME TO "_ExteriorProductInstallers";
CREATE UNIQUE INDEX "_ExteriorProductInstallers_AB_unique" ON "_ExteriorProductInstallers"("A", "B");
CREATE INDEX "_ExteriorProductInstallers_B_index" ON "_ExteriorProductInstallers"("B");
CREATE TABLE "new__InteriorProductInstallers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InteriorProductInstallers_A_fkey" FOREIGN KEY ("A") REFERENCES "Installer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InteriorProductInstallers_B_fkey" FOREIGN KEY ("B") REFERENCES "InteriorProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__InteriorProductInstallers" ("A", "B") SELECT "A", "B" FROM "_InteriorProductInstallers";
DROP TABLE "_InteriorProductInstallers";
ALTER TABLE "new__InteriorProductInstallers" RENAME TO "_InteriorProductInstallers";
CREATE UNIQUE INDEX "_InteriorProductInstallers_AB_unique" ON "_InteriorProductInstallers"("A", "B");
CREATE INDEX "_InteriorProductInstallers_B_index" ON "_InteriorProductInstallers"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
