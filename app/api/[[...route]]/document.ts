// authors.ts
import { createDocumentTableSchema, DocumentSchema, documentTable, updateCombinedSchema, UpdateDocumentSchema } from '@/db/schema/document'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { desc, and, eq, ne } from 'drizzle-orm';
import { z } from 'zod'
import { getAuthUser } from '@/lib/kinde'
import { generateDocUUID } from '@/lib/helper'
import { db } from '@/db'
import { personalInfoTable } from '@/db/schema';

const documentRoute = new Hono()
  .post('/create',
    zValidator('json', createDocumentTableSchema),
    getAuthUser,

    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid('json') as DocumentSchema;
        const userId = user.id;
        const authorName = `${user.given_name} ${user?.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title,
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail
        }

        const [data] = await db.insert(documentTable).values(newDoc).returning()

        return c.json(
          {
            success: "ok",
            data,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to create document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db.select().from(documentTable).orderBy(desc(documentTable.updatedAt)).where(
        and(
          eq(documentTable.userId, userId),
          ne(documentTable.status, "archived"),
        )
      );
      return c.json({
        success: true,
        data: documents
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to fetch documents",
        error: error,
      }, 500)
    }
  })
  .get("/:documentId",
    zValidator('param', 
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const {documentId} = c.req.valid('param');

        const userId = user?.id;
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          }
        });
        return c.json({
          success: true,
          data: documentData,
        })
      } catch (error) {
        return c.json({
          success: false,
          message: 'Failed to fetch documents',
          error: error,
        }, 500);
      }
    }
  )
  .patch(
    '/update:documentId',
    zValidator(
      'param',
      z.object({
        documentId: z.string()
      })
    ),
    zValidator(
      'json',
      updateCombinedSchema
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get('user')
        const { documentId } = c.req.valid('param');

        const {
          title,
          status,
          summary,
          thumbnail,
          themeColor,
          currentPosition,
          personalInfo,
          education,
          experience,
          skills
        } = c.req.valid('json');
        const userId = user.id;

        if(!documentId){
          return c.json({ error:"DocumentId is required" }, 400)
        }
        await db.transaction(async (trx) => {
          const resumeUpdate = {} as UpdateDocumentSchema;
          if (title) resumeUpdate.title = title;
          if (thumbnail) resumeUpdate.thumbnail = thumbnail;
          if (summary) resumeUpdate.summary = summary;
          if (themeColor) resumeUpdate.themeColor =  themeColor;
          if (currentPosition) resumeUpdate.currentPosition = currentPosition || 1;
          if (status) resumeUpdate.status = status;

          const [ documentData ] = await trx
            .update(documentTable)
            .set(resumeUpdate)
            .where(
              and(
                eq(documentTable.documentId, documentId),
                eq(documentTable.userId, userId),
              )
            )
            .returning();

          // if(!documentData) {
          //   return c.json({ error: 'Failed to update document!' }, 400)
          // }

          if(personalInfo){
            if(!personalInfo?.firstName && !personalInfo?.lastName){
              return;
            }
            const exists = await trx
              .select()
              .from(personalInfoTable)
              .where(
                eq(personalInfoTable.docId, documentData.id)
              )
          }
        })
      } catch (error) {
        
      }
    }
  )

export default documentRoute