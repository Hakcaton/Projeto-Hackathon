import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { map, Observable } from "rxjs";

// Responsável por atualizar o token armazenado.
export class TokenRefresherInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!['/api/authentication/login']
            .includes(req.url)) {
            return next.handle(req).pipe(
                map((res: any) => {
                    if (res instanceof HttpResponse) {
                        const newToken = res.headers.get('Authorization') as string;
                        window.localStorage.setItem('token', newToken);
                    }         

                    return res;
                  })
            );
        }

        return next.handle(req);
    }

}