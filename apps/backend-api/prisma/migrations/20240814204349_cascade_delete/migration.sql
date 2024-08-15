-- DropForeignKey
ALTER TABLE "contact_list" DROP CONSTRAINT "contact_list_contactGroupId_fkey";

-- DropForeignKey
ALTER TABLE "contact_list" DROP CONSTRAINT "contact_list_contactId_fkey";

-- AddForeignKey
ALTER TABLE "contact_list" ADD CONSTRAINT "contact_list_contactGroupId_fkey" FOREIGN KEY ("contactGroupId") REFERENCES "contact_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_list" ADD CONSTRAINT "contact_list_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
