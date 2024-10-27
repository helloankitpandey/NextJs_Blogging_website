//  for the further request we want DYNAMIC ID as well
//  bcoz from further request -> we GET a post by its ID and delete a post by its ID and also update a post by its ID
//  So for that we need id

import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";
import { prisma } from "@/prisma";

// So for ID -> we create a dynamic route over here

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1];
        await main();
        const post = await prisma.post.findFirst({ where: { id } });
        if(!post){
            return NextResponse.json({ message: "Not Found"}, {status: 404});
        }
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1];
        const {title, description} = await req.json(); 
        await main();
        
        const post = await prisma.post.update({
            data: {title, description},
            where: { id },   
        });
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}


export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1]; 
        await main();
        
        const post = await prisma.post.delete({where: { id }});
        
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

