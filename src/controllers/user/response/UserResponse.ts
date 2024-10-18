import { ApiProperty } from "@nestjs/swagger";


export class UserResponse {
  @ApiProperty( { type: "number" } )
  id: number;

  @ApiProperty( { type: "string" } )
  pseudo: string;

  @ApiProperty( { type: "string" } )
  picture_url: string;

}
