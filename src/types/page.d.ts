import { IndexLayout } from "@/layouts/IndexLayout"
import { NextPage } from "next"

type PageWithIndexLayoutType = NextPage & { layout: typeof IndexLayout }

export default PageWithIndexLayoutType;
