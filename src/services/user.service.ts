import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";


@Injectable()
export class UserService {

  constructor(
    @InjectRepository( User, "postgreConnection" )
    private readonly repository: Repository<User>
  ) {
  }

  findAll(): Observable<User[]> {
    return from( this.repository.find() );
  }

  findOne( id: number ): Observable<User> {
    return from( this.repository.findOne( { where: { id } } ) );
  }

  findFromPseudo( pseudo: string ): Observable<User> {
    return from( this.repository.findOne( { where: { pseudo } } ) );
  }

  save( body: User ): Observable<User> {
    return from( this.repository.save( body ) );
  }

  delete( id: number ) {
    return from( this.repository.softDelete( id ) );
  }

}
