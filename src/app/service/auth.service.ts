import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://cultivar.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://cultivar.herokuapp.com/usuarios/cadastrar', usuario)
  }

  getByIdUser(id: number):Observable<Usuario>{
    return this.http.get<Usuario>(`https://cultivar.herokuapp.com/usuarios/${id}`,this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ""){
      ok = true
    }

    return ok
  }

  adm(){
    let ok: boolean = false
    if (environment.tipo == 'admin'){
      ok = true
    }
    return ok
  }

  name(){
    let ok: boolean = false
    if (environment.tipo == 'normal' || environment.tipo == 'admin'){
      ok = true
    }
    return ok
  }
}