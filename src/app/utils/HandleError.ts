import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class HandlerError {
    static handleErrors(error: HttpErrorResponse): Observable<never> {
        if (error.status == HttpStatusCode.Forbidden)
            return throwError('You are not allowed to perform this action');
        if (error.status == HttpStatusCode.NotFound)
            return throwError('User or article not found');
        if (error.status == HttpStatusCode.InternalServerError)
            return throwError('Internal server error');
        if (error.status == HttpStatusCode.Unauthorized)
            return throwError('You must be logged to view this content');
        return throwError('An unexpected error ocurred');
    }
}