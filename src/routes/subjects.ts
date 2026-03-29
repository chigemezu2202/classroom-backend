import { and, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import express, { Request, Response } from "express";
import { departments, subjects } from "../db/schema";
import { db } from "../db";

const router = express.Router();

// GET /subjects - Get all subjects with optional search, filtering, and pagination
router.get("/", async (req: Request, res: Response) => {
    try {
        const { search, department, page = "1", limit = "10" } = req.query;
        const searchTerm = typeof search === "string" ? search.trim() : "";
        const departmentTerm = typeof department === "string" ? department.trim() : "";

        const toPositiveInt = (value: unknown, fallback: number) => {
            const n = typeof value === "string" ? Number(value) : Number.NaN;
            return Number.isInteger(n) && n > 0 ? n : fallback;
        };
        const currentPage = toPositiveInt(page, 1);
        const limitPerPage = Math.min(toPositiveInt(limit, 10), 100);
        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];
        // Example: If search is provided, we can add a condition to filter subjects by name or code
        if (searchTerm) {
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${searchTerm}%`),
                    ilike(subjects.code, `%${searchTerm}%`)
                )
            )
        }
        //If department filter is provided, match the dpartment name
        if (departmentTerm) {
            filterConditions.push(ilike(departments.name, `%${departmentTerm}%`));
        }

        //combine all the filter using AND operator if any exit
        const whereClause = filterConditions.length > 0 ? and(...filterConditions) : undefined;

        const countResult = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause);

        const totalCount = Number(countResult[0]?.count ?? 0);

        const subjectsList = await db
            .select({
                ...getTableColumns(subjects),
                department: { ...getTableColumns(departments) }
            }).from(subjects).leftJoin(departments, eq(subjects.departmentId, departments.id))
            .where(whereClause)
            .limit(limitPerPage)
            .offset(offset);

        res.status(200).json({
            data: subjectsList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage)
            }
        });

    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
})


export default router;