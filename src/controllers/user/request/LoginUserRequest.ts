import { ApiProperty } from "@nestjs/swagger";


export class LoginUserRequest {
  @ApiProperty( { type: "string" } )
  pseudo: string;

  @ApiProperty( { type: "string" } )
  password: string;

}
