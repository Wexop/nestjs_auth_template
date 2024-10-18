import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AddUserRequest } from "../controllers/user/request/UserRequest";
import { UserResponse } from "../controllers/user/response/UserResponse";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( "varchar", { length: 50 } )
  pseudo: string;

  @Column( "varchar", { length: 255 } )
  password: string;

  @Column( "varchar", { length: 255, nullable: true } )
  picture_url: string;

  @Column( "boolean", { default: false } )
  is_admin: boolean;

  @CreateDateColumn( { type: "timestamp", name: "created_at" } )
  public created_at: Date;

  @CreateDateColumn( { type: "timestamp", name: "updated_at" } )
  public updated_at: Date;

  @DeleteDateColumn( { type: "timestamp", name: "deleted_at" } )
  public deleted_at: Date;

  fromRequest( user: AddUserRequest ) {

    const newUser = new User();

    Object.assign( newUser, user );

    return newUser;
  }

  toResponse() {
    const response = new UserResponse();

    response.pseudo = this.pseudo;
    response.picture_url = this.picture_url;

    return response;
  }

}
