import { NextResponse, NextRequest } from "next/server"

export const GET = ( request: NextRequest, context: any) => {
    const {params} = context;
    const testId = params.testId;
    console.log(params);
    return NextResponse.json({
        message: 'Dynamic routes',
        id: testId,
    })
}