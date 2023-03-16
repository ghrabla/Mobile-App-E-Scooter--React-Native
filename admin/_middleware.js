import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export default function middleware(req, res) {
  const { cookies } = req.cookies || {};

  const jwt = cookies;

  console.log(NextResponse);

  const url = req.url;

  if (url.includes("/")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/login");
    }

    try {
      const decoded = jwt.verify(jwt, secret);
      req.user = decoded;
      return NextResponse.next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.redirect("/login");
      } else {
        return NextResponse.redirect("/login");
      }
    }
  }

  return NextResponse.next();
}
