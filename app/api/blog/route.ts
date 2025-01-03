import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Databse Connection Unsuccesfull")
    }
}



export const GET = async (req: Request, res: NextResponse) => {
    // console.log("GET");
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }  
};


export const POST = async (req: Request, res: NextResponse) => {
    // console.log("POST");
    // here we use NextResponse in place of res but it not any issues
    try {
         // it a promise & it content actual data that we send to the postman for any frontend library/application
         const {title, description} = await req.json();
         await main();

         const post = await prisma.post.create({data: {description, title} })
         return NextResponse.json({ message: "Success", post}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};