"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report1645609986187 = void 0;
class report1645609986187 {
    constructor() {
        this.name = 'report1645609986187';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "contentId" character varying NOT NULL, "contentType" character varying NOT NULL, "sourcePlatform" "public"."report_sourceplatform_enum" NOT NULL DEFAULT 'web', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_468fae0ebad2fa87d584952d5ba" PRIMARY KEY ("id", "userId", "contentId", "contentType"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e347c56b008c2057c9887e230a" ON "report" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a4915b84f01b94e83076df675" ON "report" ("contentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f0d48d589ea9ff889ab8b9eba" ON "report" ("contentType") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9b779798b47f1926715b1bf87" ON "report" ("contentId", "contentType") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_62577c2969a3a42c23e7fe0d2b" ON "report" ("userId", "contentId", "contentType") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_62577c2969a3a42c23e7fe0d2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9b779798b47f1926715b1bf87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f0d48d589ea9ff889ab8b9eba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a4915b84f01b94e83076df675"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e347c56b008c2057c9887e230a"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }
}
exports.report1645609986187 = report1645609986187;
//# sourceMappingURL=1645609986187-report.js.map