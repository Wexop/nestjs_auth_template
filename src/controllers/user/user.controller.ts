import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { map, mergeMap, Observable } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResponse } from "./response/UserResponse";
import { AddUserRequest } from "./request/UserRequest";
import { User } from "../../entities/user.entity";
import { LoginResponse } from "./response/LoginResponse";
import { LoginUserRequest } from "./request/LoginUserRequest";
import { AuthGuard } from "../../core/auth/auth";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";


@Controller( "users" )
@ApiTags( "User" )
export class UserController {
  constructor( private userService: UserService, private jwtService: JwtService ) {
  }

  @ApiResponse( {
    type: UserResponse,
    description: "Users response",
    status: 200,
    isArray: true
  } )
  @ApiBearerAuth()
  @UseGuards( AuthGuard )
  @Get( "" )
  findAll(): Observable<UserResponse[]> {
    return this.userService.findAll();
  }

  @ApiResponse( {
    type: UserResponse,
    description: "User response",
    status: 200
  } )
  @ApiBearerAuth()
  @UseGuards( AuthGuard )
  @Get( "me" )
  userMe( @Request() req ): Observable<UserResponse> {

    return this.userService.findOne( req.user.id ).pipe(
      map( u => {
        return u.toResponse();
      } )
    );
  }

  @ApiResponse( {
    type: LoginResponse,
    description: "User response",
    status: 200
  } )
  @Post( "register" )
  register( @Body() body: AddUserRequest ): Observable<LoginResponse> {

    return this.userService.findFromPseudo( body.pseudo ).pipe(
      mergeMap( userFound => {
        if ( userFound ) {
          throw new HttpException( "Pseudo déjà utilisé", HttpStatus.CONFLICT );
        }

        const user = new User().fromRequest( body );

        const saltOrRounds = bcrypt.genSaltSync( 10 );
        user.password = bcrypt.hashSync( user.password, saltOrRounds );

        return this.userService.save( user );

      } ),
      map( u => {
        const res = new LoginResponse();
        res.token = this.jwtService.sign( { id: u.id } );

        return res;
      } )
    );

  }

  @ApiResponse( {
    type: LoginResponse,
    description: "User response",
    status: 200
  } )
  @Post( "login" )
  login( @Body() body: LoginUserRequest ) {

    return this.userService.findFromPseudo( body.pseudo ).pipe(
      map( ( user ) => {
        if ( !user ) {
          throw new HttpException( "User introuvable", HttpStatus.NOT_FOUND );
        }

        const isMatch = bcrypt.compareSync( body.password, user.password );

        if ( !isMatch ) {
          throw new HttpException( "Login ou mot de passe incorrect", HttpStatus.UNAUTHORIZED );
        }

        const res = new LoginResponse();
        res.token = this.jwtService.sign( { id: user.id } );

        return res;
      } )
    );

  }
}
