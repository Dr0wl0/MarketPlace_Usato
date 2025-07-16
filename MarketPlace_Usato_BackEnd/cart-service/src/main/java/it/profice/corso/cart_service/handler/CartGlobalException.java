package it.profice.corso.cart_service.handler;

import it.profice.corso.cart_service.exception.CartAlreadyCreated;
import it.profice.corso.cart_service.exception.CartNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CartGlobalException {

    @ExceptionHandler(CartNotFound.class)
    public ResponseEntity<Map<String, Object>> handlerBookNotFoundException(CartNotFound e ){
        return new ResponseEntity<>(getRet("404", "Carrello non trovato!" ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CartAlreadyCreated.class)
    public ResponseEntity<Map<String, Object>> handlerBookNotFoundException(CartAlreadyCreated e ){
        return new ResponseEntity<>(getRet("409", "Carrello già esistente!" ), HttpStatus.CONFLICT);
    }

    private Map<String, Object> getRet(String errorCode, String errorMessage) {
        Map<String, Object> ret = new HashMap<>();

        ret.put("timestamp", LocalDateTime.now());
        ret.put("error", errorCode);
        ret.put("message", errorMessage);
        return ret;
    }
}
