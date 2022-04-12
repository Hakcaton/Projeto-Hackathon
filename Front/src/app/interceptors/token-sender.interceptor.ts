import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { map, Observable } from "rxjs";

// Responsável por adicionar o cabeçalho "Authorization" em todas as requisições HTTP, quando necessário.
export class TokenSenderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!['/api/authentication/login']
            .includes(req.url)) {
            const userToken =  window.localStorage.getItem('token');
            const modifiedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${userToken}`),
            });
            return next.handle(modifiedReq);
        }

        return next.handle(req);
    }

}