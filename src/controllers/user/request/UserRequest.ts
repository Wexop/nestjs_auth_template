import { ApiProperty } from "@nestjs/swagger";


export class AddUserRequest {
  @ApiProperty( { type: "string" } )
  pseudo: string;

  @ApiProperty( { type: "string" } )
  password: string;
  
}
