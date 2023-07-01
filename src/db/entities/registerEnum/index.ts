import { GENDER } from "@/common/constant";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(GENDER, {
    name: "GENDER",
})