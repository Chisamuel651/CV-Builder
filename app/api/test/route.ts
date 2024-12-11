import { NextResponse } from "next/server"

export const GET = () => {
    return NextResponse.json({
        message: 'Subscribe'
    })
}

export const POST = () => {
    return NextResponse.json({
        message: 'post Subscribe'
    })
}

export const PATCH = () => {
    return NextResponse.json({
        message: 'patch Subscribe'
    })
}