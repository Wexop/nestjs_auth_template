import { ApiProperty } from "@nestjs/swagger";


export class LoginResponse {
  @ApiProperty( { type: "string" } )
  token: string;

}
