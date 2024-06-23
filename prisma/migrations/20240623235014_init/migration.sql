-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "jobReference" TEXT NOT NULL,
    "siteAddress" TEXT NOT NULL,
    "owners" TEXT NOT NULL,
    "buildStart" DATETIME NOT NULL,
    "buildComplete" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "InteriorProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "InteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExteriorProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    CONSTRAINT "ExteriorProduct_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaintenanceInstruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actionRequired" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "dueOn" DATETIME NOT NULL,
    "interiorProductId" INTEGER,
    "exteriorProductId" INTEGER,
    CONSTRAINT "MaintenanceInstruction_interiorProductId_fkey" FOREIGN KEY ("interiorProductId") REFERENCES "InteriorProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MaintenanceInstruction_exteriorProductId_fkey" FOREIGN KEY ("exteriorProductId") REFERENCES "ExteriorProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Installer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExteriorProductInstallers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ExteriorProductInstallers_A_fkey" FOREIGN KEY ("A") REFERENCES "ExteriorProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExteriorProductInstallers_B_fkey" FOREIGN KEY ("B") REFERENCES "Installer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InteriorProductInstallers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_InteriorProductInstallers_A_fkey" FOREIGN KEY ("A") REFERENCES "Installer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InteriorProductInstallers_B_fkey" FOREIGN KEY ("B") REFERENCES "InteriorProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExteriorProductInstallers_AB_unique" ON "_ExteriorProductInstallers"("A", "B");

-- CreateIndex
CREATE INDEX "_ExteriorProductInstallers_B_index" ON "_ExteriorProductInstallers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InteriorProductInstallers_AB_unique" ON "_InteriorProductInstallers"("A", "B");

-- CreateIndex
CREATE INDEX "_InteriorProductInstallers_B_index" ON "_InteriorProductInstallers"("B");
