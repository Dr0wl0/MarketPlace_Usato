package it.profice.corso.LogIn_Registration_service.handler;

import it.profice.corso.LogIn_Registration_service.exception.UserAlredyExistingException;
import it.profice.corso.LogIn_Registration_service.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class UserGlobalException {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handlerMethodArgumentNotValidException(MethodArgumentNotValidException e ){
        return new ResponseEntity<>(getRet("400", e.getFieldErrors().toString()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handlerUserNotFoundException( UserNotFoundException e ){
        return new ResponseEntity<>(getRet("404", "Usernname o password errati!" ), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<Map<String,Object>> hanlerUserAlredyExistingException( UserAlredyExistingException e ){
        return new ResponseEntity<>(getRet("409", "Utente già esistente"), HttpStatus.CONFLICT);
    }

    private Map<String, Object> getRet(String errorCode, String errorMessage) {
        Map<String, Object> ret = new HashMap<>();

        ret.put("timestamp", LocalDateTime.now());
        ret.put("error", errorCode);
        ret.put("message", errorMessage);
        return ret;
    }


}
